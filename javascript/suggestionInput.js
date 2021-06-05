/* SUGGESTION INPUT */
const inputsug = document.getElementsByClassName('inputsuggestion')[0]
inputsug.addEventListener('keyup', validateArrow)

function validateArrow(e) {
    /* DON'T SEARCH ON ARROWS */
    if (e.keyCode === 38 || e.keyCode === 40)
        return e.preventDefault()

    suggestionreq()
}


/* CONTAINER ELEMENTS */
const borderinput = document.getElementsByClassName('border-buscador-seccion1')[0]
const lupaactive = document.getElementsByClassName('lupa')[0]

let timeout = null
var activecontador = 0


function suggestionreq() {

    clearTimeout(timeout)

    if (inputsug.value === "") {
        eraseSearch()
    } else {
        lupaactive.setAttribute('src', 'Assets/icon-search-active.svg')
        lupaactive.setAttribute('style', ' position:absolute; right:0px;   left:20px; ')

        /*CREATE CROSS AT THE RIGHT SIDE */
        let cross = document.createElement("img")
        cross.className = 'navactive crosscleaner xfade'
        cross.setAttribute('src', 'Assets/close.svg')
        cross.setAttribute('style', 'position:absolute; top:18px; right:23px; cursor:pointer;')
        cross.addEventListener("click", eraseSearch)
        borderinput.appendChild(cross)
    }

    timeout = setTimeout(termsfetch, 600)

}

var termsResponse

async function termsfetch() {

    let term = inputsug.value
    let suggestions = `https://api.giphy.com/v1/gifs/search/tags?q=${term}&api_key=${APIkey1}&limit=4`

    try {
        let request = await fetch(suggestions)
        termsResponse = await request.json()
        let lengthResponse = termsResponse.data.length

        /* CLEAN SEARCHER ELEMENT WHILE WRITING */
        inputsug.addEventListener('keydown', clearactivenav)

        /* IF THERE'S SOMETHING AND YOU PRESS QUICKLY DON'T OVERWRITE THE NEXT SEARCH */
        if (!document.querySelector('.resultactive') && lengthResponse !== 0)
            createTermElements(lengthResponse, termsResponse)

    } catch (err) {
        console.error('algo ha venido mal en el suggestion', err)
    }
}

const createTermElements = (lengthResponse) => {

    /* SET THE HEIGHT OF THE SEARCHER NAV */
    let heightborder = 80 + lengthResponse * 30
    borderinput.setAttribute('style', `height:${heightborder}px`)

    /* UL OF SUGGGESTIONS */
    let ulinput = document.createElement("ul")
    ulinput.className = 'navactive resultactive'
    ulinput.setAttribute('style', 'position: absolute; left: 25px; bottom: 24px; display:flex; flex-direction:column; gap:10px; align-items:top')
    ulinput.innerHTML = ""

    /* DECORATION GREY LINE */
    let linegrey = document.createElement("div")
    linegrey.className = 'navactive crosscleaner resultactive'
    linegrey.setAttribute('style', 'width:91%; height:1px; margin: 47px auto 0 auto; opacity: 0.5; border: 1px solid #9CAFC3;')

    /* LI ELEMENTS */
    for (let i = 0; i < lengthResponse; i++) {
        let linputhtml = `
                    <li style="list-style: none; color:#9CAFC3;display:flex; gap:15px" class="titulo search${i} lupaactive">${termsResponse.data[i].name}
                        <img src="Assets/icon-search-active.svg" style="width: 15.8px; height: 15.8px; cursor: pointer; order:-1; position:relative; top:2px" class="imglupaactive">
                    </li>
                `
        ulinput.innerHTML += linputhtml
    }

    borderinput.append(ulinput, linegrey)

    inputsug.addEventListener('keyup', arrowSearch)

    /* SEARCH TERM CLICKING ON SMALL MAGNIFIER OF EACH IMG */
    let lupaimg = document.getElementsByClassName('lupaactive')

    for (let i = 0; i < lupaimg.length; i++) {
        lupaimg[i].addEventListener("click", () => {
            inputsug.value = termsResponse.data[i].name
            lupaapi.click()
        })
    }

}

let index = -1

/* SEARCH AMONG THE SUGGESTIONS WITH THE ARROWS */
const arrowSearch = (e) => {

    let lupalength = document.getElementsByClassName('lupaactive').length
    /* DOWN ARROW */
    if (e.keyCode === 40 && index < lupalength - 1) {
        index++
        let suggestions = document.getElementsByClassName('lupaactive')[index]

        if (index !== 0)
            document.getElementsByClassName('lupaactive')[index - 1].setAttribute('style', 'list-style: none; color:#9CAFC3;display:flex; gap:15px')

        suggestions.setAttribute('style', 'list-style: none; color: --var(negro); display:flex; gap:15px')
        inputsug.value = termsResponse.data[index].name
    }

    /* UP ARROW */
    if (e.keyCode === 38 && index > 0) {
        index--
        let suggestions = document.getElementsByClassName('lupaactive')[index]
        document.getElementsByClassName('lupaactive')[index + 1].setAttribute('style', 'list-style: none; color:#9CAFC3;display:flex; gap:15px')

        suggestions.setAttribute('style', 'list-style: none; color: --var(negro); display:flex; gap:15px')
        inputsug.value = termsResponse.data[index].name
    }

}



const eraseSearch = () => {
    
    const navactive = document.getElementsByClassName('navactive')
    lupaactive.setAttribute('style', 'position:absolute; left:0px; left:unset;  right:20px; ')
    inputsug.value = "";
    lupaactive.src = 'Assets/icon-search.svg';

    borderinput.setAttribute('style', 'height:50px')
    /* NAVACTIVE IS NOT AN ARRAY , WE CAN CONVERT IT WITH ARRAY.FROM OR THE SPREAD OPERATOR [...]*/
    Array.from(navactive).forEach(element => {
        element.parentElement.removeChild(element)
    })

}

let navactive = document.getElementsByClassName('navactive')
const clearactivenav = (e) => {

    /* DON'T DO IT WITH ARROWS */
    if ( e !== undefined && e.keyCode === 38 || e !== undefined && e.keyCode === 40)
        return e.preventDefault()

    /* RESET ARROW SEARCH */
    index = -1

    Array.from(navactive).forEach(element => {
        borderinput.removeChild(element)
    })
    borderinput.setAttribute('style', 'height:50px')

}