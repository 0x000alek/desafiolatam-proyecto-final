import API from "./api"

export const getProductsService = async () => {
  const res = await API.get("/publications");
  return res.data;
}

export const getProductByIdService = async (id) => {
    const res = await API.get(`/publications/${id}`)
    return res.data
}

export const createProductService = async (data) => {
    const res = await API.post("/users/me/publications", data)
    return res.data
}

export const updateProductService = async (id, data) => {
    const res = await API.put(`/users/me/publications/${id}`, data)
    return res.data
}

export const deleteProductService = async (id) => {
    const res = await API.delete(`/users/me/publications/${id}`)
    return res.data
}

export const likeProductService = async (id) => {
    const res = await API.post(`/publications/${id}/favorites`)
    return res.data
}