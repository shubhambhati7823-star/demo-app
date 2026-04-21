import { Status } from "./status.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../../common/utils/upload.js";
import ApiError from "../../common/utils/api-error.js";
import ApiResponse from "../../common/utils/api-response.js";
import mongoose from "mongoose";

const createStatus = async (text, file, userId) => {
    console.log(userId)
    let contentType;
    let statusData = {
        user: userId
    };

    if (!file && text) {
        contentType = "text";

        statusData.contentType = contentType;
        statusData.text = text;
    }

    else if (file) {
        const mime = file.mimetype;

        if (!mime.startsWith("image/") && !mime.startsWith("video/")) {
            throw ApiError.badRequest("Invalid file type");
        }

        const uploadRes = await uploadOnCloudinary(file.path);

        if (!uploadRes) {
            throw ApiError.serverError("Upload failed");
        }

        contentType = mime.startsWith("image/") ? "image" : "video";

        statusData.contentType = contentType;
        statusData.media = {
            url: uploadRes.secure_url,
            publicId: uploadRes.public_id,
        };

        if (text) {
            statusData.caption = text;
        }
    }


    else {
        throw ApiError.badRequest("No content provided");
    }

    const status = await Status.create(statusData);

    return { data: status }


};

const deleteStatus = async (statusId) => {

    const status = await Status.findById(statusId);
    if (!status) {
        throw ApiError.notFound("Status no longer exists")
    }

    if (status.contentType === "image" || status.contentType === "video") {
        await deleteFromCloudinary(status.media.publicId)
    }

    await Status.findByIdAndDelete(status._id)

    return null;
}

const fetchAllStatus = async (userId) => {

    const allStatus = await Status.find({ user: userId }).sort({ createdAt: -1 }).populate("user", "username fullName")

    return allStatus;

}

const fetchStatus = async (statusId) => {

    const status = await Status.findById(statusId).populate("user", "username fullName")

    if (!status) {
        throw ApiError.notFound("Status not found")
    }
 

    return status

}

export {
    createStatus,
    deleteStatus,
    fetchAllStatus,
    fetchStatus
}