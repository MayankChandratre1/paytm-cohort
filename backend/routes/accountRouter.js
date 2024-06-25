const express = require("express");
const { default: userModel } = require("../models/userModel");
const { authMiddleware } = require("../middleware/middlewares");
const { accountModel } = require("../models/accountSchema");
const { mongo, default: mongoose } = require("mongoose");

const app = express()
const accRouter = express.Router();

accRouter.get("/", (req,res)=>{
    res.send("accRouter");
})

accRouter.get("/balance", authMiddleware, async (req,res)=>{
    console.log(req.userId);
    const account = await accountModel.findOne({userId: req.userId});
    if(!account){
        return res.status(404).json({
            msg:"User Not Found"
        })
    }

    res.status(200).json({
        balance: account.balance
    })
})

accRouter.post("/transfer",authMiddleware, async (req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction()
    const {to, amount} = req.body
    const userId = req.userId

    if(!to || !amount || amount < 0){
        (await session).abortTransaction();
        return res.status(400).json({
            msg:"Incorrect Inputs"
        })
    }

    const fromAcc = await accountModel.findOne({userId:userId}).session(session)
    if(!fromAcc){
        await session.abortTransaction()
        await session.endSession()
        return res.status(400).json({
            msg:"Owner Account not valid"
        })
    }

    if(amount > fromAcc.balance){
        await session.abortTransaction()
        await session.endSession()
        return res.status(400).json({
            msg:"Insufficent Balance"
        })
    }

    const toAcc = await accountModel.findOne({userId:to}).session(session)
    if(!toAcc){
        await session.abortTransaction()
        await session.endSession()
        return res.status(400).json({
            msg:"Reciever Account not Found"
        })
    }

    try{
        await accountModel.updateOne({_id:fromAcc._id}, {"$inc": {
            balance: -amount
        }}).session(session)
        await accountModel.updateOne({_id:toAcc._id}, {"$inc": {
            balance: +amount
        }}).session(session)

        await session.commitTransaction()
        await session.endSession()
        res.status(200).json({
            msg:"Transfer Successfull"
        })
    } catch(err){
        res.status(500).json({
            msg:"Transfer error",
            err
        })
    }

})





module.exports = {accRouter}