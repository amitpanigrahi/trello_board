import React, {useContext, useRef, useState} from "react";
import "./styles.css";
import {h__handleDragOver, h__handleDragStart} from "./helpers";
import {BoardContext} from "../../Containers/Homepage/BoardContext";
import TaskList from "./TaskList";
import BasicModal from "../Modals/BasicModal";
import ModalTaskContent from "./ModalTaskContent";

const MainBoard = () => {
    const [selectedTask, setSelectedTask] = useState({});
    const boardListRef = useRef();

    const currentBoardContext = useContext(BoardContext);
    const {
        boardData,
        handleDrop,
        handleCreateBoard,
        handleTaskUpdate,
        handleDeleteTask
    } = currentBoardContext;

    const h__drop = (e, targetId, isCompleted) => {
        let taskData = e.dataTransfer.getData("dragEventData");
        targetId = targetId || e.target.id;
        if (taskData && targetId) {
            taskData = JSON.parse(taskData);
            const {
                id: taskId,
                parentId: sourceId,
            } = taskData || {};
            handleDrop(sourceId, targetId, taskId, isCompleted);
        }
    }

    // useEffect(() => {
    // if (boardListRef) {
    //     boardListRef.current.scrollTo(boardListRef.current.scrollWidth,0);
    // }
    // }, [boardData.length])

    const handleModalClose = () => {
        setSelectedTask({});
    }

    return (
        <div className="board-layout">
            <div className={'action-area'}>
                <button className={'primary-cta'} onClick={() => handleCreateBoard()}>+ Create Board</button>
            </div>
            <div id="boardlists" ref={boardListRef} className="board-lists">
                {boardData.map((data = {}, i) => {
                    return (
                        <TaskList
                            key={i}
                            {...data}
                            handleEditTask={setSelectedTask}
                            handleDrop={(e, isCompleted) => h__drop(e, data.id, isCompleted)}
                            handleDragOver={h__handleDragOver}
                            handleTaskDragStart={h__handleDragStart}
                            handleTaskUpdate={handleTaskUpdate}
                        />
                    )
                })}
            </div>
            <BasicModal
                open={!!selectedTask.parentId}
                onClose={handleModalClose}
                title={selectedTask.id ? 'Edit Task' : 'Create Task'}
            >
                <ModalTaskContent
                    data={selectedTask}
                    boardList={boardData}
                    handleClose={handleModalClose}
                    handleDelete={handleDeleteTask}
                    handleTaskUpdate={handleTaskUpdate}
                />
            </BasicModal>
        </div>
    );
};

export default MainBoard;
