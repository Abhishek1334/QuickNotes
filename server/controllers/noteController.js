import Note from "../models/Note.js";

export const createNote = async(req,res) => {
    try{
        const { title, content } = req.body;

        if (!title || !content ){
            res.status(400);
            throw new Error("Note title and content are required.");
        }

        const newNote = new Note({ title, content })
        await newNote.save();

        res.status(201).json({
            message:"Note created successfully",
            note: newNote,
        });
        
    } catch(error){
        console.error("Error Creating Note :", error.message);
        res.status(500);
        throw new Error("Failed to create note.");
    }
};

export const getAllNotes = async(req,res) => {
    try{
        // Fetching all the notes from db
        const notes = await Note.find();

        res.status(200).json({
            message: "Fetched all notes successfully",
            total: notes.length,
            notes,
        });
    } catch(error){
        console.error("Error while fetching all notes:", error.message);
        res.status(500);
        throw new Error("Failed to fetch notes.");
    }
};


export const getNotebyId = async(req,res) => {
    try{
        // extracting id from req parameter 
        const id = req.params.id;
        
        // Fetching note by id
        const note = await Note.findById(id);

        if ( !note ){
            res.status(404);
            throw new Error(`Note with ID "${id}" not found.`);
        }

        res.status(200).json({
            message: `Note with ID "${id}" found successfully.`,
            note,
        });
    } catch(error){
            console.error(
				`Error fetching note with ID "${req.params.id}":`,
				error.message
			);
			res.status(500);
            throw new Error(`Failed to fetch note with ID "${req.params.id}".`);
    }
}


export const updateNote = async(req,res) => {
    try{
        const id = req.params.id;
        const { title, content } = req.body;

        if (!id || !title || !content ){
            res.status(400);
            throw new Error("Note ID, title and content are required.");
        }

        const note = await Note.findById(id);

        if( !note ){
            res.status(404);
            throw new Error(`Note with ID "${id}" not found.`);
        }

        // Updating the title and content 
        note.title = title;
        note.content = content;

        await note.save();

        res.status(200).json({
            message: `Note with ID ${id} updated successfully.`,
            note,
        });
    } catch(error){
        console.log(`Error updating Note with ID ${id}: `,error.message);
        res.status(500);
        throw new Error(`Failed to update Note with ID ${id}.`);
    };
};


export const deleteNote = async(req,res) => {
    try{
        const id = req.params.id;

        if( !id ){
            res.status(400);
            throw new Error("Note ID is required.");
        }

        const note = await Note.findById(id);

        if( !note ){
            res.status(404);
            throw new Error(`Note with ID "${id}" not found.`);
        }

        await Note.findByIdAndDelete(id);

        res.status(200).json({
            message: "Note deleted successfully.",
        })
    } catch(error){
        console.error(`Error Deleting Note with ID ${id}: `, error.message);
        res.status(400);
        throw new Error(`Failed to delete Note with ID ${id}.`);
    }
}

export const searchNotes = async(req,res) => {
    try{
		const { title, content } = req.body;


        const query = {};
        if(title) query.title = title;
        if(content) query.content = content;

        if (Object.keys(query).length === 0){
            res.status(400);
            throw new Error("Title or content is required.");
        };

        const notes = await Note.find(query);

        if( notes.length === 0 ){
            res.status(404);
            throw new Error("No notes found.");
        };
		
        res.status(200).json({
            message: "Search completed successfully",
            results: notes.length,
            notes,
        })
        

	} catch(error){
        console.error("Error search note : ", error.message);
        res.status(400);
        throw new Error("Failed to search note.");
    }
}