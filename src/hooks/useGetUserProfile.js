import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "./useShowToast";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const useGetUserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { username } = useParams();
    const showToast = useShowToast();

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/users/profile/${username}`, {
                    credentials: "include", // <-- Add this line if authentication is required
                });
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                if (data.isFrozen) {
                    setUser(null);
                    return;
                }
                setUser(data);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, [username, showToast]);

    return { loading, user };
};

export default useGetUserProfile;
