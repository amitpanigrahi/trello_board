import React, {useEffect, useRef, useState} from "react";
import s from './ModalTaskContent.module.scss';
import DefaultInput from "../Inputs/DefaultInput";

const ModalTaskContent = ({data, handleDelete, boardList, handleClose, handleTaskUpdate}) => {
    const inputRef = useRef();
    const [taskData, setTaskData] = useState(data);
    const {
        label = "",
        parentId,
        id
    } = taskData;
    const handleChange = e => {
        const updatedData = {...taskData};
        updatedData[e.target.name] = e.target.value;
        setTaskData(updatedData);
    }

    const handleSave = () => {
        handleTaskUpdate(taskData);
        handleClose();
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef])

    return (<>
        <div>
            <div>Title:</div>
            <DefaultInput forwardedRef={inputRef} onChange={handleChange} name={'label'} value={label}/>
        </div>
        <div className={'my-2'}>
            <div>Board:</div>
            <select className={'global__basic-input-style'} value={parentId} name={'parentId'} onChange={handleChange}>
                {boardList.map((boardData) => {
                    const {
                        id,
                        title = ''
                    } = boardData || {};
                    return (
                        <option key={id} value={id}>{title}</option>
                    )
                })}
            </select>
        </div>
        <div className={s.modalCtaWrapper}>
            <div>
                {id ? <button onClick={() => {
                    handleDelete(id);
                    handleClose();
                }} className={s.deleteCta}>
                    Delete
                </button> : null}
            </div>
            <div>
                <button onClick={handleClose} className={s.cta}>
                    Cancel
                </button>
                <button onClick={handleSave} className={s.primaryCta} disabled={!label}>
                    Save
                </button>
            </div>
        </div>
    </>)
}

export default ModalTaskContent;
