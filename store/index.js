export const state = () => ({
  baseURL: process.env.baseURL,
});

export const getters = {
  baseURL(state) {
    return state.baseURL;
  },
};
