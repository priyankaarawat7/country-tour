import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const getCountryData = () => {
  return api.get("/countries");
};

export const getCountryByName = (name) => {
  return api.get(
    `/countries/${encodeURIComponent(name)}`
  );
};