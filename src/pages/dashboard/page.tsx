import { useEffect, useState } from "react";
import Layout from "./layout";
import { getDatasFromToken } from "../../../lib/jwt";
import Cookies from 'universal-cookie';
import axios from "axios";
import ProductForm from "../../components/form/ProductForm";

export interface UserData {
    isAdmin?: boolean;
    name?: string;
    email?: string;
    id?: number;
}

interface Product {
    id: number;
    name: string;
    desc: string;
    stock: number;
}

export function Dashboard() {
    const [user, setUser] = useState<UserData | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string>("");
    const [showForm, setShowForm] = useState<boolean>(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const cookies = new Cookies();

    useEffect(() => {
        const localUsedata = localStorage.getItem('userData');
        if (localUsedata) {
            const userData = JSON.parse(localUsedata);
            setUser(userData);
            fetchUserProducts(userData.id);
        } else {
            const userData = getDatasFromToken();
            localStorage.setItem('userData', JSON.stringify(userData));
            if (userData) {
                setUser(userData);
                fetchUserProducts(userData.id as number);
            }
        }
    }, []);

    const fetchUserProducts = async (userId: number) => {
        try {
            const response = await axios.get<{ data: Product[] }>(`${process.env.VITE_API_URL}/api/products/owner/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${cookies.get('token')}`,
                }
            });
            setProducts(response.data.data);
        } catch (err) {
            console.log(err)
            setError("Failed to fetch products.");
        }
    };

    const handleLogout = () => {
        cookies.remove('token');
        localStorage.removeItem('userData');
        window.location.href = '/login';
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${process.env.VITE_API_URL}/api/products/${id}`, {
                headers: {
                    'Authorization': `Bearer ${cookies.get('token')}`,
                }
            });
            setProducts(products.filter(product => product.id !== id));
            alert("Product deleted successfully.");
        } catch (err) {
            console.log(err)
            setError("Failed to delete product.");
        }
    };

    const handleEditChange = (id: number, field: string, value: string | number) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, [field]: value } : product
        ));
    };

    const handleUpdate = async (id: number) => {
        const productToUpdate = products.find(product => product.id === id);
        if (productToUpdate) {
            try {
                const response = await axios.put<Product>(`${process.env.VITE_API_URL}/api/products/${id}`, productToUpdate, {
                    headers: {
                        'Authorization': `Bearer ${cookies.get('token')}`,
                    }
                });
                setProducts(products.map(product => (product.id === id ? response.data : product)));
                alert("Product updated successfully.");
                window.location.reload();
            } catch (err) {
                console.log(err)
                setError("Failed to update product.");
            }
        }
    };

    const handleProductAdded = (newProduct: Product) => {
        setProducts([...products, newProduct]);
    };

    return (
        <Layout>
            <div className="bg-slate-50 w-full flex justify-center ">
                <div className="mt-32">
                    <div className="bg-white p-8 w-[20em] rounded shadow-sm border">
                        {user ? (
                            <div>
                                <h1 className="text-xl font-bold">Welcome, {user.name || "User    "}!</h1>
                                <div className="mt-4">
                                    <p>Email: {user.email}</p>
                                    <p>{user.isAdmin ? "You are an admin." : "You are a reseller."}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex gap-x -2 items-center mt-4 bg-black text-white py-2 px-4 rounded"
                                >
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <p>Loading usedata...</p>
                        )}
                    </div>

                    <div className="mt-8">
                        {error && <p className="text-red-500 py-4">{error}</p>}
                        <h2 className="text-xl font-bold">YourProducts</h2>
                        {showForm && (
                            <ProductForm
                                onClose={() => {
                                    setShowForm(false);
                                    setCurrentProduct(null);
                                }}
                                onProductAdded={handleProductAdded}
                                products={currentProduct}
                            />
                        )}
                        <table className="min-w-full border-collapse border border-gray-300 mt-4">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 p-2 bg-white">ID</th>
                                    <th className="border border-gray-300 p-2 bg-white">Name</th>
                                    <th className="border border-gray-300 p-2 bg-white">Description</th>
                                    <th className="border border-gray-300 p-2 bg-white">Stock</th>
                                    <th className="border border-gray-300 p-2 bg-white">Actions</th>
                                </tr>
                            </thead>
                            {products.length !== 0
                                ? (
                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product.id}>
                                                <td className="border border-gray-300 p-2 bg-white">{product.id}</td>
                                                <td className="border border-gray-300 p-2 bg-white">
                                                    <input
                                                        type="text"
                                                        value={product.name}
                                                        onChange={(e) => handleEditChange(product.id, 'name', e.target.value)}
                                                        className="border border-1 w-full"
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2 bg-white">
                                                    <input
                                                        type="text"
                                                        value={product.desc}
                                                        onChange={(e) => handleEditChange(product.id, 'desc', e.target.value)}
                                                        className="border border-1 w-full"
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2 bg-white">
                                                    <input
                                                        type="number"
                                                        value={product.stock}
                                                        onChange={(e) => handleEditChange(product.id, 'stock', Number(e.target.value))}
                                                        className="border border-1 w-full"
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2 bg-white">
                                                    <button
                                                        onClick={() => handleUpdate(product.id)}
                                                        className="bg-blue-500 text-white py-1 px-2 rounded"
                                                    >
                                                        <i className="fa-solid fa-save"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="bg-red-500 text-white py-1 px-2 rounded ml-2"
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                ) : <div>No products</div>
                            }
                        </table>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-black text-white py-2 px-4 rounded mt-4"
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}