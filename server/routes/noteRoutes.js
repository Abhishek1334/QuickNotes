import express from "express";
import { createNote, getAllNotes, getNotebyId, updateNote, deleteNote, searchNotes} from "../controllers/noteController.js";

const router = express.Router();


// POST /api/notes = Create a note
router.post("/", createNote);

// GET /api/notes = Get all notes
router.get("/", getAllNotes);

// GET /api/notes/id = Get note by Id
router.get("/:id", getNotebyId)

// PUT /api/notes/id = Updating a note
router.put("/:id", updateNote)

// DELETE /api/notes/id = Deleting a note
router.delete("/:id", deleteNote)

// POST /api/notes =  Search for Note with title and content
router.post("/search",searchNotes)

export default router;