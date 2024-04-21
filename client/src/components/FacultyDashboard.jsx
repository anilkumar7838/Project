import { useState } from "react";

export default function FacultyDashboard() {
  const [details, setDetails] = useState({
    email: "",
    project_id: "",
    mentor: "",
    faculty_name: "",
    title: "",
    budget_requested: "",
    budget_status: "",
    stall_number: "",
  });

  const inputs = {
    email: "Email ID",
    project_id: "Project ID",
    mentor: "Mentor",
    faculty_name: "Faculty",
    title: "Title",
    budget_requested: "Budget Request",
    budget_status: "Budget Status",
    stall_number: "Stall Number",
  };
  const handleSubmit = () => {};
  return (
    <div className="px-1 py-5 lg:px-0">
      <div className="lg:w-[80%] md:w-full sm:w-full p-4 text-center bg-white borde rounded-lg shadow sm:p-8 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap justify-normal mb-2 gap-6">
            {Object.keys(inputs).map((key, i) => (
              <div key={i} className="p-1 w-60">
                <label className="block mb-2 text-sm font-medium text-left">
                  {inputs[key]}
                </label>
                <input
                  type={key === "email" ? "email" : "text"}
                  value={details[key]}
                  onChange={(e) =>
                    setDetails({ ...details, [key]: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
            ))}
          </div>
          <hr />
          <div class="flex items-start py-3 px-2">
            <button
              type="button"
              class="text-white  bg-blue-600 rounded-md text-sm px-9 py-2.5 me-2 mb-2 font-medium"
            >
              Save Record
            </button>
            <button
              type="button"
              class="text-red-600 border-red-600 border-2  rounded-md text-sm px-9 py-2.5 me-2 mb-2 font-medium"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
