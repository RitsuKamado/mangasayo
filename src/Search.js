import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useNavigate } from 'react-router-dom';

// Otaku-themed Search component
const Search = ({ onImageClick }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const loadOptions = (inputValue, callback) => {
    const apiUrl = `https://api.consumet.org/manga/mangadex/${inputValue}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const options = data.results.map(manga => ({
          value: manga.id,
          label: manga.title,
        }));
        callback(options);
      })
      .catch(error => console.error('Error:', error));
  };

  const handleImageClick = selectedOption => {
    const mangaId = selectedOption.value;

    // Call the onImageClick function to handle the click event
    onImageClick(mangaId);

    // Navigate to the Episode.js route with the mangaId in the URL
    navigate(`/chapters/${mangaId}`);
  };

  return (
    <div className='otaku-dark-mode'>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
      }}
    >
      <h1
        style={{
          fontFamily: 'OtakuFont', // Specify the Otaku-themed font
          color: '#2ecc71', // Otaku-themed title color
          marginBottom: '20px',
        }}
      >
        Search Manga/Manhwa
      </h1>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        onChange={handleImageClick}
        placeholder="Enter a manga title"
        styles={{
          // Customize the React Select styles as needed
          control: provided => ({
            ...provided,
            width: '300px', // Adjust the width
            borderRadius: '10px',  // Add border-radius
          }),
          placeholder: provided => ({
            ...provided,
            color: '#2da35e', // Placeholder color
          }),
        }}
      />
    </div>
    </div>
  );
};

export default Search;