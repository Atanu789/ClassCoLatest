import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name:"class-co-cloudinary", 
  api_key:"526639181948731", 
  api_secret:"5XYank1EldsUJcZodhw0iGMSgrI"
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
      
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
      
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.log("Error in uploading file to Cloudinary");
        fs.unlinkSync(localFilePath) 
        return null;
    }
}



export {uploadOnCloudinary}