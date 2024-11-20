import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { RecepiesPage } from "./pages/RecepiesPage"
import { RecepieFormPage } from "./pages/RecepieFormPage"
import { Navigation } from "./components/Navigation"
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/recepies" />} />
          <Route path="/recepies" element={<RecepiesPage />} />
          <Route path="/recepie-create" element={<RecepieFormPage />} />
          <Route path="/recepies/:id" element={<RecepieFormPage />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  )
}

export default App