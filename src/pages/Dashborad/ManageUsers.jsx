import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/common/Spinner";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    // 🔹 Load users
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const res = await axiosSecure.get("/users");
                setUsers(res.data);
            } catch (error) {
                console.error("Failed to load users", error);
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, [axiosSecure]);

    // 🔹 Make Admin
    const handleMakeAdmin = async (id) => {
        try {
            setActionLoading(id);
            await axiosSecure.patch(`/admin/users/${id}/make-admin`);

            setUsers(prev =>
                prev.map(user =>
                    user._id === id ? { ...user, role: "admin" } : user
                )
            );
        } catch (error) {
            console.error("Make admin failed", error);
        } finally {
            setActionLoading(null);
        }
    };

    // 🔹 Remove User
    const handleDeleteUser = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this user?");
        if (!confirm) return;

        try {
            setActionLoading(id);
            await axiosSecure.delete(`/admin/users/${id}`);
            setUsers(prev => prev.filter(user => user._id !== id));
        } catch (error) {
            console.error("Delete failed", error);
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Manage Users</h2>

            {users.length === 0 ? (
                <p className="text-gray-500">No users found.</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl border">
                    <table className="table w-full">
                        <thead className="bg-orange-50 text-sm">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name || "N/A"}</td>
                                    <td>{user.email}</td>
                                    <td className="capitalize font-medium">
                                        {user.role}
                                    </td>

                                    <td className="flex gap-2 justify-center">
                                        {user.role !== "admin" && (
                                            <button
                                                disabled={actionLoading === user._id}
                                                onClick={() => handleMakeAdmin(user._id)}
                                                className="btn btn-xs bg-orange-500 text-white"
                                            >
                                                {actionLoading === user._id ? "Processing..." : "Make Admin"}
                                            </button>
                                        )}

                                        <button
                                            disabled={actionLoading === user._id}
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="btn btn-xs bg-red-500 text-white"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
