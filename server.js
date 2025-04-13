const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

const secretKey = 'mySecretKey123'; // Ubah kalau nak lebih selamat

// Route untuk generate token
app.get('/generate-token', (req, res) => {
    const token = jwt.sign({ username: 'admin' }, secretKey, { expiresIn: '1h' });
    res.json({ token });
});

// Route untuk secure link
app.get('/secure-link', (req, res) => {
    const token = req.query.token;

    if (!token) {
        return res.status(400).json({ error: 'Token diperlukan!' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token tidak sah atau tamat tempoh!' });
        }

        res.redirect('https://shorten.so/Movie1');
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
