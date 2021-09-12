import {v4 as uuidV4} from "uuid";
import {useState} from "react";
import {DUMMY_BOARD_LIST, DUMMY_TASK_LIST} from "./TEMP_DATA_SETS";

const lsKey = 'dummy_trello_processed_task';

const h__serializeListData = () => {
    return (DUMMY_TASK_LIST.reduce((a, b) => {
        const parentId = b.parentId;
        a[parentId] = (a[parentId] || []);
        a[parentId].push(b);
        return a;
    }, {}))
};

const h__attachTaskToBoard = (data = []) => {
    const parentToTaskMap = h__serializeListData();
    data.forEach(val => {
        val.tasksList = parentToTaskMap[val.id] || [];
    })
    return data;
};

const existingData = localStorage.getItem(lsKey);

const useBoardAndTaskManagerHook = () => {
    const [allData, setAllData] = useState(existingData ? JSON.parse(existingData) : h__attachTaskToBoard(DUMMY_BOARD_LIST));

    const handleUpdateList = () => {
        const newResp = h__attachTaskToBoard(DUMMY_BOARD_LIST);
        localStorage.setItem(lsKey, JSON.stringify(newResp));
        setAllData([...newResp]);
    }

    const handleDrop = (sourceParentId, targetParentId, taskId, isCompleted) => {
        if (!sourceParentId || !targetParentId || !taskId) return;
        const taskIndex = DUMMY_TASK_LIST.findIndex(val => val.id === taskId);
        if (taskIndex < 0) return;
        DUMMY_TASK_LIST[taskIndex] = {...DUMMY_TASK_LIST[taskIndex], parentId: targetParentId, isCompleted: isCompleted};
        // DUMMY_TASK_LIST[taskIndex].parentId = targetParentId;
        // DUMMY_TASK_LIST[taskIndex].isCompleted = isCompleted || false;
        handleUpdateList();
    }
    const handleAddTaskToBoard = ({parentId, label = ''}) => {
        if (!parentId) return;
        DUMMY_TASK_LIST.push({
            id: uuidV4(),
            parentId: parentId,
            label: label || `New Task ${Math.round(Math.random()*100)}`
        });
        handleUpdateList();
    }
    const handleCreateBoard = (title = '') => {
        DUMMY_BOARD_LIST.push({
            id: uuidV4(),
            title: title || `List ${DUMMY_BOARD_LIST.length+1}`,
        });
        handleUpdateList();
    }

    const handleTaskUpdate = (data = {}) => {
        if (!data?.id) {
            handleAddTaskToBoard(data);
            return
        }
        const taskIndex = DUMMY_TASK_LIST.findIndex(val => val.id === data.id);
        if (taskIndex < 0) return;
        DUMMY_TASK_LIST[taskIndex] = data;
        handleUpdateList();
    }

    const handleDeleteTask = (id) => {
        if (!id) {
            return
        }
        const taskIndex = DUMMY_TASK_LIST.findIndex(val => val.id === id);
        if (taskIndex < 0) return;
        delete DUMMY_TASK_LIST[taskIndex];
        handleUpdateList();
    }
    return ({
        boardData: allData,
        handleDrop,
        handleAddTaskToBoard,
        handleCreateBoard,
        handleTaskUpdate,
        handleDeleteTask
    })
}

export default useBoardAndTaskManagerHook;
