function Button ({onClick}){
    
    const handleClick = (event) => {
        onClick(!state)
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
