function Alert({ title = "Text", buttons = [], children = ""}) {
    return (
        <>
            <div className="alert">
                <h3>{title}</h3>
                <p>{children}</p>
                {
                    buttons.map((button, i) => {
                        return button;
                    })
                }
            </div>
        </>
    )
}

export default Alert;