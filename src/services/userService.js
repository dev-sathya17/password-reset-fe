import instance from "./instance";

const userService = {
  forgot: async (email) => {
    return await instance.post("/users/forgot", { email });
  },
  verify: async (authString) => {
    return await instance.get(`/users/verify/${authString}`);
  },
  reset: async (email, password) => {
    return await instance.post("/users/reset", { email, password });
  },
};

export default userService;
