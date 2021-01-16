const Entry = require('../models/Entry');
const express = require('express');
const router = express.Router();

// maybe use controllers like so:
// const controllers = require('./../controllers/controllers');

// router.get('/say-something', controllers.saySomething);

router.get('/all', async (req, res) => {
    try {
        const entries = await Entry.find({ userId: req.headers.id });
        res.json(entries);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/add', async (req, res) => {
    const entry = new Entry({
        userId: req.body.userId,
        timestamp: req.body.timestamp,
        amount: req.body.amount,
        description: req.body.description,
        category: req.body.category,
        subCategory: req.body.subCategory
    });

    try {
        const newEntry = await entry.save();
        res.json(newEntry);
    } catch (err) {
        res.json({ message: err });
    }
});

router.delete('/:entryId/delete', async (req, res) => {
    try {
        const removedEntry = await Entry.deleteOne({ _id: req.params.entryId });
        res.json(removedEntry);
    } catch (err) {
        res.json({ message: err });
    }
});

router.patch('/:entryId/update ', async (req, res) => {
    const newEntry = new Entry({
        userId: req.body.userId,
        timestamp: req.body.timestamp,
        amount: req.body.amount,
        description: req.body.description,
        category: req.body.category,
        subCategory: req.body.subCategory
    });

    try {
        const updatedEntry = await Entry.findOneAndUpdate({ _id: req.params.entryId }, newEntry, {
            returnOriginal: false
        });
        res.json(updatedEntry);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;