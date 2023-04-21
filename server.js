const fs = require('fs');
const path = require('path');
const express = require('express');
const ID3 = require('node-id3'); // biblioteca id3 para ler os metadados

const app = express();

app.get('/api/mp3', (req, res) => {
  const directoryPath = path.join(__dirname, 'Musicas');
  const mp3Files = [];

  // ler todos os arquivos
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    // filtra os arquivos mp3
    files.filter(file => {
      return path.extname(file).toLowerCase() === '.mp3';
    }).forEach(mp3 => {
      const tags = ID3.read(path.join(directoryPath, mp3));
      mp3Files.push({
        file: mp3,
        image: tags.image ? tags.image.imageBuffer.toString() : null
      });
    });

    res.json(mp3Files);
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});


