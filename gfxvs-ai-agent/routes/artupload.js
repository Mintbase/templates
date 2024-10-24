const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post("/", async (req, res) => {
    try {

        const { colouredArt, arttitle, artistId } = req.body;

        if (!colouredArt || !arttitle || !artistId) {
            return res.status(400).json({ error: 'Missing required fields: colouredArt, arttitle, and artistId are required.' });
        }

        const response = await axios.post('https://gfxvs.com/api/artupload', {
            colouredArt: colouredArt,
            arttitle: arttitle,
            artistId: artistId
        });

        return res.status(200).json({ response: response.data });
    } catch (error) {
        console.error("Error >> ", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router