import React, { useEffect, useState } from "react";
import Layout from "../layout";
import axios from "axios";
import { token } from "../../../../lib/jwt";

interface User {
    id: number;
    name: string;
    email: string;
}

export function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [editedUser, setEditedUser] = useState<Record<number, Partial<User>>>({});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<{ data: User[] }>(`${process.env.VITE_API_URL}/api/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setUsers(response.data.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load users.");
                console.error(err);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>, userId: number) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({
            ...prev,
            [userId]: {
                ...prev[userId],
                [name]: value,
            },
        }));
    };

    const handleUpdateUser = async (userId: number) => {
        try {
            await axios.put<User>(`${process.env.VITE_API_URL}/api/users/${userId}`, editedUser[userId], {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            alert(`User  ${editedUser[userId].name} updated successfully.`);
            setError("");
        } catch (err) {
            if (Object.keys(editedUser).length === 0) {
                setError("Please edit the user first.");
            } else {
                setError("Failed to update user.");
            }
            console.error(err);
        }
    };

    const handleDeleteUser = async (userId: number) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`${process.env.VITE_API_URL}/api/users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setUsers(users.filter(user => user.id !== userId));
                alert("User  deleted successfully.");
            } catch (err) {
                setError("Failed to delete user.");
                console.error(err);
            }
        }
    };

    if (loading) {
        return <p>Loading users...</p>;
    }

    return (
        <Layout>
            <div className="bg-slate-50 w-full flex justify-center items-center">
                <div className="w-[50em]">
                    <h1 className="text-2xl font-bold mb-4">Users</h1>
                    {error && <p className="text-red-500 py-4">{error}</p>}
                    <div className="overflow-auto max-h-[80vh]">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 p-2">ID</th>
                                    <th className="border border-gray-300 p-2">Name</th>
                                    <th className="border border-gray-300 p-2">Email</th>
                                    <th className="border border-gray-300 p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                        <td className="border border-gray-300 p-2">{user.id}</td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="text"
                                                name="name"
                                                defaultValue={user.name}
                                                onChange={(e) => handleEditChange(e, user.id)}
                                                className="border border-gray-300 p-1"
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <input
                                                type="email"
                                                name="email"
                                                defaultValue={user.email}
                                                onChange={(e) => handleEditChange(e, user.id)}
                                                className="border border-gray- 300 p-1"
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-2">
                                            <button onClick={() => handleUpdateUser(user.id)} className="bg-blue-500 text-white px-2 py-1 rounded">
                                                <i className="fa-solid fa-save"></i>
                                            </button>
                                            <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}