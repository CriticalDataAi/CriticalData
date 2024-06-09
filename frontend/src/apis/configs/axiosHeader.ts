import Cookies from "js-cookie";

const getHeader = () => {
     const token = Cookies.get('auth-token');
     return { Authorization: `Bearer ${token}` }
}

export default getHeader