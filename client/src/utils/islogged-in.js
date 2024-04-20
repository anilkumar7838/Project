import { jwtDecode } from "jwt-decode";
export const isLoggedIn = async () => {
  try {
    if (localStorage.getItem("access_token")) {
      const payload = jwtDecode(localStorage.getItem("access_token"));
      if (payload && payload.exp && payload.exp >= Date.now() / 1000) {
        return true;
      }
    }
    const res = await fetch("http://localhost:3001/api/auth/isloggedin", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const { message, access_token } = await res.json();
    localStorage.setItem("access_token", access_token);
    if (message) return message;
  } catch (error) {
    try {
      const res = await fetch("http://localhost:3001/api/auth/isloggedin", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const { message, access_token } = await res.json();
      localStorage.setItem("access_token", access_token);
      if (message) return message;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};