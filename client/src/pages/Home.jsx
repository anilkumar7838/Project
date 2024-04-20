import { Container } from "postcss";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { isLoggedIn } from "../utils/islogged-in";
import { toast } from "react-toastify";
import FacultyDashboard from "../components/FacultyDashboard";
import StudentDashBoard from "../components/StudentDashboard";
export default function Home() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        await isLoggedIn();
        const payload = jwtDecode(localStorage.getItem("access_token"));
        const res = await fetch(`http://localhost:3001/api/user/getone`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            collegeid: payload.collegeid,
          }),
        });
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.log(error);
        toast.error("Error while fetching user");
      }
    };
    getUser();
  }, []);

  return (
    <div className="bg-gray-200" style={{ height: "100vh" }}>
      <nav className="w-full flex flex-wrap  justify-between mx-auto px-4 py-2 bg-white items-baseline lg:px-5 ">
        <div
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-smtext-center p-2 "
        >
          Sign Out
        </div>
        <div className="items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse flex flex-col bg-gray-200 p-1 rounded-md">
          <p>Name: {user.name}</p>
          <p className="capitalize text-xs">{`${user.role} ID: ${user.collegeid}`}</p>
        </div>
      </nav>
      {user && user?.role === "faculty" ? (
        <FacultyDashboard />
      ) : (
        <StudentDashBoard />
      )}
    </div>
  );
}
