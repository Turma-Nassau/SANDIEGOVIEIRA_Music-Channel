import React, { useState, useEffect } from 'react';
import { getAudioFiles } from './api/audioAPI';

function App() {
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const data = await getAudioFiles();
        setAudios(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAudios();
  }, []);

  return (
    <div>
      <h1>List of Audio Files</h1>
      {audios.length > 0 ? (
        <ul>
          {audios.map((audio, index) => (
            <li key={index}>{audio}</li>
          ))}
        </ul>
      ) : (
        <p>No audio files available.</p>
      )}
    </div>
  );
}

export default App;


