import express from "express";
import mongoose from "mongoose";
import StudyContent from "../models/studyContents.js";
//implementations of CRUD

//getContents is achieved by calling "find()" method. if everything works well response.json() with status "200" if not response.json(error) with status "404"
export const getContents = async (req, res) => {
    try {
        const studyContents = await StudyContent.find();
        res.status(200).json(studyContents);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// createContent is achieved by adding the body of request from the client with two more attributes "creator" and "create data"
// then call "save()" method. if success status "201", if not "409"
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

// updateContent is achieved by getting the id from the parameter of the route and the body of request from the client
// then call findByIdAndUpdate() if the id exists. if not status "404"
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

// deleteContent is achieved by getting the id from the parameter of the route and calling findByIdAndRemove() if the id exists if not status "404"
export const deleteContent = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No content with that id");
    await StudyContent.findByIdAndRemove(_id);
    res.json({ message: "Content deleted successfully" });
};
