import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { router } from './navigation/RouterConfig'
import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
