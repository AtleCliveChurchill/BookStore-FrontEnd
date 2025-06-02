import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
    const [books, setBooks] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const fetchBooks = async () => {
        const res = await axios.get('http://localhost:5000/api/books', {
            params: { search, page }
        });
        setBooks(res.data.books);
        setTotal(res.data.total);
    };

    useEffect(() => {
        fetchBooks();
    }, [page, search]);

    return (
        <div className='bg-gray-200'>
            <div className="p-6 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    {/* Search input */}
                    <div className="relative w-full md:w-2/3">
                        <input
                            type="text"
                            placeholder="🔍 Search by title or author..."
                            className="w-full pl-6 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>

                    {/* Add Book button */}
                    <Link
                        to="/add"
                        className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
                    >
                        + Add Book
                    </Link>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {books.map(book => (
                        <div
                            key={book._id}
                            data-cy="book-card"
                            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.02] transition duration-300"
                        >
                            {/* Title section */}
                            <div className="bg-gray-600 text-white p-4">
                                <h3 className="text-lg font-semibold">{book.title}</h3>
                            </div>

                            {/* Detail section */}
                            <div className="bg-gray-300 p-4 space-y-2">
                                <p className="text-gray-800"><strong>Author:</strong> {book.author}</p>
                                <p className="text-gray-800"><strong>Quantity:</strong> {book.quantity}</p>
                                <p className="text-gray-800"><strong>Copies Sold:</strong> {book.copiesSold}</p>
                                <Link
                                    to={`/book/${book._id}`}
                                    className="text-blue-600 hover:underline block mt-2"
                                >
                                    View Details →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Pagination */}
                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="px-4 py-2">Page {page}</span>
                    <button
                        onClick={() => {
                            const maxPages = Math.ceil(total / 10);
                            if (page < maxPages) setPage(page + 1);
                        }}
                        disabled={page >= Math.ceil(total / 10)}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
