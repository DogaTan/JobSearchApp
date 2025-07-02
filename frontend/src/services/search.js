import API from "./api";

export const saveSearch = async (searchData) => {
  const response = await API.post("/search", searchData);
  return response.data;
};

export const fetchRecentSearches = async (userId) => {
  const response = await API.get(`/search/recent/${userId}`);
  return response.data;
};