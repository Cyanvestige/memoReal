import mongoose from "mongoose";

const contentSchema = mongoose.Schema({
    title: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    creator: String,
    name: String,
    content: String,
    tag: String,
    choice_1: String,
    choice_2: String,
    choice_3: String,
    choice_4: String,
    answer: String,
    hasChoices: Boolean,
});

export default mongoose.model("studyContents", contentSchema);
