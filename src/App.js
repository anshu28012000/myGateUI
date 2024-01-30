import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import TenantPage from "./Tenant";
import Header from "./Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/tenant" element={<TenantPage />} />{" "}
        <Route path="/" element={<HomePage />} />{" "}
      </Routes>{" "}
    </BrowserRouter>
  );
}

export default App;
