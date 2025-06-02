import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function AddEdit() {
    const { id } = useParams();
    const [book, setBook] = useState({
        title: '',
        author: '',
        quantity: '',
        copiesSold: ''
    });

    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const validate = () => {
        let temp = {};
        if (!book.title) temp.title = "Title is required.";
        if (!book.author) temp.author = "Author is required.";
        if (book.quantity === '' || book.quantity < 0) temp.quantity = "Quantity must be 0 or more.";
        if (book.copiesSold === '' || book.copiesSold < 0) temp.copiesSold = "Copies sold must be 0 or more.";
        setErrors(temp);
        return Object.keys(temp).length === 0;
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!validate()) return;

        try {
            if (isEdit) {
                // await axios.put(`http://localhost:5000/api/books/${id}`, book);
                await axios.put(`https://book-store-back-end-khaki.vercel.app/api/books/${id}`, book);
            } else {
                // await axios.post('http://localhost:5000/api/books', book);
                await axios.post('https://book-store-back-end-khaki.vercel.app/api/books', book);
            }
            navigate('/');
        } catch (error) {
            setApiError(error.response?.data?.message || "Something went wrong.");
        }
    };

    const fetchBook = async () => {
        try {
            // const res = await axios.get(`http://localhost:5000/api/books/${id}`);
            const res = await axios.get(`https://book-store-back-end-khaki.vercel.app/api/books/${id}`);
            setBook(res.data);
        } catch (err) {
            setApiError("Failed to fetch book.");
        }
    };

    useEffect(() => {
        if (isEdit) fetchBook();
    }, [id]);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-xl font-semibold mb-4">{isEdit ? "Edit Book" : "Add New Book"}</h2>
            {apiError && <p className="text-red-600">{apiError}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-full border p-2 rounded"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>
                <div>
                    <input
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        placeholder="Author"
                        className="w-full border p-2 rounded"
                    />
                    {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
                </div>
                <div>
                    <input
                        name="quantity"
                        type="number"
                        value={book.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                        className="w-full border p-2 rounded"
                    />
                    {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
                </div>
                <div>
                    <input
                        name="copiesSold"
                        type="number"
                        value={book.copiesSold}
                        onChange={handleChange}
                        placeholder="Copies Sold"
                        className="w-full border p-2 rounded"
                    />
                    {errors.copiesSold && <p className="text-red-500 text-sm">{errors.copiesSold}</p>}
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        {isEdit ? "Update" : "Add"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="text-blue-600 underline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
