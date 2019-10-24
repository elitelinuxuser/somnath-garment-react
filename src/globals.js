const SERVER_URI = "http://localhost:5002/api";
const getConfig = {
  headers: {
    "x-auth-token": localStorage.getItem("token")
  }
};
const postHeaders = {
  "content-type": "application/json"
};

export { SERVER_URI, getConfig, postHeaders };
