import authservice from "./user.service.js";

const register = async (req, res) => {
    const user = await authservice.register(req.body);

    return res.status(201).json({
        message: "User registered successfully",
        user
    });
};

const login = async (req, res) => {
    const resp = await authservice.login(req.body);

    return res.status(200).json({
        message: "User login successfully",
        user: resp.userObj,
        accessToken: resp.accessToken,
        refreshToken: resp.refreshToken
    });
};

const logout = async (req, res) => {
    await authservice.logout(req.user._id);

    return res.status(200).json({
        message: "User logout successfully"
    });
};

export default { register, login, logout };
