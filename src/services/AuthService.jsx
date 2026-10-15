import ApiClient from "../config/ApiClient";

export const AuthService = {
    // login
    login: async(data) => {
        try {
            const response = await ApiClient.post(`api/user/login`, data)
            return response
        } catch (error) {
            throw error.response ? error.response.data: error
        }
    },
}