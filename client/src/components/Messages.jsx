import Message from "./Message";

function Messages({ data, children }) {
    return (
        <div className="messages">
            {
                data.map((messageData, i) => {
                    return (
                        <Message key={i} id={i}>{messageData}</Message>
                    )
                })
            }
            {children}
        </div>
    )
}

export default Messages;