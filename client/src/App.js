import { Landing, Register, Error, Dashboard } from "./pages/Pages";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* Temporary nav bar */}
      <nav>
        <Link to="/">{<h3> Dashboard </h3>}</Link>
        <Link to="/register">{<h3> Register </h3>}</Link>
        <Link to="/landing">{<h3> Landing </h3>}</Link>
        <Link to="*">{<h3> Error </h3>}</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/landing" element={<Landing/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;