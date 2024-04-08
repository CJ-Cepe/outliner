
function EmojiLink({emoji, content, onClick}){
    const [firstWord, secondWord] = content.split(" ")

    return (
        <>
            <a onClick={onClick}> 
                {emoji} {firstWord}
                <span>{secondWord}</span>
            </a>
        </>
    )
}

export default EmojiLink