import { useState } from "react"

import AddNote from "../SinglePatientPage/components/AddNote"

function AddInitialPatientNote({ noteList, setNoteList, patientId }) {
    //  --------------- State Variables ---------------
    // Note List Should be Threaded from index

    const handleNoteListAdd = (e) => {
        e.preventDefault()
        setNoteList([...noteList, {}])
    }

    const handleNoteListRemove = (index, e) => {
        const list = [...noteList]
        list.splice(index, 1)
        setNoteList(list)
    }

    const handleNoteListChange = (e, index) => {
        const { value, name } = e.target;
        const list = [...noteList];
        list[index][name] = value;
        setNoteList(list);
    };


    return (
        <>

            {/* // Clicking the add button would then starting creating input fields  */}
            {/* // *** Based off of however many times they click ***  */}
            {noteList.length >= 1 &&
                <h4>Add Notes</h4>
            }
            {noteList.map((note, index) =>
                <AddNote
                    patientId={patientId}
                    noteList={true}
                    handleNoteListRemove={handleNoteListRemove}
                    handleNoteListChange={handleNoteListChange}
                    index={index}
                    intialNote={note}
                />

            )}
            <hr/>
            {/* Limiting it to two times but coule be changed */}
            {noteList.length <= 1 &&
                <button
                    className="form-button"
                    onClick={handleNoteListAdd}>
                    Add Note
                </button>

            }

        </>
    )
}

export default AddInitialPatientNote
