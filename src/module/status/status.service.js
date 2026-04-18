import { Status } from "./status.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../../common/utils/upload.js";
import ApiError from "../../common/utils/api-error.js";
import ApiResponse from "../../common/utils/api-response.js";
import mongoose from "mongoose";

const createStatus = async (text, file, userId) => {
    try {

        let contentType;
        let statusData = {};

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

    } catch (err) {
        console.error(err);
        throw ApiError.serverError();
    }
};

const deleteStatus = async (statusId) => {
    try {
        const status = await Status.findById(statusId);
        if (!status) {
            throw ApiError.notFound("Status no longer exists")
        }

        if (status.contentType === "image" || status.contentType === "video") {
            await deleteFromCloudinary(status.media.publicId)
        }

        await Status.findByIdAndDelete(status._id)

        return null;
    } catch (error) {
        console.log(error)
        throw ApiError.serverError()
    }
}

const fetchAllStatus = async (userId) => {
    try {
        const allStatus = await Status.find({ user: userId })

        return allStatus;
    } catch (error) {
        throw ApiError.serverError()
    }
}

const fetchStatus = async (statusId) => {
    try {
        const status = await Status.findById(statusId)

        if (!status) {
            throw ApiError.notFound("Status not found")
        }

        return status
    } catch (error) {
        throw ApiError.serverError()
    }
}

export {
    createStatus,
    deleteStatus,
    fetchAllStatus,
    fetchStatus
}