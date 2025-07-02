import API from "./api";

export const searchJobs = async (title, city, page = 0, size = 10) => {
  const response = await API.get("/jobs/search", {
    params: { title, city, page, size },
  });
  return response.data.content;
};

export const fetchFeaturedJobs = async (city) => {
  const response = await API.get("/jobs", {
    params: { city, page: 0, size: 5 },
  });
  return response.data.content;
};

export const addJobAdmin = async (jobData) => {
  const response = await API.post("/admin/jobs", jobData);
  return response.data;
};

export const updateJobAdmin = async (id, jobData) => {
  const response = await API.put(`/admin/jobs/${id}`, jobData);
  return response.data;
};

export const deleteJobAdmin = async (id) => {
  const response = await API.delete(`/admin/jobs/${id}`);
  return response.data;
};

export const fetchAllJobsAdmin = async (userId) => {
  const params = userId ? { userId } : {};
  const response = await API.get("/admin/jobs", { params });
  return response.data;
};