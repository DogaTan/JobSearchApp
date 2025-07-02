import API from "./api";

export const register = async (formData) => {
  const response = await API.post("/auth/register", {
    ...formData,
    role: "ROLE_USER",
  });
  return response.data;
};

export const companyRegister = async (formData) => {
  const response = await API.post("/auth/company-register", {
    ...formData,
    role: "ROLE_COMPANY",
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};