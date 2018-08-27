import axios from "axios";
import LocalStore from "store";
import { API_BASE_URL } from "@/config.js";
import router from "@/router";

const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000
});

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (LocalStore.get("token")) {
        config.headers["token"] = LocalStore.get("token");
    }

    // Spin.show()

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    // Do something with response data
    if (response.status !== 200) {
        if (response.status === 401) {
            router.push({name: "login"})
        }

        console.log("error")
    }

    if (!response.data.success) {
        console.log(response.data.message.info);
        return Promise.reject('error')
    }

    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default instance;
