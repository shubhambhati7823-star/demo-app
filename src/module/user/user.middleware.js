import { validateAccessToken } from "../../common/utils/jwt.utils.js";
import User from "./user.model.js";

const authentication = async (req, resp, next) => {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return resp.status(401).json({ message: "user not authenticate" })
    }

    const decoded = validateAccessToken(token)
    const user = User.findById(decoded.id)
    if (!user) return resp.status(401).json({ message: "user not found" })
    req.user = {
        id: user._id
    };
    next()

}
export default authentication
