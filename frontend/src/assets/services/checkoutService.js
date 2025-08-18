import API from "./api"

export const checkoutService = async (cart, token) => {
    try {
        const res = await API.post(
            "/checkouts",
            { cart },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return res.data
    } catch (error) {
        console.error("Error in checkoutService:", error.message)
        throw error
    }

}

