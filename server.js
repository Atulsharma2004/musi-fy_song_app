// backend/src/app.js
const express = require('express');
const cors = require('cors');
const deezerRoutes = require('./routes/deezer');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/deezer', deezerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
