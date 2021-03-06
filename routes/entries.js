const { OAuth2Client } = require("google-auth-library");
const Entry = require("../models/Entry");
const express = require("express");
const router = express.Router();
require("dotenv/config");

const authClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// maybe use controllers like so:
// const controllers = require('./../controllers/controllers');
// router.get('/say-something', controllers.saySomething);

async function verifyGoogleAccount(token) {
    try {
        const ticket = await authClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload["sub"];

        return {
            userId: userid,
            error: null,
        };
    } catch (error) {
        console.log("Error verifying google account: " + error);
        return {
            userId: -1,
            error: error,
        };
    }
}

router.get("/all", async (req, res) => {
    try {
        const { userId, error } = await verifyGoogleAccount(
            req.headers.authorization
        );
        if (userId === -1) {
            res.status(401).send(error);
            return;
        }
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
    try {
        const { userId, error } = await verifyGoogleAccount(
            req.headers.authorization
        );
        if (userId === -1) {
            res.status(401).send(error);
            return;
        }
        const entry = new Entry({
            userId: userId,
            timestamp: req.body.timestamp,
            amount: req.body.amount,
            description: req.body.description,
            category: req.body.category,
            subCategory: req.body.subCategory,
            isExpense: req.body.isExpense,
        });

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

router.patch("/:entryId/update", async (req, res) => {
    try {
        const { userId, error } = await verifyGoogleAccount(
            req.headers.authorization
        );
        if (userId === -1) {
            res.status(401).send(error);
            return;
        }
        const _id = req.params.entryId;
        const updatedEntry = await Entry.findByIdAndUpdate(_id, req.body, {
            new: true,
        });
        res.status(200).send(updatedEntry);
    } catch (error) {
        console.log("Error updating entry: " + error);
        res.status(400).send(error);
    }
});

module.exports = router;
