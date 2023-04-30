import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Form from "./pages/form";
import Edit from "./pages/editForm";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/process" element={<Form />} />
        <Route path="process/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}
