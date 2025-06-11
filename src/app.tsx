import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/navbar'
import Auth from './pages/auth'
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import HtmlPage from './components/pages/HtmlPage'
import CssPage from './components/pages/CssPage'
import JavascriptPage from './components/pages/JavascriptPage'
import Programs from './pages/programs' 
import { Toaster } from 'sonner'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/courses/html' element={<HtmlPage />} />
        <Route path='/courses/css' element={<CssPage />} />
        <Route path='/courses/javascript' element={<JavascriptPage />} />
        <Route path='/programs' element={<Programs />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
