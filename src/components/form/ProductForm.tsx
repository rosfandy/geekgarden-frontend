import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

interface Product {
    id: number;
    name: string;
    desc: string;
    stock: number;
}

interface ProductFormProps {
    onClose: () => void;
    onProductAdded: (product: Product) => void;
    products: Product | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ onClose, onProductAdded }) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [stock, setStock] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const cookies = new Cookies();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(`${process.env.VITE_API_URL}/api/products`, {
                name,
                desc,
                stock,
            }, {
                headers: {
                    'Authorization': `Bearer ${cookies.get('token')}`,
                }
            });

            onProductAdded(response.data);
            onClose();
            window.location.reload();
        } catch (err) {
            console.error(err);
            setError("Failed to add product. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-lg font-bold">Add New Product</h2>
                {error && <div className="text-red-500">{error}</div>} { }
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="border p-1 w-full"
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input
                            type="text"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            required
                            className="border p-1 w-full"
                        />
                    </div>
                    <div>
                        <label>Stock:</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(Number(e.target.value))}
                            required
                            className="border p-1 w-full"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-1 px-2 rounded mt-2">
                        Add Product
                    </button>
                    <button type="button" onClick={onClose} className="bg-gray-500 text-white py-1 px-2 rounded mt-2 ml-2">
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;