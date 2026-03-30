const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
app.use(fileUpload());

app.post('/merge', async (req, res) => {
  if (!req.files) {
    return res.send('No files uploaded');
  }

  // مؤقت فقط للتجربة
  res.send('API works ✅ (Next step: connect real PDF merge)');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
