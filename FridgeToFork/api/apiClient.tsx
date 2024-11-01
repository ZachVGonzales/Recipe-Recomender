import axios from 'axios';


const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/recipes",
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
