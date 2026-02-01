import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import { Home } from './pages/Home'
import { Articles } from './pages/Articles'
import { PhotoGalleries } from './pages/PhotoGalleries'
import { Videos } from './pages/Videos'
import { Categories } from './pages/Categories'
import { NotFound } from './pages/NotFound'
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { useState } from 'react';


function App() {

  const [isMenuExpanded , setIsMenuExpanded] = useState(true);

  return (
    <BrowserRouter>
      <div id='body-div' className={isMenuExpanded ? "nav-md" : "nav-sm"} >
        <div className='container body'>
          <Sidebar
            isMenuExpanded={isMenuExpanded} />
          <Header
            setIsMenuExpanded={setIsMenuExpanded} />
          
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/articles' element={<Articles />} />
            <Route path='/photo-galleries' element={<PhotoGalleries />} />
            <Route path='/videos' element={<Videos />} />
            <Route path='/categories' element={<Categories />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
