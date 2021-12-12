import express from "express";
import mongoose from "mongoose";
import StudyContent from "../models/studyContents.js";

export const getContents = async (req, res) => {
    try {
        const studyContents = await StudyContent.find();
        res.status(200).json(studyContents);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createContent = async (req, res) => {
    const content = req.body;
    const newContent = new StudyContent({
        ...content,
        creator: req.userId,
        createdAt: new Date().toISOString(),
    });
    try {
        await newContent.save();
        res.status(201).json(newContent);
    } catch (error) {
        res.status(409);
    }
};

export const updateContent = async (req, res) => {
    const { id: _id } = req.params;
    const content = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No content with that id");
    const updatedContent = await StudyContent.findByIdAndUpdate(_id, content, {
        new: true,
    });
    res.json(updatedContent);
};

export const deleteContent = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No content with that id");
    await StudyContent.findByIdAndRemove(_id);
    res.json({ message: "Content deleted successfully" });
};
