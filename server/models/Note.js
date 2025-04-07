import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required."],
			minlength: [3, "Title must be at least 3 characters long."],
			trim: true,
		},
		content: {
			type: String,
			required: [true, "Content is required."],
			minlength: [6, "Content must be at least 3 characters long."],
        trim: true,
		},
	},
	{
		timestamps: true,
	}
);

const Note = mongoose.model("Note",noteSchema)

export default Note;
