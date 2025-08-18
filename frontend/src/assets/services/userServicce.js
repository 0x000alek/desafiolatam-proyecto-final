import API from "./api"

export const getUserProfile = async (id) => {
    const res = id ? await API.get(`/users/${id}`) : await API.get("/users/me");
    return res.data
}