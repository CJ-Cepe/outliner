

console.log("Content -> yeah!!")

//if slider true 
    if(false){
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = './outline.css';
        document.head.appendChild(link)
    } else {
        let links = document.head.querySelectorAll('link')
        links.forEach((link) => {
            if(link.href.includes('outline.css')) {
                document.head.removeChild(link)
            }
        })
    }