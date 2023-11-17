import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Search from './Search';
import Chapter from './mangainfo';
import Mangapage from './mangapage';

const App = () => {
  const [mangaId, setMangaId] = useState("");
  const [selectedChapter, setSelectedChapter] = useState(null);

  const handleImageClick = (newMangaId, newSelectedChapter) => {
    setMangaId(newMangaId);
    setSelectedChapter(newSelectedChapter);
    // Redirect to the specified route
    // Example: '/episodes/f4659225-6ac3-4d86-88e1-6bff7239b52a'
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Search onImageClick={handleImageClick} selectedChapter={selectedChapter} />} />
          <Route path="/chapters/:mangaId" element={<Chapter mangaId={mangaId} />} />
          <Route path="/mangapage/:mangaId/:selectedChapter" element={<Mangapage selectedChapter={selectedChapter} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;