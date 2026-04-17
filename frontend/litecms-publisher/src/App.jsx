import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'

import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Login } from './pages/Login';

import { Articles } from './pages/articles/Articles'
import { CreateArticle } from './pages/articles/CreateArticle';
import { EditArticle } from './pages/articles/EditArticle'

import { PhotoGalleries } from './pages/galleries/PhotoGalleries'
import { CreatePhotoGallery } from './pages/galleries/CreatePhotoGallery';
import { EditPhotoGallery } from './pages/galleries/EditPhotoGallery';

import { Videos } from './pages/videos/Videos'
import { CreateVideo } from './pages/videos/CreateVideo';
import { EditVideo } from './pages/videos/EditVideo'

import { Categories } from './pages/categories/Categories'
import { CreateCategory } from './pages/categories/CreateCategory'

import { MainLayout } from './components/layout/MainLayout';
import { Toaster } from 'react-hot-toast'
import { ProtectedRoute } from './components/routes/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center"/>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/articles' element={<Articles />} />
                <Route path='/articles/create' element={<CreateArticle />} />
                <Route path='/articles/edit/:id' element={<EditArticle />} />
                <Route path='/galleries' element={<PhotoGalleries />} />
                <Route path='/galleries/create' element={<CreatePhotoGallery />} />
                <Route path='/galleries/edit/:id' element={<EditPhotoGallery />} />
                <Route path='/videos' element={<Videos />} />
                <Route path='/videos/create' element={<CreateVideo />} />
                <Route path='/videos/edit/:id' element={<EditVideo />} />
                <Route path='/categories' element={<Categories />} />
                <Route path='/categories/create' element={<CreateCategory />} />
              </Route>
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
    </BrowserRouter>
  )
}

export default App
