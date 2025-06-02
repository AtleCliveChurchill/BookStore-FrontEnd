import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                // const res = await axios.get(`http://localhost:5000/api/books/${id}`);
                const res = await axios.get(`https://book-store-back-end-khaki.vercel.app/api/books/${id}`);
                setBook(res.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load book.");
            }
        };
        fetchBook();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            // await axios.delete(`http://localhost:5000/api/books/${id}`);
            await axios.delete(`https://book-store-back-end-khaki.vercel.app/api/books/${id}`);
            navigate('/');
        }
    };

    if (error) {
        return <p className="text-red-600 text-center mt-10">{error}</p>;
    }

    if (!book) {
        return <p className="text-center mt-10">Loading book details...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-300 p-6" data-cy="book-details">
            <div className="max-w-xl mx-auto rounded-xl overflow-hidden shadow-md hover:shadow-xl transform transition duration-300">
                {/* Title Section */}
                <div className="bg-gray-800 text-white p-6">
                    <h1 className="text-2xl font-bold">{book.title}</h1>
                </div>

                {/* Details Section */}
                <div className="bg-gray-100 p-6 space-y-3 text-gray-800">
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Quantity:</strong> {book.quantity}</p>
                    <p><strong>Copies Sold:</strong> {book.copiesSold}</p>

                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={() => navigate(`/edit/${book._id}`)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="text-blue-600 underline"
                        >
                            ← Back to List
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

