const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/DevopsCSE")
    .then(() => {
        console.log("connection success");
    })
    .catch((err) => {
        console.log("connection failed", err);
    });

// Schema
const cseSchema = new mongoose.Schema({
    name: String,
    branch: String,
    marks: Number
}, {
    versionKey: false
});

// Model
const modalcse = mongoose.model("csemark", cseSchema, "devopsMarks");

// POST API
app.post("/data", async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            branch: req.body.branch,
            marks: req.body.marks
        };

        const m = new modalcse(data);
        await m.save();
        res.status(201).send("Successfully inserted");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET all data
app.get("/data", async (req, res) => {
    try {
        const data = await modalcse.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET by ID
app.get("/data/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const data = await modalcse.findById(id);

        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Server
app.listen(3030, () => {
    console.log("server running successfully");
});
