import { generateAccessToken, generateRefreshToken } from "../../common/utils/jwt.utils.js";
import User from "./user.model.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

const hashToken = (token) =>
    crypto.createHash("sha256").update(token).digest("hex");

const register = async (data) => {
    const { username, email, password, fullName, bio } = data;

    const emailExists = await User.findOne({ email });
    if (emailExists) throw new Error("Email already exists");

    const usernameExists = await User.findOne({ username });
    if (usernameExists) throw new Error("Username already exists");

    const user = await User.create({
        username,
        email,
        password,
        fullName,
        bio
    });

    const userObj = user.toObject();
    delete userObj.password;

    return userObj;
};
const login = async (data) => {
    const { username, password } = data;

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);

    let user;

    if (isEmail) {
        user = await User.findOne({ email: username }).select("+password");
    } else {
        user = await User.findOne({ username: username }).select("+password");
    }

    if (!user) {
        throw { status: 400, message: "Invalid username or password" };
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
        throw { status: 400, message: "Invalid username or password" };
    }

    console.log(user)
    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id });


    user.refreshToken = hashToken(refreshToken);
    await user.save({ validateBeforeSave: false });

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    return { userObj, accessToken, refreshToken };
};

const logout = async (userId) => {
    await User.findOneAndUpdate(
        { _id: userId },
        { refreshToken: null }
    );
};

const getAllUsers = async () => {
    const users = await User.find().select("-password -refreshToken").sort({ createdAt: -1 }).lean();
    return users;
}

const getProfile = async (userId) => {
    const user = await User.findById(userId).select("-password -refreshToken").lean();
    return user;
}

export default { register, login, logout, getAllUsers, getProfile };