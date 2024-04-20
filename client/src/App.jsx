import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import ForgotPassowrd from "./pages/forgot-password";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        closeOnClick
        pauseOnHover
        draggable
        autoClose={1500}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassowrd />} />
      </Routes>
    </BrowserRouter>
  );
}
