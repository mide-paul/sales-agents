"use client";
import { useState } from "react";
import Image from "next/image";
import arrow_left from './../public/icons/arrow_left.svg';
import arrow_right from './../public/icons/arrow_right.svg';

interface Ad {
  id: number;
  name: string;
  startdate: string;
  enddate: string;
  impression: string;
  clicks: number;
}

const AdCampaign: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const clientsPerPage = 3; // Show 3 clients per page

  // Generate dynamic ads with current dates and clicks
  const ads: Ad[] = Array.from({ length: 30 }, (_, i) => {
    const currentDate = new Date();
    const startdate = new Date(currentDate);
    startdate.setDate(currentDate.getDate() + i);

    const enddate = new Date(startdate);
    enddate.setDate(startdate.getDate() + 7); // End date is 7 days after the start date

    return {
      id: i + 1,
      name: `Ad Campaign ${i + 1}`,
      startdate: startdate.toISOString().split("T")[0],
      enddate: enddate.toISOString().split("T")[0],
      impression: "--",
      clicks: Math.floor(Math.random() * 100) + 1, // Random clicks between 1 and 100
    };
  });

  const totalPages = Math.ceil(ads.length / clientsPerPage);

  // Pagination logic
  const paginatedClients = ads.slice(
    (currentPage - 1) * clientsPerPage,
    currentPage * clientsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6">
      {/* Lead Table */}
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left text-xs font-normal">
            <th className="p-2 py-2">Campaign Name</th>
            <th className="p-2 py-2">Start date</th>
            <th className="p-2 py-2">End date</th>
            <th className="p-2 py-2">Impressions</th>
            <th className="p-2 py-2">Clicks</th>
          </tr>
        </thead>
        <tbody>
          {paginatedClients.map((ad) => (
            <tr key={ad.id} className="border-b hover:bg-gray-50">
              <td className="p-2 py-4 flex gap-3 items-center text-xs">
                {ad.name}
              </td>
              <td className="px-2 py-4 text-xs">{ad.startdate}</td>
              <td className="p-2 py-4 flex text-xs">
                {ad.enddate}
              </td>
              <td className="p-2 py-4 font-medium text-xs text-black">
                {ad.impression}
              </td>
              <td className="p-2 py-4 text-xs text-black">{ad.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <Image
            src={arrow_left}
            alt=""
            className="absolute w-4 h-4 ml-3 object-cover"
          />
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-5 py-1 pl-7 rounded-md text-xs border border-blue-950 ${currentPage === 1
              ? "bg-white text-gray-500 cursor-not-allowed"
              : "bg-white text-blue-950 hover:bg-gray-100"
              }`}
          >
            Previous
          </button>
        </div>
        <span className="text-gray-700 text-xs">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex items-center">
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-1 pr-6 rounded-md text-xs border border-blue-950 ${currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-blue-950 hover:bg-gray-100"
              }`}
          >
            Next
          </button>
          <Image
            src={arrow_right}
            alt=""
            className="absolute w-4 h-4 ml-11 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AdCampaign;