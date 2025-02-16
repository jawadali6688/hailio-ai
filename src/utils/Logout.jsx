import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../urls";
import { logoutUser } from "../../store/features/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const useLogout = () => {
    const dispatch = useDispatch()
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    try {
    dispatch(logoutUser(null))
      await API.post("auth/logout");

      // Redirect to the login page
      navigate("/login");
      toast.success(response?.data?.message)
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [navigate]);

  return logout;
};

export default useLogout;
