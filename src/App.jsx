import React from "react";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
      <Home />
    </>
  );
}

export default App;
