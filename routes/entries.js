const Entry = require("../models/Entry");
const { OAuth2Client } = require("google-auth-library");
const express = require("express");
const router = express.Router();
require("dotenv/config");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// maybe use controllers like so:
// const controllers = require('./../controllers/controllers');
// router.get('/say-something', controllers.saySomething);

async function verifyGoogleAccount(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    return userid;
}

router.get("/all", async (req, res) => {
    try {
        let userId = await verifyGoogleAccount(req.headers.id_token);
        const entries = await Entry.find({ userId: userId }).sort({
            timestamp: -1,
        });
        res.status(200).send(entries);
    } catch (error) {
        console.log("Error getting all entries: " + error);
        res.status(400).send(error);
    }
});

router.post("/add", async (req, res) => {
    let userId = await verifyGoogleAccount(req.body.id_token);
    const entry = new Entry({
        userId: userId,
        timestamp: req.body.timestamp,
        amount: req.body.amount,
        description: req.body.description,
        category: req.body.category,
        subCategory: req.body.subCategory,
        isExpnse: req.body.isExpnse,
    });
    try {
        const newEntry = await entry.save();
        res.status(200).send(newEntry);
    } catch (error) {
        console.log("Error adding entry: " + error);
        res.status(400).send(error);
    }
});

router.delete("/:entryId/delete", async (req, res) => {
    try {
        const removedEntry = await Entry.deleteOne({ _id: req.params.entryId });
        res.json(removedEntry);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch("/:entryId/update ", async (req, res) => {
    const newEntry = new Entry({
        userId: req.body.userId,
        timestamp: req.body.timestamp,
        amount: req.body.amount,
        description: req.body.description,
        category: req.body.category,
        subCategory: req.body.subCategory,
    });

    try {
        const updatedEntry = await Entry.findOneAndUpdate(
            { _id: req.params.entryId },
            newEntry,
            {
                returnOriginal: false,
            }
        );
        res.json(updatedEntry);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
