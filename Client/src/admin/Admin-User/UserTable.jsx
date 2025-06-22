import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: ""
  });

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get("http://localhost:8080/api/v1/users/get-users", config);
      setUsers(response.data.users);
      console.log(response.data);



    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(`http://localhost:8080/api/v1/users/delete-user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((item) => item._id !== id));
    } catch (error) {
      console.error("error", error.response);
    }
  };

  const handleEditSubmit = async () => {
    const { firstName, lastName, email, role } = editForm;

    // Frontend validation
    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !role?.trim()
    ) {
      alert("All fields are required!");
      return;
    }
    console.log("Submitting to backend:", editForm);
    const token = localStorage.getItem("accessToken");
    try {
      await axios.post(`http://localhost:8080/api/v1/users/update-user/${editUser._id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditUser(null);
      fetchUser(); // refresh
    } catch (error) {
      console.error("Update failed", error.response);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <>
      <div className="flex justify-between items-center text-title-sm md:text-title-md mb-3">
        <h1 className="text-black dark:text-white">Users</h1>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="bg-white text-sm md:text-base w-full table-auto">
          <thead>
            <tr className="bg-bodydark text-center dark:bg-black">
              <th className="min-w-[100px] py-2 px-2 font-bold text-black dark:text-white">User Name</th>
              <th className="min-w-[100px] py-2 px-2 font-bold text-black dark:text-white">Role</th>
              <th className="min-w-[100px] py-2 px-2 font-bold text-black dark:text-white">Email</th>
              <th className="min-w-[100px] py-2 px-2 font-bold text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length !== 0 ? (
              users.map((user) => (
                <tr key={user._id} className="dark:bg-graydark text-center">
                  <td className="border-b border-[#eee] py-2 px-2">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="border-b border-[#eee] py-2 px-2">{user.role}</td>
                  <td className="border-b border-[#eee] py-2 px-2">{user.email}</td>
                  <td className="border-b border-[#eee] py-2 px-2">
                    <div className="flex gap-2 justify-center">
                      <button onClick={() => setViewUser(user)}><FaEye /></button>
                      <button onClick={() => {
                        setEditUser(user);
                        setEditForm({
                          firstName: user.firstName || "",
                          lastName: user.lastName || "",
                          email: user.email || "",
                          role: user.role || ""
                        });
                      }}><FaEdit /></button>
                      <button onClick={() => handleDelete(user._id)}><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {viewUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">View User</h2>
            <p><strong>Name:</strong> {viewUser.firstName} {viewUser.lastName}</p>
            <p><strong>Email:</strong> {viewUser.email}</p>
            <p><strong>Role:</strong> {viewUser.role}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setViewUser(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <input
              className="w-full mb-2 p-2 border rounded"
              value={editForm.firstName}
              onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
              placeholder="First Name"
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              value={editForm.lastName}
              onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
              placeholder="Last Name"
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              placeholder="Email"
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              value={editForm.role}
              onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
              placeholder="Role"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setEditUser(null)}>Cancel</button>
              <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={handleEditSubmit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTable;
