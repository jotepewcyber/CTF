import api from "./axios";

// Wrapper functions (customize as needed)
export const registerUser = (data: any) => api.post("accounts/register/", data);
export const loginUser = (data: any) => api.post("accounts/login/", data);
export const fetchMe = () => api.get("accounts/me/");
export const refreshAccess = () => api.post("accounts/refresh/");

// CATEGORY
export const getCategories = () => api.get("challenges/categories/");
export const createCategory = (data: { name: string }) =>
  api.post("challenges/categories/", data);
console.log("API Client loaded", { getCategories, createCategory });
export const updateCategory = (categoryId: number, data: { name: string }) => {
  return api.put(`challenges/categories/${categoryId}/edit/`, data);
};
export const deleteCategory = (categoryId: number) => {
  return api.delete(`challenges/categories/${categoryId}/edit/`);
};

// QuUESTIONS
export const getQuestionsByCategory = (categoryId: number) =>
  api.get(`challenges/categories/${categoryId}/questions/`);
export const createQuestions = (data: any) =>
  api.post("challenges/questions/create/", data);
export const getQuestionDetail = (challengeId: number) =>
  api.get(`challenges/questions/${challengeId}/get/`);
// Update challenge
export const updateQuestion = (challengeId: number, data: any) => {
  return api.put(`challenges/questions/${challengeId}/edit/`, data);
};

// Delete challenge
export const deleteQuestion = (challengeId: number) => {
  return api.delete(`challenges/questions/${challengeId}/edit/`);
};
export const uploadChallengeFiles = (challengeId: number, files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  return api.post(
    `challenges/questions/${challengeId}/attachments/`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
};

// SOLVE
export const submitFlag = (challengeId: number, flag: string) =>
  api.post(`challenges/questions/${challengeId}/submit/`, { flag });

export const getScoreboard = () => api.get("challenges/scoreboard/");

export const getUsers = () => api.get("accounts/users/");

//endpoint for competition
// Public: Get current competition info (for timer)
export const getCompetitionInfo = () => api.get("/competition/info/");

// Admin: Get all competitions
export const getCompetitionsAdmin = () => api.get("/competition/admin/");

// Admin: Create a new competition
export const createCompetition = (data: {
  name: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
}) => api.post("/competition/admin/", data);

// Admin: Update a competition
export const updateCompetition = (id: number, data: any) =>
  api.put(`/competition/admin/${id}/`, data);

export const deleteCompetition = (id: number) =>
  api.delete(`/competition/admin/${id}/`);

export { api };
