import { forwardRef } from "react";

const ChatInput = function({ value, onChange, onKeyDown, onKeyUp }) {
    return (
        <>
            <textarea className="chatInput" value={value} onChange={event => onChange(event)} onKeyDown={event => onKeyDown(event)} onKeyUp={event => onKeyUp(event)}></textarea>
        </>
    )
}

export default ChatInput;