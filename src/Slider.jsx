export default function Slider ({state, onChange}){
    const handleChange = (event) => {
        onChange(!state)
    }

    const handleClick = (event) => {
        handleChange(event)
    }

    return (
        <>
            <button>
                <span class="button_top"> Toggle Outline </span>
            </button>
        </>
    )
}
