import React from "react";
import useBoardAndTaskManagerHook from "./useTaskManagerHook";

export const BoardContext = React.createContext({});

const BoardContextProvider = ({children}) => {
    const {
        boardData: allData,
        handleDrop,
        handleAddTaskToBoard,
        handleCreateBoard,
        handleTaskUpdate,
        handleDeleteTask
    } = useBoardAndTaskManagerHook();
    return (
        <BoardContext.Provider value={{
            boardData: allData,
            handleDrop,
            handleAddTaskToBoard,
            handleCreateBoard,
            handleTaskUpdate,
            handleDeleteTask
        }}>
            {children}
        </BoardContext.Provider>
    )
}

export default BoardContextProvider;
