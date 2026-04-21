import { Router } from "express";
import * as controller from "./status.controller.js"
import { upload } from "../../common/middleware/multer.js"
import authentication from "../user/user.middleware.js";
import { Status } from "./status.model.js";

const statusRouter = Router()

statusRouter.post("/", upload.single("status"), authentication, controller.createStatus);

statusRouter.get('/all/today', authentication, async (req, res) => {
    try {
        let newDate = new Date();
        newDate.setHours(0, 0, 0, 0); // poora din

        const allstatus = await Status.aggregate([
            {
                $match: {
                    createdAt: { $gte: newDate }
                },
            },
            {
                $sort: {
                    createdAt: -1
                },

            },
            {
                $group: {
                    _id: "$user",
                    latestStatus: { $first: "$$ROOT" }
                }
            },
            {
                $replaceRoot: {
                    newRoot: "$latestStatus"
                }
            }, {
                $lookup: {
                    from: "users",              
                    localField: "user",        
                    foreignField: "_id",        
                    as: "user"
                }
            },{
                $unwind:'$user'
            }
        ])

        res.status(200).json({ data: allstatus });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

statusRouter.get("/all", authentication, controller.fetchAllStatus);

statusRouter.get("/all/:id", authentication, async (req, res) => {
    const { id } = req.params
    const allStatus = await Status.find({ user: id }).sort({ createdAt: -1 }).populate("user", "username fullName")

    res.status(200).json({ data: allStatus })
});

statusRouter.get("/:id", authentication, controller.fetchStatus);
statusRouter.delete("/:id", authentication, controller.deleteStatus);



export default statusRouter

