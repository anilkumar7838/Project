import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { URL } from "../utils/url";

export default function StudentDashBoard({ collegeid }) {
  const [hasporoject, setHasPorject] = useState(false);
  const [project, setProject] = useState({});
  useEffect(() => {
    const get = async () => {
      try {
        const res = await fetch(`${URL}/api/project/getone`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ collegeid }),
        });

        if (res.status == 404) {
          return;
        }
        const data = await res.json();
        console.log(data);
        setHasPorject(true);
        setProject(data.project);
      } catch (error) {
        console.log(error);

        toast.warn("cant fetch the project");
      }
    };
    get();
  }, [collegeid]);

  const download = (DATA, filename) => {
    // console.log(DATA);
    const { _id, createdAt, updatedAt, __v, ...data } = DATA;
    const headers = Object.keys(data);
    const jsonToCsv = () => {
      let csv = headers.join(",") + "\n";
      [data].forEach((row) => {
        csv +=
          headers
            .map((fieldName) => {
              const escaped = ("" + row[fieldName]).replace(/"/g, '\\"');
              return `"${escaped}"`;
            })
            .join(",") + "\n";
      });

      return csv;
    };

    const downloadCsv = () => {
      const csv = jsonToCsv();
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = filename;
      link.href = url;
      link.click();
    };

    downloadCsv();
  };

  if (!hasporoject) return <div className="">no proj</div>;
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mx-auto mt-10 flex flex-col">
      <div id="project-details">
        <div className="mb-4 text-center font-bold text-xl">
          Project Details
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 ">
            <li className="pt-3 pb-0 sm:pt-4 flex items-center  justify-between">
              <p className="min-w-0 ms-4 text-sm   truncate ">Student ID</p>
              <p className="   ">{project.student_collegeid}</p>
            </li>
            <li className="pt-3 pb-0 sm:pt-4 flex items-center  justify-between">
              <p className="min-w-0 ms-4 text-sm   truncate ">Email ID</p>
              <p className="   ">{project.email}</p>
            </li>
            <li className="pt-3 pb-0 sm:pt-4 flex items-center  justify-between">
              <p className="min-w-0 ms-4 text-sm   truncate ">Project ID</p>
              <p className="   ">{project.project_id}</p>
            </li>
            <li className="pt-3 pb-0 sm:pt-4 flex items-center  justify-between">
              <p className="min-w-0 ms-4 text-sm   truncate ">Mentor</p>
              <p className="   ">{project.mentor}</p>
            </li>
            <li className="pt-3 pb-0 sm:pt-4 flex items-center  justify-between">
              <p className="min-w-0 ms-4 text-sm   truncate ">Faculty</p>
              <p className="   ">{project.faculty_name}</p>
            </li>
            <li className="pt-3 pb-0 sm:pt-4 flex items-center  justify-between">
              <p className="min-w-0 ms-4 text-sm   truncate ">Title</p>
              <p className="   ">{project.title}</p>
            </li>
            <li className="pt-3 pb-0 sm:pt-4 flex items-center  justify-between">
              <p className="min-w-0 ms-4 text-sm   truncate ">
                Budget Requested
              </p>
              <p className="   ">{project.budget_requested}</p>
            </li>
            <li className="pt-3 pb-0 sm:pt-4 flex items-center  justify-between">
              <p className="min-w-0 ms-4 text-sm   truncate ">Budget Status</p>
              <p className="   ">{project.budget_status}</p>
            </li>
            <li className="pt-3 pb-0 sm:pt-4 flex items-center  justify-between">
              <p className="min-w-0 ms-4 text-sm   truncate ">Stall Number</p>
              <p className="   ">{project.stall_number}</p>
            </li>
            <li className="pt-3 pb-0 sm:pt-4 flex items-center  justify-between"></li>
          </ul>
        </div>
      </div>
      <div
        onClick={() => download(project, "sudent-" + project.student_collegeid)}
        className=" cursor-pointer flex flex-row text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 my-2 justify-center gap-2 align-top"
      >
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Interface / Download">
            <path
              id="Vector"
              d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
        <p>Download Details</p>
      </div>
    </div>
  );
}
