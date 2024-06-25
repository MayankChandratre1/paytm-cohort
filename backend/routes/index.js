const express = require("express");
const { userRouter } = require("./userRouter");
const { accRouter } = require("./accountRouter");
const { authMiddleware } = require("../middleware/middlewares");
const cors = require("cors")

const app = express()
const router = express.Router();
const corsOptions = {
    origin: 'http://localhost:5173/', 
    optionsSuccessStatus: 200
  };
  
app.use(cors(corsOptions));

router.use("/user", userRouter)
router.use("/account", accRouter)

module.exports = {router}