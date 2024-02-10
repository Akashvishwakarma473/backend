import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (LocalFilePath) => {
    try {
            if(!LocalFilePath) return null
            // Upload the file on cloudinary
            const response = await cloudinary.uploader.upload(LocalFilePath, { resource_type: "auto" })
            // File has been uploaded successfully
            console.log("File has been Uploaded Successfully on Cloudinary", response.url);
            return response;
    } catch (error) {
        // Remove the locally saved temporary file as the upload operation got failed
        fs.unlinkSync(LocalFilePath)
        return null;
    }
}



cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });