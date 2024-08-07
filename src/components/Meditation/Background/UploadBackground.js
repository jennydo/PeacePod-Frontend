import { Button, border } from "@chakra-ui/react";
import { useState, useEffect, useRef, useContext } from "react";
import { CloudinaryContext } from '../../../context/CloudinaryContext';
import { useAuthContext } from '../../../hooks/useAuthContext';
import axios from 'axios';
import { MdCloudUpload } from "react-icons/md";

const UploadBackground = () => {

  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);
  const cloudName = "dufirricm";
  const uploadPreset = "peacepod-backgrounds-users";
  const {dispatch, userImages} = useContext(CloudinaryContext);
  const user = useAuthContext();
  const userId = user.user.user._id;

  const config = {
    cloudName,
    uploadPreset,
    tags: ["meditation_background", "peacepod"],
    context: { alt: "user_uploaded" },
    // folder: "PeacePod",
    // cropping: true,
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple themes
  };
 

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    // console.log(cloudinaryRef.current)
    if (cloudinaryRef.current) {
      widgetRef.current = cloudinaryRef.current.createUploadWidget(config, 
        function (error, result) {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          dispatch({type: "UPLOAD_IMAGE", payload: result.info.url });

          axios.patch(`http://localhost:4000/api/users/${userId}`, {
            uploadedBackgrounds: [result.info.url, ...userImages]
          })
          .then((response) => {
            console.log('User background updated:', response.data);
          })
          .catch((error) => {
            console.error('Error updating user background:', error);
          });
        }
      });

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          widgetRef.current.open();
        },
        false
      );
    }
  });

  return (
      <Button 
        id="upload_widget"
        onClick={() => widgetRef.current.open()}
        marginTop={2}
        marginBottom={2}  
        size='sm'
        leftIcon={<MdCloudUpload />}
      >
        Upload your own image
      </Button>
  );
};

export default UploadBackground;