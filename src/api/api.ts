import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "http://165.227.147.154:8081/api/users/auth", // URL
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

interface ILogin {
  username: string;
  password: string;
}

export interface IRegister {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const registerAPI = (data: IRegister): Promise<AxiosResponse> => {
  console.log(data);
  return instance.post("/register", data);
};

const loginAPI = (data: ILogin): Promise<AxiosResponse> => {
  console.log(data);
  return instance.post("/login", data);
};

export { registerAPI, loginAPI };
