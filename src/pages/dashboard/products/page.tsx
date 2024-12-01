import { useState, useEffect } from "react";
import Layout from "../layout";
import axios from "axios";
import { token } from "../../../../lib/jwt";

interface Owner {
    name: string;
}

interface Product {
    id: number;
    name: string;
    owner: Owner;
    desc: string;
    stock: number;
}

export function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [updatedProducts, setUpdatedProducts] = useState<{ [key: number]: Partial<Product> }>({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<{ data: Product[] }>(`${process.env.VITE_API_URL}/api/products`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setProducts(response.data.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`${process.env.VITE_API_URL}/api/products/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                alert("Product deleted successfully.");
                window.location.reload();
            } catch (err) {
                console.log(err)
                setError("Failed to delete product.");
            }
        }
    };

    const handleUpdate = async (id: number) => {
        const updatedProduct = updatedProducts[id];
        if (!updatedProduct) return;

        try {
            const response = await axios.put<Product>(`${process.env.VITE_API_URL}/api/products/${id}`, updatedProduct, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setProducts(products.map(product => (product.id === id ? response.data : product)));
            alert("Product updated successfully.");
            window.location.reload();
        } catch (err) {
            console.log(err);
            setError("Failed to update product.");
        }
    };

    const handleInputChange = (id: number, field: keyof Product, value: string | number) => {
        setUpdatedProducts(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            }
        }));
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Layout>
            <div className="bg-slate-50 w-full flex justify-center">
                <div className="overflow-auto max-h-[80vh] mt-16">
                    <h1 className="text-2xl font-bold mb-4">Products</h1>
                    {error && <p className="text-red-500 py-4">{error}</p>}
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">ID</th>
                                <th className="border border-gray-300 p-2">Name</th>
                                <th className="border border-gray-300 p-2">Owner</th>
                                <th className="border border-gray-300 p-2">Description</th>
                                <th className="border border-gray-300 p-2">Stock</th>
                                <th className="border border-gray-300 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                    <td className="border border-gray-300 p-2">{product.id}</td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={product.name}
                                            onChange={(e) => handleInputChange(product.id, 'name', e.target.value)}
                                            className="border border-gray-300 p-1"
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <span className="">{product.owner.name}</span>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="text"
                                            name="desc"
                                            defaultValue={product.desc}
                                            onChange={(e) => handleInputChange(product.id, 'desc', e.target.value)}
                                            className="border border-gray-300 p-1"
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="number"
                                            name="stock"
                                            defaultValue={product.stock}
                                            onChange={(e) => handleInputChange(product.id, 'stock', Number(e.target.value))}
                                            className="border border-gray-300 p-1"
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <button onClick={() => handleUpdate(product.id)} className="bg-blue-500 text-white px-2 py-1 rounded">
                                            <i className="fa-solid fa-save"></i>
                                        </button>
                                        <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </Layout>
    );
}