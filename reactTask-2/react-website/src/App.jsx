import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavBar from "./components/NavBar.jsx";
import Hero from "./components/Hero.jsx";
import Destination from "./components/Destination.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/footer.jsx";


function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path={'/'} element={<Hero />} />
                <Route path={'/destination'} element={<Destination />} />
                <Route path={'/contact'} element={<Contact />} />
            </Routes>
            <Footer />
</Router>

    );
}

export default App;
// <div className="App">
//     <NavBar />
//     <Routes>
//         <Route path="/" element={<Hero />} />
//         <Route path="/destination" element={<Destination />} />
//         <Route path="/contact" element={<Contact />} />
//     </Routes>
//     <Footer />
// </div>
