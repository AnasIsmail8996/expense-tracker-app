import { API_PATHS } from "./apiPath.js";
import axiosInstance from "./axiosIntence.js";

// ✅ Mark function as async since it uses await
const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const res = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error; 
  }
};

export default uploadImage;
