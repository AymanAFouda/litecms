import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Base from './components/layouts/Baseof';

import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { GalleriesPage } from './pages/GalleriesPage';
import { VideosPage } from './pages/VideosPage';
import { ContentDetailPage } from "./pages/ContentDetailPage"
import { CategoriesPage } from './pages/CategoriesPage'
import { CategoryPage } from './pages/CategoryPage'
import { TagPage } from './pages/TagPage';
import { NotFoundPage } from "./pages/NotFoundPage"
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Base />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/galleries" element={<GalleriesPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="content/:id" element={<ContentDetailPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="categories/:name" element={<CategoryPage />} />
          <Route path="tags/:name" element={<TagPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
