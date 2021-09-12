import React from "react";

const AddTask = ({handleAdd, isCompletedListActive}) => {
    return (
        <div className={`cta__add-task ${isCompletedListActive ? 'bottom-50' : ''}`} onClick={handleAdd}>
            + Drag and drop /<br /> Add task
        </div>
    )
}

export default AddTask;
