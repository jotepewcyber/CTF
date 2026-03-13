import api from "./axios";

// Wrapper functions (customize as needed)
export const registerUser = (data: any) => api.post("accounts/register/", data);
export const loginUser = (data: any) => api.post("accounts/login/", data);
export const fetchMe = (token?: string) =>
  api.get(
    "accounts/me/",
    token ? { headers: { Authorization: `Bearer ${token}` } } : {},
  );
export const refreshAccess = () => api.post("accounts/refresh/");

// CATEGORY
export const getCategories = () => api.get("challenges/categories/");
export const createCategory = (data: { name: string }) =>
  api.post("challenges/categories/", data);

// CHALLENGE
export const getQuestionsByCategory = (categoryId: number) =>
  api.get(`challenges/categories/${categoryId}/questions/`);
export const createQuestions = (data: any) =>
  api.post("challenges/questions/create/", data);
export const getQuestionDetail = (challengeId: number) =>
  api.get(`challenges/questions/${challengeId}/`);

// SOLVE
export const submitFlag = (challengeId: number, flag: string) =>
  api.post(`challenges/questions/${challengeId}/submit/`, { flag });

export { api };
