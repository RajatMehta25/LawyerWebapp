import axios from "../axios";

export const uploadImage = async (file) => {
  var formData = new FormData();
  formData.append("media", file);
  let data = await axios
    .post("/admin/uploadDocument", formData)
    .then((res) => {
      console.log(res.data.data.path);
      return res.data.data.path;
    })

    .catch((err) => {});
  return data;
};
