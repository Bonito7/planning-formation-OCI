import axios from "axios";

// CORRECTION 1: Le backend tourne sur le port 3000, pas 5173
// CORRECTION 2: Pour Vite, utilisez import.meta.env

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("formation_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Services pour les formations
export const formationsService = {
  getAll: () => api.get("/formations"),
  getById: (id: string) => api.get(`/formations/${id}`),
  create: (data: any) => api.post("/formations", data),
  update: (id: string, data: any) => api.put(`/formations/${id}`, data),
  delete: (id: string) => api.delete(`/formations/${id}`),
};

// Services pour les modules
export const modulesService = {
  getAll: () => api.get("/modules"),
  getByFormation: (formationId: string) =>
    api.get(`/modules/formation/${formationId}`),
  create: (data: any) => api.post("/modules", data),
  update: (id: string, data: any) => api.put(`/modules/${id}`, data),
  delete: (id: string) => api.delete(`/modules/${id}`),
};

// Services pour les apprenants
export const apprenantsService = {
  getFormationsDisponibles: () => api.get("/apprenants/formations"),
  getPlanningParDate: (date: string) =>
    api.get(`/apprenants/calendrier/${date}`),
  getModulesDuJour: () => api.get("/apprenants/modules/aujourdhui"),
};
