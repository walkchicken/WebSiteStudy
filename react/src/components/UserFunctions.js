import axios from 'axios'

class UserFunctions {
    register(first_name, last_name, email, password) {
        return axios
            .post('users/register', {
                first_name,
                last_name,
                email,
                password
            });
    }
    members(first_name, last_name, email, number, birthday, address) {
        return axios
            .post('users/members', {
                first_name,
                last_name,
                email,
                number,
                birthday,
                address,
            });
    }

    login(email, password) {
        return axios
            .post('users/login', {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("userToken", JSON.stringify(response.data.token));
                }

                return response.data;
            });
    }

}
export default new UserFunctions();

export const getAPI = (url, params = {}) => {
    return axios.get(url, params);
};

export const postAPI = (url, data) => {
    return axios.post(url, data);
};