const express = require('express');
const cors = require('cors');
const app = express();
const audioRoutes = require('./routes/audioRoutes');

app.use(cors());
app.use('/api', audioRoutes);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

