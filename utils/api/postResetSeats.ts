import axios from "axios";
import { toast } from "react-toastify";
import { fetchSeatsAPI } from "./getSeats";
import { CONSTANTS } from "../config/app-config";

const resetSeatsAPI = async () => {
  const confirmReset = window.confirm(
    "Are you sure you want to reset all bookings?"
  );
  if (!confirmReset) return;

  try {
    await axios.post(`${CONSTANTS?.API_BASE_URL}/api/seats/reset`);

    toast.success("All bookings have been reset");
    fetchSeatsAPI(); // Refresh seat map
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Reset failed");
    } else {
      toast.error("An unexpected error occurred");
    }
    console.error("Reset error:", error);
  }
};
export default resetSeatsAPI;
