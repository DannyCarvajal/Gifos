// API REQUEST EITHER ON ENTER OR CLICK
const gifosInput = document.getElementById('input')
gifosInput.addEventListener('keydown', enterValidator)

function enterValidator(e) {
    if (e.key === 'Enter'){

        /* STOP SEARCH SUGGESTION */
        inputsug.removeEventListener('keyup', validateArrow)
        beforeFetchChanges()
    }
}

/* START SEARCH SUGGESTION AGAIN ON INPUT CLICK*/
gifosInput.addEventListener('keydown', ()=> inputsug.addEventListener('keyup', validateArrow))

const lupaapi = document.getElementsByClassName('lupa')[0]
lupaapi.addEventListener('click', beforeFetchChanges)

const vermas = document.getElementsByClassName('vermas')[0]
const section1Container = document.getElementsByClassName('resultados-seccion1')[0]
const trendingTerms = document.getElementsByClassName('trending-seccion1')[0]
const containerApiResult = document.getElementsByClassName('containerapiresult')[0]
const titleApiRequest = document.getElementsByClassName('tituloapirequest')[0]


function beforeFetchChanges() {

    /* DON'T SEND SEARCH SUGGESTION */
    clearactivenav()
    
    section1Container.setAttribute('style', 'display:unset;display: flex;flex-direction: column;justify-content: center; align-items: center;')

    /* CHANGE SEARCH TITLE  */
    containerApiResult.innerHTML = ""
    
    /*API REQUEST*/
    let userInput = gifosInput.value
    let giphyApiURL = `https://api.giphy.com/v1/gifs/search?q=${userInput}&rating=pg&api_key=${APIkey1}`

    /* HEADER OF THE CONTAINER WITH THE TITLE SEARCH */
    titleApiRequest.innerHTML = userInput;

    vermas.removeEventListener('click',seeMore)

    /* FETCH AND SEND PRINT */
    gifCards(giphyApiURL)
}

var Response = []

/* PRINT ANOTHER 12 GIFS ON SEE MORE BUTTON */
const seeMore = () => printGif(Response);

const gifCards = async (url) =>{

    let request = await fetch(url)
    let Responsejson = await request.json()
    Response = Responsejson.data

    trendingTerms.innerHTML = '<div style="width:23.5vw; height:0.1px; opacity: 0.5; background-color: #9CAFC3;"></div>'    
    printGif(Response) 

    vermas.addEventListener('click',seeMore)
}


/* GENERAL FUNCTION TO CREATE SMALL CARDS  */
const printGif = (json) => {
    
    const tarjetaAPICount = document.getElementsByClassName('tarjetaAPI').length

    /* PRINT JUST IF ENOUGH GIFS */
    if (tarjetaAPICount <= 36) {
        for (let i = 0 + tarjetaAPICount; i < tarjetaAPICount + 12; i++) {
            const cardModel = createCardModel(json[i],"tarjetaAPI", "response")
            containerApiResult.innerHTML += cardModel
        }
    }
    onHoverCard('miniSize')
    heartButton()
    downloadButton()
    maxButton()
}