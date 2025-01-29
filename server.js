const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const faceapi = require('@vladmandic/face-api');
const canvas = require('canvas');

const app = express();
const PORT = 8080;

// Middleware
// Route untuk akses halaman scan.html
app.get('/scan', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'scan.html'));
});

app.use(express.static('public'));
app.use(bodyParser.json({ limit: '10mb' }));

// Fungsi untuk memuat model dari disk
async function loadFaceApiModels() {
    const { Canvas, Image, ImageData } = canvas;
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
    
    await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models');
    await faceapi.nets.faceLandmark68Net.loadFromDisk('./models');
    await faceapi.nets.faceRecognitionNet.loadFromDisk('./models');
    await faceapi.nets.ageGenderNet.loadFromDisk('./models');
    await faceapi.nets.faceExpressionNet.loadFromDisk('./models');
}

// Endpoint: Daftar
app.post('/daftar', (req, res) => {
    const { username, image } = req.body;

    if (!username || !image) {
        return res.status(400).send('Username dan foto wajib diisi!');
    }

    const base64Data = image.replace(/^data:image\/png;base64,/, '');
    const filePath = path.join(__dirname, 'uploads', `${username}.png`);

    fs.writeFileSync(filePath, base64Data, 'base64');
    res.send('Pendaftaran berhasil!');
});

// Endpoint: Login
app.post('/login', async (req, res) => {
    const { image } = req.body;

    if (!image) {
        return res.status(400).send('Foto wajib diisi!');
    }

    const base64Data = image.replace(/^data:image\/png;base64,/, '');
    const tempFilePath = path.join(__dirname, 'uploads', `temp.png`);
    fs.writeFileSync(tempFilePath, base64Data, 'base64');

    const registeredUsers = fs.readdirSync(path.join(__dirname, 'uploads')).filter(file => file !== 'temp.png');
    let matchFound = false;
    let detectedInfo = {};

    await loadFaceApiModels(); // Memuat model

    for (const userFile of registeredUsers) {
        const registeredImagePath = path.join(__dirname, 'uploads', userFile);

        const referenceImage = await canvas.loadImage(registeredImagePath);
        const queryImage = await canvas.loadImage(tempFilePath);

        const refDescriptors = await faceapi.detectSingleFace(referenceImage).withFaceLandmarks().withFaceDescriptor().withAgeAndGender().withExpressions();
        const queryDescriptors = await faceapi.detectSingleFace(queryImage).withFaceLandmarks().withFaceDescriptor().withAgeAndGender().withExpressions();

        if (refDescriptors && queryDescriptors) {
            const distance = faceapi.euclideanDistance(refDescriptors.descriptor, queryDescriptors.descriptor);
            if (distance < 0.6) {
                matchFound = true;
                detectedInfo = {
                    age: queryDescriptors.age,
                    gender: queryDescriptors.gender,
                    expression: queryDescriptors.expressions.asSortedArray()[0].expression // Ekspresi wajah
                };
                break;
            }
        }
    }

    fs.unlinkSync(tempFilePath);

    if (matchFound) {
        res.json({
            message: 'Login berhasil!',
            detectedInfo: detectedInfo
        });
    } else {
        res.status(401).send('Wajah tidak cocok atau belum terdaftar.');
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
