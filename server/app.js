// import express, { json } from "express";
// import { corsMiddleware } from './middlewares/cors.js'
// import { google } from "googleapis";
// import pkg from 'multer'

const express = require('express');
const json = require('express');
const corsMiddleware = require('./middlewares/cors.js').corsMiddleware
const {google} = require('googleapis');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


const app = express();
app.use(json());
app.use(corsMiddleware())
app.disable("x-powered-by");


const upload = multer({ dest: 'uploads/' });

const youtube = google.youtube('v3');

app.post('/upload-video', upload.single('video'), async (req, res) => {
  const access_token = req.body.access_token
  const file = req.file

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  if (!access_token) {
    return res.status(400).json({ message: 'Access token is required' });
  }
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token })

  console.log('File:', req.file);
  console.log('Access Token:', access_token);

  const metadata = {
    snippet: {
      title: 'testing title',
      description: 'testing description',
      categoryId: '28',
      tags: ['test', 'test2']
    },
    status: {
      privacyStatus: 'private'
    }
  };

  try {
    const response = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: metadata,
      media: {
        body: fs.createReadStream(path.join(__dirname, 'uploads', req.file.filename))
      },
      auth: oauth2Client
    });

    fs.unlinkSync(req.file.path)

    res.status(200).json({ message: 'Upload successful', data: response.data });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(400).json({ message: 'Upload failed', error: error.message });
  }
})

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
