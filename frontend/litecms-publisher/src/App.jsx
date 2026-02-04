import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'

import { Home } from './pages/Home'
import { Articles } from './pages/Articles'
import { PhotoGalleries } from './pages/PhotoGalleries'
import { Videos } from './pages/Videos'
import { Categories } from './pages/Categories'
import { CreateCategory } from './pages/CreateCategory'
import { NotFound } from './pages/NotFound'
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';

import { MainLayout } from './components/layout/MainLayout';
import { Toaster } from 'react-hot-toast'
import { CreateArticle } from './pages/CreateArticle';


function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center"/>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/articles' element={<Articles />} />
              <Route path='/photo-galleries' element={<PhotoGalleries />} />
              <Route path='/videos' element={<Videos />} />
              <Route path='/categories' element={<Categories />} />
              <Route path='/categories/create' element={<CreateCategory />} />
              <Route path='/articles/create' element={<CreateArticle />} />
              <Route path='/articles/edit/:id' element={<CreateArticle />} />
              <Route path='/Profile' element={<Profile />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
    </BrowserRouter>
  )
}

export default App
