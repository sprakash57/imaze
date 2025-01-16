import { Routes, Route } from 'react-router';
import Home from '@/routes/Home';
import PhotoDetail from '@/routes/PhotoDetail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/imaze/:id" element={<PhotoDetail />} />
    </Routes>
  );
};

export default App;
