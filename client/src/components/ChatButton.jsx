const ChatInputButton = function({ onClick, children }) {
  return (
    <>
      <button onClick={onClick}>
        {children}
      </button>
    </>
  )
}

export default ChatInputButton;
