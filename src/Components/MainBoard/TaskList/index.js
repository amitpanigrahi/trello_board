import React, {useState} from "react";
import AddTask from "../AddTask";
import s from './TaskList.module.scss';

const isEqual = (prev, current) => {
    return ((JSON.stringify(prev.tasksList) === JSON.stringify(current.tasksList)) && (prev.title === current.title) && (prev.isCompleted === current.isCompleted));
}

const h__separateCompletedList = (data) => {
    let completedList = [];
    let inCompletedList = [];
    data.forEach((val) => {
        if (val.isCompleted) {
            completedList.push(val);
        } else {
            inCompletedList.push(val);
        }
    });
    return ({completedList, inCompletedList})
}

const Task = ({data, parentId, handleEditTask, handleTaskDragStart, handleCompleteStatus}) => {
    const {id: taskId, label = "", isCompleted} = data;
    return (
        <div
            onClick={() => handleEditTask(data)}
            id={taskId}
            className={"card"}
            draggable
            onDragStart={e => handleTaskDragStart(e, parentId)}
        >
            <input title={`Mark ${isCompleted ? 'Incomplete' : 'Completed'}`} type="checkbox" className={'cursor_pointer'} checked={isCompleted} onClick={e => e.stopPropagation()}
                   onChange={e => handleCompleteStatus(e, {...data, isCompleted: !isCompleted})}/>{label}
        </div>
    )
}

const TaskList = (
    {id, title = "", tasksList = [], handleTaskUpdate, handleEditTask, handleDrop, handleDragOver, handleTaskDragStart}
) => {
    const [showCompletedList, setShowCompletedList] = useState(false);
    const {completedList, inCompletedList} = h__separateCompletedList(tasksList)
    const handleCompleteStatus = (e, data = {}) => {
        e.stopPropagation();
        handleTaskUpdate(data);
    }
    return (
        <div className={'d-flex flex-column position-relative overflow-auto'}>
            <div
                id={id}
                className="board-list position-relative"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <div className="list-title"><span>{title}</span> <span className={'add-task'} title={'Add Task'}
                                                                       onClick={() => handleEditTask({parentId: id})}>+</span>
                </div>

                {inCompletedList.map((data, i) => <Task key={data?.taskId || i} data={data} parentId={id} handleEditTask={handleEditTask}
                                                     handleTaskDragStart={handleTaskDragStart}
                                                     handleCompleteStatus={handleCompleteStatus}/>)}
                {/*<div>*/}
                <AddTask isCompletedListActive={!!completedList.length}
                         handleAdd={() => handleEditTask({parentId: id})}/>
                {/*</div>*/}
            </div>
            {completedList.length ?
                <div
                    onDrop={e => {
                        e.stopPropagation();
                        handleDrop(e, true);
                    }}
                    onDragOver={handleDragOver}
                    className={`${s.completedList} ${showCompletedList ? s.completedListOpen : ''}`}>
                    <div className={s.title} onClick={() => setShowCompletedList(!showCompletedList)}>
                        <span>{showCompletedList ? "Hide" : "Show"} Completed List</span>
                        <span>{showCompletedList ? 'v' : '^'}</span>
                    </div>
                    {showCompletedList ? <div>
                        {completedList.map((data, i) => <Task key={data?.taskId || i} data={data} parentId={id} handleEditTask={handleEditTask}
                                                           handleTaskDragStart={handleTaskDragStart}
                                                           handleCompleteStatus={handleCompleteStatus}/>)}
                    </div> : null}
                </div> : null}

        </div>
    )
}

export default React.memo(TaskList, isEqual);
