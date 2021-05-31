// API Request either on enter or click
const gifosInput = document.getElementById('input')
gifosInput.addEventListener('keydown', enterValidator)

function enterValidator(e) {
    if (e.key === 'Enter')
        beforeFetchChanges()
};

const lupaapi = document.getElementsByClassName('lupa')[0]
lupaapi.addEventListener('click', beforeFetchChanges)

/* PRINT ANOTHER 12 GIFS */
const vermas = document.getElementsByClassName('vermas')[0]


function beforeFetchChanges() {

    /* STYLES FOR THE SECTION 1 CONTAINER*/
    const section1Container = document.getElementsByClassName('resultados-seccion1')[0]
    section1Container.setAttribute('style', 'display:unset;display: flex;flex-direction: column;justify-content: center; align-items: center;')

    const linea = document.createElement("div")
    linea.setAttribute('style', 'width:23.5vw; height:0.1px; opacity: 0.5; background-color: #9CAFC3;')

    const searchTrending = document.getElementsByClassName('trending-seccion1')[0]
    const container = document.getElementsByClassName('containerapiresult')[0]

    /* CHANGE SEARCH TITLE  */
    searchTrending.innerHTML = ""
    container.innerHTML = ""

    /* CREATE LINE STYLE ABOVE SEARCH */
    searchTrending.appendChild(linea)

    /*--------------- API REQUEST------------*/
    let userInput = gifosInput.value
    let giphyApiURL = `https://api.giphy.com/v1/gifs/search?q=${userInput}&rating=pg&api_key=${APIkey1}`

    /* HEADER OF THE CONTAINER WITH THE TITLE SEARCH */
    const titleApiRequest = document.getElementsByClassName('tituloapirequest')[0]
    titleApiRequest.innerHTML = userInput;

    gifCards(giphyApiURL)
}

async function fetchapi(giphyApiURL) {

    /* FETCH TO THE API */
    let request = await fetch(giphyApiURL)
    let apiResponse = await request.json()

    // COPY THE OBJECT INTO ANOTHER VARIABLE
    return apiResponse.data
}

const gifCards = async (url) =>{

    let Response = await fetchapi(url)
    seeMore()

    const seeMore = () =>{ printGif(Response) }

    vermas.addEventListener('click', seeMore)
}



/* GENERAL FUNCTION TO CREATE SMALL CARDS  */
const printGif = (json) => {

    const tarjetaAPICount = document.getElementsByClassName('tarjetaAPI').length

    /* PRINT JUST IF ENOUGH GIFS */
    if (tarjetaAPICount <= 36) {

        for (let i = 0 + tarjetaAPICount; i < tarjetaAPICount + 12; i++) {

            const cardModel = createCardModel(json[i],2, "card2 card2-interaction3","Assets/icon-fav.svg", 'card2 card2-interaction3-active', 'Assets/icon-fav-active.svg','overlay-colorselect','tarjetaAPI', 'response')

            const container = document.getElementsByClassName('containerapiresult')[0]
            container.innerHTML += cardModel
        }

    }
    hoverCardOptions('response', 2)
    cardoptionsfuc(2, 0)
    localfavpressed()
}


