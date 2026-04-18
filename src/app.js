import express from "express";
import statusRouter from "./module/status/status.route.js";
import authRouter from "./module/user/user.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    });
});

app.use("/auth", authRouter)

app.use("/status", statusRouter);


export default app;
import authRoutes from "./module/user/user.routes.js"
import express from "express"
import chatRoutes from "./module/chat/chat.routes.js"
import morgan from "morgan"
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

export default app
