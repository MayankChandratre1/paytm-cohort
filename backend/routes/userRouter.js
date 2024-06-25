const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { userModel } = require("../models/userModel");
const mongoose = require("mongoose");
const { JWT_KEY } = require("../config");
const { authMiddleware } = require("../middleware/middlewares");
const { accountModel } = require("../models/accountSchema");
const cors = require("cors");

const app = express();
const userRouter = express.Router();

const userScheme = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const userLoginScheme = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const userUpdateScheme = zod.object({
  username: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

const corsOptions = {
  origin: "http://localhost:5173/", 
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

userRouter.get("/myinfo", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const User = await userModel.findOne({
    _id: userId,
  });
  console.log(userId);
  if (!User) {
    return res.json({
      msg: "User Not Found",
    });
  }

  res.json({
    msg: "User Found",
  });
});

userRouter.post("/signup", async (req, res) => {
  const user_data = req.body;

  const { success } = userScheme.safeParse(req.body);

  if (!success) {
    return res.status(401).json({
      msg: "incorrect input",
    });
  }

  const existUser = await userModel.findOne({
    username: user_data.username,
  });

  if (existUser) {
    return res.status(401).json({
      msg: "exists",
    });
  }

  const newUser = await userModel.create(user_data);
  const userId = newUser._id;

  const Account = await accountModel.create({
    userId,
    balance: 1 + Math.random() * 1000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_KEY
  );

  res.status(200).json({
    msg: "user created",
    newUser,
    token,
    Account,
  });
});

userRouter.post("/signin", async (req, res) => {
  const user_data = req.body;

  const { success } = userLoginScheme.safeParse(req.body);

  if (!success) {
    return res.status(401).json({
      msg: "incorrect input",
    });
  }

  const User = await userModel.findOne({
    username: user_data.username,
  });

  if (!User) {
    return res.status(401).json({
      msg: "doesnot exists",
    });
  }

  const userId = User._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_KEY
  );

  req.headers.authorization = "Bearer " + token;

  res.status(200).json({
    msg: "user signed in",
    User,
    token,
  });
});

userRouter.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const Users = await userModel.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },

      {
        lastName: {
          $regex: filter,
        },
      },
      {
        username: {
          $regex: filter,
        },
      },
    ],
  });

  res.status(200).json({
    users: Users.map((user) => {
      return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      };
    }),
  });
});

userRouter.put("/update", authMiddleware, async (req, res) => {
  const user_data = req.body;

  const { success } = userUpdateScheme.safeParse(
    {
      _id: req.userId,
    },
    req.body
  );

  if (!success) {
    return res.status(401).json({
      msg: "incorrect input",
    });
  }

  console.log(req.userId);

  const updatedUser = await userModel.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );

  res.status(200).json({
    msg: "updated successful",
    updatedUser,
  });
});

module.exports = { userRouter };
