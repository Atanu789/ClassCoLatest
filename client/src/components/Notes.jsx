import { useState, useEffect } from "react";
import Header from "../StudentDashboard/Header";

function NoteSection() {
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  });
  const [newNote, setNewNote] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [updatedNote, setUpdatedNote] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim() !== "") {
      const newNoteItem = {
        id: Date.now(),
        content: newNote,
        isImportant: false,
      };
      setNotes([...notes, newNoteItem]);
      setNewNote("");
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const startEditing = (id) => {
    setEditingNoteId(id);
    const noteToEdit = notes.find((note) => note.id === id);
    setUpdatedNote(noteToEdit.content);
  };

  const updateNote = () => {
    const updatedNotes = notes.map((note) => {
      if (note.id === editingNoteId) {
        return { ...note, content: updatedNote };
      }
      return note;
    });
    setNotes(updatedNotes);
    setEditingNoteId(null);
    setUpdatedNote("");
  };

  const toggleImportance = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, isImportant: !note.isImportant };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <>
    <Header/>
    <div
      className="mx-auto mt-10 px-4 lg:px-0 "
      style={{ height: "600px", width: "1200px" }}
    >
      <h2 className="text-3xl font-bold mb-6 dark:text-white">Note Section</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div
            className="bg-green-900 p-6 rounded-lg"
            style={{
              backgroundColor: "#0B6E6E",
              boxShadow:
                "rgba(0, 0, 0, 0.4) 0px 2px 14px, rgba(0, 0, 0, 0.3) 0px 13px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
            }}
          >
            <h3 className="text-xl font-semibold mb-4">Add New Note</h3>
            <textarea
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              style={{
                height: "400px",
                width: "545px",
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
            />

            <button
              onClick={addNote}
              className="mt-4 bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
            >
              Add Note
            </button>
          </div>
        </div>
        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.4) 0px 2px 14px, rgba(0, 0, 0, 0.3) 0px 13px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
          }}
        >
          <div className="p-6 rounded-lg dark:bg-gray-700 dark:text-gray-200">
            <h3 className="text-xl font-semibold mb-4">Your Notes</h3>
            <ul>
              {notes.map((note) => (
                <li
                  key={note.id}
                  className={`mb-4 p-4 ${
                    note.isImportant
                      ? "border-2 border-yellow-500 rounded"
                      : "border border-gray-500 rounded"
                  }`}
                >
                  {editingNoteId === note.id ? (
                    <div>
                      <textarea
                        type="text"
                        value={updatedNote}
                        onChange={(e) => setUpdatedNote(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      />
                      <button
                        onClick={updateNote}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    <article className="flex items-center text-white">
                      <p className="break-all">{note.content}</p>
                      <div>
                        <button
                          onClick={() => startEditing(note.id)}
                          className="bg-orange-400 text-black px-3 py-1 rounded mr-5 mt-5 hover:bg-yellow-600 focus:outline-none"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded mr-5 mt-8 hover:bg-red-600 focus:outline-none"
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  )}
                  <button
                    onClick={() => toggleImportance(note.id)}
                    className={`bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 focus:outline-none ${
                      note.isImportant
                        ? "bg-yellow-700 font-bold border border-yellow-500"
                        : ""
                    }`}
                    style={{ minWidth: "30px" }}
                  >
                    {note.isImportant ? "⭐️" : "☆"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default NoteSection;