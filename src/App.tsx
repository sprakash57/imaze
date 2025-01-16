import { Routes, Route } from 'react-router';
import Home from '@/routes/Home';
import PhotoDetail from '@/routes/PhotoDetail';
import NotFound from '@/routes/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/imaze/:id" element={<PhotoDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
