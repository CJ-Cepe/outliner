function EmojiLink({emoji, content}){
    const [firstWord, secondWord] = content.split(" ")

    return (
        <>
            <a href="https://ko-fi.com/ceps#" target="_blank"> 
                {emoji} {firstWord}
                <span>{secondWord}</span>
            </a>
        </>
    )
}

export default EmojiLink