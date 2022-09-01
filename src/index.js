import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import  "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/dataview/dataview.min.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'font-awesome/css/font-awesome.min.css';
import 'antd/dist/antd.less'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
