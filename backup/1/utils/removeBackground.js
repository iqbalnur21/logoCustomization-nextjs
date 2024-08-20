import FormData from "form-data";
import axios from "axios";

export async function removeBg(blob) {
  console.log("process.env.REMOVE_BG_API_KEY:", process.env.REMOVE_BG_API_KEY);
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_file", blob);

  const response = await axios.post("https://api.remove.bg/v1.0/removebg", {
    headers: { "X-Api-Key": process.env.REMOVE_BG_API_KEY },
    body: formData,
  });

  if (response.ok) {
    return await response.arrayBuffer();
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
}
