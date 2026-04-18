import mongoose, { Schema } from "mongoose";

const statusSchema = new Schema({
    contentType: {
        type: String,
        enum: ["text", "image", "video"],
        required: true
    },

    text: {
        type: String,
        required: function () {
            return this.contentType === "text";
        }
    },

    media: {
        url: {
            type: String,
            required: function () {
                return this.contentType === "image" || this.contentType === "video";
            }
        },
        publicId: {
            type: String,
            required: function () {
                return this.contentType === "image" || this.contentType === "video";
            }
        }
    },

    caption: {
        type: String
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }

}, { timestamps: true });

export const Status = mongoose.model("Status", statusSchema)