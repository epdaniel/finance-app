const Entry = require("../models/Entry");
const express = require("express");
const router = express.Router();

// maybe use controllers like so:
// const controllers = require('./../controllers/controllers');
// router.get('/say-something', controllers.saySomething);

router.get("/all", async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.headers.id });
    res.status(200).send(entries);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/add", async (req, res) => {
  console.log("got an add request!!!");
  console.log(req.body);
  const entry = new Entry({
    userId: req.body.userId,
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
