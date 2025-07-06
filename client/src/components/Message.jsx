function Message({ id, children }) {
    return (
        <div className="message" key={id}>
            <p className="name">{children.name}:</p>
            <p className="content">{children.content}</p>
        </div>
    )
}

export default Message;