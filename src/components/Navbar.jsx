import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between">
            <Link to="/" className="font-sans text-xl">📚 BookStore</Link>
        </nav>
    );
}
