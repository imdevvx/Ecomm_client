import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthContext.jsx'
import CartProvider from './context/CartContext.jsx'
import AddressProvider from './context/AddressContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ToastProvider>
      <AuthProvider>
        <AddressProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AddressProvider>
      </AuthProvider>
    </ToastProvider>
  </BrowserRouter>
)

/*
┌────────────────────────────────────────┐
│ Provider A (Independent / Global)      │
│   └────────────────────────────────────┤
│   │ Provider B (Depends on A)          │
│   │   └────────────────────────────────┤
│   │   │ Provider C (Depends on A & B)  │
│   │   │   └───────────────┐            │
│   │   │   │ Your App Component         │

AuthProvider cannot see or use anything inside AddressContext or CartContext
Similarly, AddressProvider cannot see anything inside CartContext, But can see and use from AuthProvider 
CartProvider is at the bottom. It can see both Auth and Address
App is at the absolute bottom. It can see everything

Context data only flows downward. A provider can never look "up" or "sideways" to grab data from its children or siblings
*/