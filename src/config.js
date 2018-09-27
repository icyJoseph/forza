// endpoints
export const url =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SECRET
    : "http://localhost:1337/";
