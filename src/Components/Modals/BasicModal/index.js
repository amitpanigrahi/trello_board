import ReactDOM from "react-dom";
import s from "./styles.module.scss";

const BasicModal = ({onClose, open = false, children, title = ''}) => {
    return (
        open ? ReactDOM.createPortal(
            <>
            <div className={s.modalWrapper} onClick={onClose}>
                {onClose && <span onClick={onClose} className={s.closeIcon}>+</span>}
                <div onClick={e => e.stopPropagation()}>
                    <div className={s.modalContentWrapper}>
                        <div className={s.modalTitle}>{title ? title : ''}</div>
                        {children}
                    </div>
                </div>
            </div></>, document.getElementById("root")
        ) : null
    )
}

export default BasicModal;
