const path = require('path');
const fs = require('fs');

exports.getAudioFiles = (req, res) => {
  const audioFolder = path.join(__dirname, '..', 'musicas');

  try {
    const files = fs.readdirSync(audioFolder);
    const mp3Files = files.filter(file => file.endsWith('.mp3'));

    res.json(mp3Files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to read audio files' });
  }
};



