const express = require('express');
const fileUpload = require('express-fileupload');
const ILovePDFApi = require('@ilovepdf/ilovepdf-nodejs');

const app = express();
app.use(fileUpload());

const ilovepdf = new ILovePDFApi('PUT_PUBLIC_KEY', 'PUT_SECRET_KEY');

app.post('/merge', async (req, res) => {
  const task = ilovepdf.newTask('merge');
  await task.start();

  const file1 = req.files.file1;
  const file2 = req.files.file2;

  await task.addFile(file1.data);
  await task.addFile(file2.data);

  await task.process();

  const result = await task.download();

  res.setHeader('Content-Disposition', 'attachment; filename=merged.pdf');
  res.send(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running'));
