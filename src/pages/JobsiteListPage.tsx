import { jobsitesData } from "../data/mock_data";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import StatusBadge from "../components/StatusBadge";
import CreateJobsiteModal from "../components/CreateJobsiteModal";

import useLocalStorage from "../hooks/useLocalStorage";
import type { Jobsite } from "../types/general";

const JobsiteListPage = () => {
  const [jobsites, setJobsites] = useLocalStorage<Jobsite[]>(
    "jobsites",
    jobsitesData,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchJob, setSearchJob] = useState("");

  const navigate = useNavigate();

  const onRoadCount = jobsites.filter((j) => j.status === "On Road").length;
  const completedCount = jobsites.filter(
    (j) => j.status === "Completed",
  ).length;
  const onHoldCount = jobsites.filter((j) => j.status === "On Hold").length;

  const filteredJobsites = jobsites.filter((job) =>
    job.name.toLowerCase().includes(searchJob.toLowerCase()),
  );

  const handleCreateJobsite = (data: {
    name: string;
    categories: number[];
    status: string;
  }) => {
    const newJobsite: Jobsite = {
      id: Date.now(),
      name: data.name,
      status: data.status,
      categories: data.categories,
    };

    setJobsites((prev) => [...prev, newJobsite]);
  };

  return (
    <>
      <div>
        <div className="px-2 pt-2 space-y-2 mb-2">
          <div className="border border-gray-300 rounded-xl p-2 mb-1 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="bg-[#ecde7c] rounded-lg py-5 text-center font-semibold text-white">
                {onRoadCount} On Road
              </div>

              <div className="bg-[#7ac14d] rounded-lg py-5 text-center font-semibold text-white">
                {completedCount} Completed
              </div>

              <div className="bg-[#fe4c4a] rounded-lg py-5 text-center font-semibold text-white">
                {onHoldCount} On Hold
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white px-2 rounded-xl shadow-md overflow-hidden ">
          <div className="h-[45px] bg-[#F8F8FA] flex items-center px-4 border-b rounded-t-xl">
            <h1 className="text-lg font-bold">Title</h1>
          </div>
          <div className="p-4">
            <div className="flex flex-col gap-3 mb-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start sm:items-center gap-2 text-sm text-gray-600">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#1264a3] text-white text-xs font-bold shrink-0 mt-[2px] sm:mt-0">
                  i
                </span>
                <p className="leading-snug">Click Create to add a new jobsite</p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none sm:w-[320px]">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                      />
                    </svg>
                  </span>

                  <input
                    type="text"
                    placeholder="Search a jobsite"
                    value={searchJob}
                    onChange={(e) => setSearchJob(e.target.value)}
                    className="h-8 w-full rounded-md border border-gray-200 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200"
                  />
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group flex items-center h-8 rounded-lg overflow-hidden bg-[#71cf48] hover:bg-[#68c142] transition-colors shrink-0"
                >
                  <span className="px-6 text-white text-sm font-medium flex items-center justify-center">
                    Create
                  </span>

                  <span className="h-full w-[2px] bg-[#68c142] group-hover:bg-[#71cf48] transition-colors" />

                  <span className="px-4 text-white text-lg font-semibold flex items-center justify-center">
                    +
                  </span>
                </button>
              </div>
            </div>

            <table className="w-full table-fixed border-separate border-spacing-0 text-[15px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left font-bold py-3 pl-4 sm:pl-[220px] w-[50%] sm:w-[520px]">
                    Jobsite Name
                  </th>
                  <th className="text-center font-bold py-3 pr-4 sm:pr-[110px] w-[50%] sm:w-[220px]">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredJobsites.map((job, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-gray-200 ${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 cursor-pointer transition`}
                    onClick={() =>
                      navigate("/jobsite", { state: { jobsite: job } })
                    }
                  >
                    <td className="py-1 pl-4 sm:pl-[220px] w-[50%] sm:w-[520px] align-middle truncate">
                      <span className="text-blue-600">{job.name}</span>
                    </td>

                    <td className="py-1 pr-4 sm:pr-[110px] w-[50%] sm:w-[220px] align-middle text-center">
                      <div className="h-full flex items-stretch justify-center">
                        <StatusBadge status={job.status} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CreateJobsiteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleCreateJobsite}
        />
      )}
    </>
  );
};

export default JobsiteListPage;
