import cloudinary from "cloudinary"
import { env } from "./env.js"
import { CLOUDINARY } from "../constants/index.js"

cloudinary.v2.config({
    secure: true,
    api_key: env(CLOUDINARY.API_KEY),
    api_secret: env(CLOUDINARY.API_SECRET),
    cloud_name: env(CLOUDINARY.CLOUD_NAME)
})

export const saveFileToCloudinary = async (file) => {
    const response = await cloudinary.v2.uploader.upload(file.path);
    return response.secure_url
}