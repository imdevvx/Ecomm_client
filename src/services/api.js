import axios from 'axios'
const api = axios.create({
    // baseURL: 'https://ecommerce-backend-v6gv.onrender.com/api'
    baseURL: 'http://localhost:5000/api'
})
export default api;

// for get/delete
// axios.get(url, config)

// for post/put
// axios.post(url, data, config)

/*
we can simply use a interceptor if we have to pass the same header/config (token) to 
every request, like this -:

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

*/

/*
If we want to send data in delete request then 
export const removeCartItem = async (productId, size) => {
    const res = await api.delete(`/cart/remove/${productId}`, {
        data: {
            size
        }
    });

    return res.data;

// data key is must
}
*/