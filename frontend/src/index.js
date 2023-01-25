import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Admin from "./components/Admin/Admin";
import Teacher from "./components/Teacher/Teacher";
import Student from "./components/Student/Student";

import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes,Route } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="*" element={<App />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/teacher/*" element={<Teacher />} />
          <Route path="/student/*" element={<Student />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
