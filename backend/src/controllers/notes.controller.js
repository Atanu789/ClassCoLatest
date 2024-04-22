import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Notes } from "../models/notes.model.js";

const createNotes = asyncHandler(async(req,res)=>{
   const {title , content} = req.body;
    if (
    [title,content].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const notes = await Notes.create({
    title,
    content
})
const createdNote = await Notes.findById(notes._id)

  if (!createdNote) {
    throw new ApiError(500, "Something went wrong while registering the note");
  }
    return res
    .status(201)
    .json(new ApiResponse(200, createdNote, "Notes created Successfully"));

})
const deleteNotes = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const deletedNote = await Notes.findByIdAndDelete(id);
  if (!deletedNote) {
    throw new ApiError(404, "Note not found");
  }
  
  return res
    .status(200)
    .json(new ApiResponse(200, deletedNote, "Note deleted successfully"));
});

const editNotes = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  
  if ([title, content].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  
  const updatedNote = await Notes.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );
  if (!updatedNote) {
    throw new ApiError(404, "Note not found");
  }
  
  return res
    .status(200)
    .json(new ApiResponse(200, updatedNote, "Note updated successfully"));
});


export {
    createNotes,
    deleteNotes,
    editNotes
}
