import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Details from './pages/Details';
import AddEdit from './pages/AddEdit';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book/:id" element={<Details />} />
                <Route path="/add" element={<AddEdit />} />
                <Route path="/edit/:id" element={<AddEdit />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
