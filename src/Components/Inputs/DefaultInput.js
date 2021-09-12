
const DefaultInput = ({forwardedRef, ...props}) => {
    return (
        <input ref={forwardedRef} className={'global__basic-input-style'} {...props}/>
    )
}

export default DefaultInput;
