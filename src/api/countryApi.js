import axios from "axios";


// Connect React frontend to Node.js backend

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});


// Fetch all countries

export const getCountryData = () => {
  return api.get("/countries");
};


// Fetch individual country

export const getCountryByName = (name) => {
  return api.get(
    `/countries/${encodeURIComponent(name)}`
  );
};