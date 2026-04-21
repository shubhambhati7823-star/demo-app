import authservice from "./user.service.js";

const register = async (req, res) => {
    try {
        const user = await authservice.register(req.body);

        return res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
const login = async (req, res) => {
    try {
        const resp = await authservice.login(req.body);
     
        return res.status(200).json({
            message: "User login successfully",
            user: resp.userObj,
            accessToken: resp.accessToken,
            refreshToken: resp.refreshToken
        });

    } catch (error) {
        console.log(error); // debug

        return res.status(error.status || 500).json({
            message: error.message || "Internal Server Error"
        });
    }
};



const logout = async (req, res) => {
    await authservice.logout(req.user._id);

    return res.status(200).json({
        message: "User logout successfully"
    });
};



// getall users
const getAllUsers = async (req, res) => {
    const users = await authservice.getAllUsers();

    return res.status(200).json({
        message: "Users retrieved successfully",
        users
    });
};


// get profile
const getProfile = async (req, res) => {
    const { userId } = req.params;
    const user = await authservice.getProfile(userId);

    return res.status(200).json({
        message: "User profile retrieved successfully",
        user
    });
};




export default { register, login, logout, getAllUsers ,getProfile};
