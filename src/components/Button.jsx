function Button ({onClick}){
    
    const handleClick = (event) => {
        onClick()
    }

    return (
        <>
            <button>
                <span class="button_top" onClick={handleClick}> Toggle Outline </span>
            </button>
        </>
    )
}

export default Button
