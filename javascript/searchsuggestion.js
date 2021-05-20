

/* SUGGESTION INPUT */
const inputsug = document.getElementsByClassName('inputsuggestion')[0]
inputsug.addEventListener('keyup', suggestionreq)

/* CONTAINER ELEMENTS */
let borderinput = document.getElementsByClassName('border-buscador-seccion1')[0]
let lupaactive = document.getElementsByClassName('lupa')[0]

let timeout = null
var activecontador= 0


function suggestionreq() {

    clearTimeout(timeout)

    if (inputsug.value === "") {
        eraseSearch()
    } else {
        lupaactive.setAttribute('src', 'Assets/icon-search-active.svg')
        lupaactive.setAttribute('style', ' position:absolute; right:0px;   left:20px; ')
        /* CROSS RIGHT SIDE */
        var cross = document.createElement("img")
        cross.className = 'navactive crosscleaner xfade'
        cross.setAttribute('src', 'Assets/close.svg')
        cross.setAttribute('style', 'position:absolute; top:18px; right:23px; cursor:pointer; ')
        borderinput.appendChild(cross)

        let crosscleaner = document.getElementsByClassName('crosscleaner')
        for (let i = 0; i < crosscleaner.length; i++) {
            crosscleaner[i].addEventListener('click', () => {
                eraseSearch()
            })
        }
    }

    timeout = setTimeout(termsfetch, 600)

}



function eraseSearch() {

    const navactive = document.getElementsByClassName('navactive')

    borderinput.setAttribute('style', 'height:50px')
    lupaactive.setAttribute('style', 'position:absolute; left:0px; left:unset;  right:20px; ')

    inputsug.value = "";
    lupaactive.src = 'Assets/icon-search.svg';

    /* NAVACTIVE IS NOT AN ARRAY , WE CAN CONVERT IT WITH ARRAY.FROM OR THE SPREAD OPERATOR [...]*/
    Array.from(navactive).forEach(element=>{
        element.parentElement.removeChild(element)
    })
    
    
}

async function termsfetch() {
        
    let term = inputsug.value
    let suggestions = `https://api.giphy.com/v1/gifs/search/tags?q=${term}&api_key=${APIkey1}&limit=4`
    
    try {

        let request = await fetch(suggestions)
        let jsonr = await request.json()

        /* CLEAN WHILE WRITING */
        inputsug.addEventListener('keydown', clearactivenav)

        function clearactivenav() {

            let navactive = document.getElementsByClassName('navactive')
            for (let i = 0; i < navactive.length; i++) {
                borderinput.removeChild(navactive[i])
            }
            for (let i = 0; i < navactive.length; i++) {
                navactive[i].setAttribute('style', 'display:none')
            }
            borderinput.setAttribute('style', 'height:50px')
        }



        if (document.querySelector('.resultactive')) {
        } else {

            /* SET THE HEIGHT OF THE SEARCHER NAV */
            let heightborder;

            switch (jsonr.data.length) {

                case 4:
                    heightborder = 200
                    break;

                case 3:
                    heightborder = 170
                    break;

                case 2:
                    heightborder = 140
                    break;

                case 1:
                    heightborder = 110
                    break;

            }

            borderinput.setAttribute('style', `height:${heightborder}px`)

            /* UL OF SUGGGESTIONS */
            let ulinput = document.createElement("ul")
            ulinput.className = 'navactive resultactive'
            ulinput.setAttribute('style', 'position: absolute; left: 25px; bottom: 24px; display:flex; flex-direction:column; gap:10px; align-items:top')

            /* DECORATION GREY LINE */
            let linegrey = document.createElement("div")
            linegrey.className = 'navactive crosscleaner resultactive'
            linegrey.setAttribute('style', 'width:91%; height:1px; margin: 47px auto 0 auto; opacity: 0.5; border: 1px solid #9CAFC3;')


            for (let i = 0; i < jsonr.data.length; i++) {

                var linput = document.createElement("li")
                linput.setAttribute('style', 'list-style: none; color:#9CAFC3;display:flex; gap:15px')

                var lupaimg = document.createElement("img")
                lupaimg.setAttribute('src', 'Assets/icon-search-active.svg')
                lupaimg.setAttribute('style', 'width: 15.8px; height: 15.8px; cursor: pointer; order:-1; position:relative; top:2px')
                lupaimg.className= "imglupaactive"
                linput.className = `titulo search${i} lupaactive`
                linput.innerText = jsonr.data[i].name
                // linput.innerText= 
                linput.appendChild(lupaimg)
                /* APPEND IMG TO LI */
                ulinput.appendChild(linput)

                borderinput.appendChild(ulinput)
                borderinput.appendChild(linegrey)

                
                lupaimg.addEventListener('click', () => {
                    let userInput = document.getElementById('input')
                    userInput.value = jsonr.data[i].name
                    lupaapi.click()
                })
            }
        }

    } catch (err) {
        console.error('algo ha venido mal en el suggestion')
    }
}