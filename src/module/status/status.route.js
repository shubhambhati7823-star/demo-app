import { Router } from "express";
import * as controller from "./status.controller.js"
import { upload } from "../../common/middleware/multer.js"
import authentication from "../user/user.middleware.js";

const statusRouter = Router()

statusRouter.post("/", authentication, upload.single("status"), controller.createStatus);

statusRouter.get("/all", authentication, controller.fetchAllStatus);

statusRouter.get("/:id", authentication, controller.fetchStatus);
statusRouter.delete("/:id", authentication, controller.deleteStatus);

export default statusRouter

