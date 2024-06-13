import { api } from "./configs/axiosConfig"

const AuthAPI = {
    async getToken (email: string, password: string) {
        const response = await api.request({
            url: '/auth/login',
            method: "POST",
            data: {
                email: email,
                password: password,
            }
        })

        return response.data
    }
}
export default AuthAPI;