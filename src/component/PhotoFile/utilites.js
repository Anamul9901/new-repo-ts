import axios from "axios";

export const UploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
  const { data } =await axios.post(`https://api.imgbb.com/1/upload?key=0f50019d5c35e44863abd7cb471adfbf`, formData);


    return data;
  } catch (error) {
    // console.error("Error uploading image:", error);
    throw error;
  }
};