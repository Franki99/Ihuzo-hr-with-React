import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { userService } from "../services/user";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState({
    field: "firstName",
    direction: "asc",
  });
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const pageSize = 10;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const requestParams = {
        page: currentPage - 1,
        size: pageSize,
        search: search,
        sort: `${sortBy.field},${sortBy.direction}`,
      };
      console.log("Request parameters:", requestParams);
      const response = await userService.getUsers(requestParams);
      console.log("Response:", response);
      setUsers(response.data.content);
      setTotalUsers(response.data.totalElements);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, search, sortBy.field, sortBy.direction]);

  const handleSort = (field) => {
    setSortBy((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleEdit = (user) => {
    navigate(`/users/edit/${user.id}`);
  };

  const handleDownload = () => {
    try {
      const headers = [
        "First Name",
        "Last Name",
        "Email",
        "Role",
        "Phone Number",
        "Date of Birth",
      ];
      const csvData = users.map((user) => [
        user.firstName,
        user.lastName,
        user.email,
        user.roles[0].name.replace("ROLE_", ""),
        user.phoneNumber,
        user.dateOfBirth,
      ]);

      const csvContent = [
        headers.join(","),
        ...csvData.map((row) => row.join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "employees.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading data:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userService.deleteUser(id);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0A0A0A] text-white p-6"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Employees</h1>
          <p className="text-gray-400">Manage your organization employees</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-[#1a1a1a] text-white rounded-xl hover:bg-[#2a2a2a] 
                     transition-all duration-300 transform hover:-translate-y-1 
                     hover:shadow-lg flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Download CSV
          </button>
          <button
            onClick={() => navigate("/users/add")}
            className="px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 
                     transition-all duration-300 transform hover:-translate-y-1 
                     hover:shadow-lg hover:shadow-orange-500/25"
          >
            Add Employee
          </button>
        </div>
      </div>

      <div className="bg-[#121212] rounded-xl p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-800 rounded-lg
                       text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>
          <button
            className="px-4 py-2 bg-[#1a1a1a] text-gray-400 rounded-lg hover:bg-[#222]
                       transition-colors duration-300"
          >
            Filters
          </button>
        </div>
      </div>

      <div className="bg-[#121212] rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1a1a1a]">
              <tr>
                {[
                  { field: "firstName", label: "First Name" },
                  { field: "lastName", label: "Last Name" },
                  { field: "email", label: "Email" },
                  { field: "roles", label: "Role" },
                  { field: "phoneNumber", label: "Phone" },
                  { field: "dateOfBirth", label: "Date of Birth" },
                ].map((column) => (
                  <th
                    key={column.field}
                    className="px-6 py-4 text-left text-sm font-medium text-gray-400 cursor-pointer
                             hover:text-white transition-colors duration-300"
                    onClick={() => handleSort(column.field)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {sortBy.field === column.field && (
                        <span>{sortBy.direction === "asc" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                  </td>
                </tr>
              ) : !users || users.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-400"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.firstName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            user.roles[0].name === "ROLE_ADMIN"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                      >
                        {user.roles[0].name.replace("ROLE_", "")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.dateOfBirth}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-[#1a1a1a] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing {(currentPage - 1) * pageSize + 1} to{" "}
              {Math.min(currentPage * pageSize, totalUsers)} of {totalUsers}{" "}
              entries
            </div>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 bg-[#222] text-gray-400 rounded-lg hover:bg-[#333]
                         transition-colors duration-300 disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 bg-[#222] text-gray-400 rounded-lg hover:bg-[#333]
                         transition-colors duration-300 disabled:opacity-50"
                disabled={currentPage * pageSize >= totalUsers}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
