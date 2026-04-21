import { validateAccessToken, validateRefreshToken } from "../../common/utils/jwt.utils.js";
import User from "./user.model.js";

const authentication = async (req, resp, next) => {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return resp.status(401).json({ message: "user not authenticate" })
    }

    const decoded = validateRefreshToken(token)
    console.log(decoded)

    const user = await User.findById(decoded.id)
    console.log(user)

    if (!user) return resp.status(401).json({ message: "user not found" })
    req.user = user
    next()

}
export default authentication
