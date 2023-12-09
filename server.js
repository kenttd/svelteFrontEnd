const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the .svelte-kit/output directory
app.use(express.static(path.join(__dirname, '.svelte-kit/output')));

// Handle all other routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '.svelte-kit/output/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
