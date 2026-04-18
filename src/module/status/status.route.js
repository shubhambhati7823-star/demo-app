import { Router } from "express";
import * as controller from "./status.controller.js"
import { upload } from "../../common/middleware/multer.js"

const statusRouter = Router()

statusRouter.post("/", upload.single("status"), controller.createStatus);

statusRouter.get("/all", controller.fetchAllStatus);

statusRouter.get("/:id", controller.fetchStatus);
statusRouter.delete("/:id", controller.deleteStatus);

export default statusRouter

