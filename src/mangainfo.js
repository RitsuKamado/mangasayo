import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './otaku-theme.css'; // Import otaku-theme.css

const Chapter = ({ mangaId }) => {
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const apiUrl = `https://api.consumet.org/manga/mangadex/info/${mangaId}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Assuming the response has a 'chapters' property
        const fetchedChapters = data.chapters || [];

        setChapters(fetchedChapters);
        console.log(fetchedChapters);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchChapters();
  }, [mangaId]);

  const handleChapterSelect = (event) => {
    const selectedId = event.target.value;
    setSelectedChapter(selectedId);

    // Call a separate function to handle navigation
    navigateToMangapage(mangaId, selectedId);
  };

  // Function to handle navigation to Mangapage
  const navigateToMangapage = (mangaId, selectedChapter) => {
    // Navigate directly to the Mangapage route with the selected mangaId and selectedChapter
    navigate(`/mangapage/${mangaId}/${selectedChapter}`);
  };

  return (
    <div className="otaku-chapter-container">
      <select className="otaku-select" value={selectedChapter} onChange={handleChapterSelect}>
        <option className="otaku-option" value="">Select a Chapter</option>
        {chapters.map((chapter, index) => (
          <option key={index} value={chapter.id} className="otaku-option">
            {"Chapter " + chapter.chapterNumber + "-" + chapter.title}
          </option>
        ))}
      </select>

      {selectedChapter && <p className="otaku-selected-chapter">Selected Chapter: {selectedChapter}</p>}
    </div>
  );
};

export default Chapter;