import cloudinary from "../config/cloudinary.js";
import fs from "fs/promises";
import ApiError from "./api-error.js";

export const uploadOnCloudinary = async (filePath) => {
    if (!filePath) return null;

    try {
        const res = await cloudinary.uploader.upload(filePath, {
            folder: "chat-app",
            resource_type: "auto",
        });

        await fs.unlink(filePath);
        return res;

    } catch (err) {
        console.error("Cloudinary upload failed:", err);
        await fs.unlink(filePath).catch(() => { });
        return null;
    }
};

export const deleteFromCloudinary = async (publicId) => {
    if (!publicId) return null;

    try {
        const res = await cloudinary.uploader.destroy(publicId);

        return res;

    } catch (error) {
        console.log("Failed to delete media", error);
        throw ApiError.serverError();
    }
};