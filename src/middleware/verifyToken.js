import axios from "axios";

export const verifyToken = async () => {
  try {
    const response = await axios.get("/usuario/getDataByToken")

    return response.status === 200;

  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
}