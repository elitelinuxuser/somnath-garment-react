const SERVER_URI = "http://localhost:5002/api";
const getConfig = {
  headers: {
    "x-auth-token": localStorage.getItem("token")
  }
};

export { SERVER_URI, getConfig };
