import "./App.css";
import Admin from "./components/Pages/admin/Admin/Admin";
import FormLoginAdmin from "./components/FormLogin/FormLoginAdmin/FormLoginAdmin";
import FormLogin from "./components/FormLogin/FormLogin";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/login" element={<FormLogin />} />
      </Routes>
    </div>
  );
}

export default App;
