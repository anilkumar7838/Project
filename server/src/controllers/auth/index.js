import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { User } from "../../models/User.js";

export const SignIn = async (req, res) => {
  try {
    const { collegeid, password } = req.body;
    const user = await User.findOne({ collegeid });

    if (!user) {
      res.status(404).json({ message: "user not registered" });
      return;
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "id or password incorrect" });
    }

    const access_token = jwt.sign(
      {
        userid: user._id,
        collegeid: user.collegeid,
        role: user.role,
      },
      process.env.JWT_ACCESS_TOKEN,
      {
        expiresIn: "10m",
      }
    );

    const refresh_token = jwt.sign(
      {
        collegeid: user.collegeid,
      },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: "15d" }
    );

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "login successful", access_token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const SignUp = async (req, res) => {
  try {
    const { name, collegeid, password, role } = req.body;
    const existingUser = await User.findOne({ collegeid });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    //hashing the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      name,
      collegeid,
      password: hashedPassword,
      role,
    });
    if (!newUser) {
      return res.status(424).json({ message: "error at creating the account" });
    }
    return res.status(201).json({
      message: "user created successfully",
      user: {
        name: newUser.name,
        collegeid: newUser.collegeid,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const ForgetPassword = async () => {};

export const GenerateRefreshToken = async (req, res) => {
  try {
    if (req.cookies?.refresh_token) {
      return res.status(406).json({ message: "Unauthorized" });
    }
    const refresh_token = req.cookies.refresh_token;
    jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_TOKEN,
      async (err, decoded) => {
        if (err) {
          return res.status(406).json({ message: "Unauthorized" });
        } else {
          const user = await User.findOne({
            collegeid: decoded.collegeid,
          });

          const access_token = jwt.sign(
            {
              userid: user._id,
              collegeid: user.collegeid,
              role: user.role,
            },
            process.env.JWT_ACCESS_TOKEN,
            {
              expiresIn: "10m",
            }
          );
          return res.status(201).json({ access_token });
        }
      }
    );
  } catch (error) {}
};
