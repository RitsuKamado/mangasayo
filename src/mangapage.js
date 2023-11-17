import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './otaku-theme.css'; // Import otaku-theme.css

const Mangapage = () => {
  const { mangaId, selectedChapter } = useParams();
  const [results, setResults] = useState([]);
  const [chapterList, setChapterList] = useState([]);
  const [selectedChapterId, setSelectedChapterId] = useState(selectedChapter);
  const [apiUrl, setApiUrl] = useState('');
  const navigate = useNavigate();

  const fetchChapterList = async () => {
    try {
      const apiUrl = `https://api.consumet.org/manga/mangadex/info/${mangaId}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Assuming the response has a 'chapters' property
      const fetchedChapters = data.chapters || [];

      setChapterList(fetchedChapters);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchMangaPages = async (chapterId) => {
    try {
      const apiUrl = `https://api.consumet.org/manga/mangadex/read/${chapterId}`;
      setApiUrl(apiUrl);
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Assuming the API response is an array of manga pages
      setResults(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChapterSelect = (event) => {
    const selectedId = event.target.value;
    setSelectedChapterId(selectedId);
  };

  const navigateToSelectedChapter = () => {
    if (selectedChapterId) {
      navigate(`/mangapage/${mangaId}/${selectedChapterId}`);
    }
  };

  const handlePrevChapter = () => {
    const currentIndex = chapterList.findIndex((chapter) => chapter.id === selectedChapterId);
    const nextChapter = chapterList[currentIndex + 1];
    if (nextChapter) {
      setSelectedChapterId(nextChapter.id);
    }
  };

  const handleNextChapter = () => {
    const currentIndex = chapterList.findIndex((chapter) => chapter.id === selectedChapterId);
    const prevChapter = chapterList[currentIndex - 1];
    if (prevChapter) {
      setSelectedChapterId(prevChapter.id);
    }
  };

  useEffect(() => {
    fetchChapterList();
  }, [mangaId]);

  useEffect(() => {
    if (!selectedChapterId) {
      // Use the first chapter as default if none is selected
      setSelectedChapterId(chapterList.length > 0 ? chapterList[0].id : '');
    }
  }, [chapterList, selectedChapterId]);

  useEffect(() => {
    fetchMangaPages(selectedChapterId);
  }, [selectedChapterId]);

  useEffect(() => {
    if (selectedChapter) {
      setSelectedChapterId(selectedChapter);
      fetchMangaPages(selectedChapter);
    }
  }, [selectedChapter]);

  return (
    <div className="otaku-mangapage-container">
    <div>
      <button className="otaku-fetch-button" onClick={handlePrevChapter} style={{ marginRight: '10px' }}>
        Previous Chapter
      </button>
      <select
        id="chapterList"
        value={selectedChapterId}
        onChange={handleChapterSelect}
        className="otaku-fetch-button"
        style={{ margin: '0 10px' }}
      >
        {chapterList.map((chapter) => (
          <option key={chapter.id} value={chapter.id}>
            {"Chapter " + chapter.chapterNumber + "-" + chapter.title}
          </option>
        ))}
      </select>
      <button className="otaku-fetch-button" onClick={handleNextChapter} style={{ marginLeft: '10px' }}>
        Next Chapter
      </button>
    </div>
    <br />
    {Array.isArray(results) && results.length > 0 ? (
      <div className="otaku-manga-page">
        {results.map((page, index) => (
          <div key={index}>
            {/* Assuming each page has a 'title' and 'img' property */}
            <br />
            <img
              src={page.img}
              alt={page.page}
              className="otaku-manga-page-img"
            />
          </div>
          
        ))}
        
        <button className="otaku-fetch-button" onClick={handlePrevChapter} style={{ marginRight: '10px' }}>
        Previous Chapter
      </button>
      <select
        id="chapterList"
        value={selectedChapterId}
        onChange={handleChapterSelect}
        className="otaku-fetch-button"
      >
        {chapterList.map((chapter) => (
          <option key={chapter.id} value={chapter.id}>
            {"Chapter " + chapter.chapterNumber + "-" + chapter.title}
          </option>
        ))}
      </select>
      <button className="otaku-fetch-button" onClick={handleNextChapter} style={{ marginLeft: '10px' }}>
        Next Chapter
      </button>
      </div>
      
    ) : (
      <p>No pages found for the selected chapter.</p>
    )}
  </div>
  );
};

export default Mangapage;