import { useEffect, useState } from "react";
import Layout from "../layout";
import axios from "axios";
import { getDatasFromToken, token } from "../../../../lib/jwt";
import { UserData } from "../page";

export function Profile() {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const data = getDatasFromToken();
        if (data && data.id) {
            axios.get(`${process.env.VITE_API_URL}/api/users/${data.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => {
                    setUser(response.data.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError("Failed to load user data.");
                    console.error(err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => (prevUser ? { ...prevUser, [name]: value } : prevUser));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) {
            setError("User data is not available.");
            return;
        }
        try {
            const response = await axios.put(`${process.env.VITE_API_URL}/api/users/${user.id}`, user, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            alert("Profile updated successfully.");
            localStorage.setItem('userData', JSON.stringify({ ...user, ...response.data.data }));
        } catch (err) {
            setError("Failed to update profile. Please try again.");
            console.error(err);
        }
    };

    return (
        <Layout>
            <div className="bg-slate-50 w-full flex justify-center">
                {loading ? <p>Loading...</p>
                    : <div className="mt-32">
                        <div className="bg-white p-8 w-[20em] rounded shadow-sm border">
                            <h1 className="text-xl font-bold">Profile</h1>
                            {error && <p className="text-red-500">{error}</p>}
                            <form onSubmit={handleSubmit} className="mt-4">
                                <div>
                                    <label className="block mb-2">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={user?.name || ""}
                                        onChange={handleChange}
                                        className="border rounded p-2 w-full"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-2">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={user?.email || ""}
                                        onChange={handleChange}
                                        className="border rounded p-2 w-full"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="mt-4 bg-black text-white py-2 px-4 rounded"
                                >
                                    Update Profile
                                </button>
                            </form>
                        </div>
                    </div>
                }
            </div>
        </Layout>
    );
}