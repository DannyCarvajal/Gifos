// API Request either on enter or click
let onEnter = document.getElementById('input')
let lupaapi = document.getElementsByClassName('lupa')[0]
onEnter.addEventListener('keydown',enterValidator)
lupaapi.addEventListener('click', sendApiRequest)

function enterValidator(e) {
    if (e.key === 'Enter')
        sendApiRequest()
};

/* General counter */
let contadorclicks = 0

function sendApiRequest() {

    /*----- GENERAL CHANGES BEFORE FETCH----- */

    let searchTrending = document.getElementsByClassName('trending-seccion1')[0]
    let linea = document.createElement("div")
    let container = document.getElementsByClassName('containerapiresult')[0]
    
    /* CHANGE SEARCH TITLE  */
    searchTrending.innerHTML = ""
    /* CREATE LINE STYLE ABOVE SEARCH */
    linea.setAttribute('style', 'width:23.5vw; height:0.1px; opacity: 0.5; background-color: #9CAFC3;')
    searchTrending.appendChild(linea)
    
    /* CLEAN THE CONTAINER ON A NEW SEARCH  */
    container.innerHTML = ""
    
    /*--------------- API REQUEST------------*/

    let userInput = document.getElementById('input').value
    let giphyApiURL = `https://api.giphy.com/v1/gifs/search?q=${userInput}
        &rating=pg&api_key=${APIkey1}`

    /* HEADER OF THE CONTAINER WITH THE TITLE SEARCH */
    let titleApiRequest = document.getElementsByClassName('tituloapirequest')[0]
    titleApiRequest.innerHTML = userInput;

    /* STYLES FOR THE CONTAINER*/
    let resultsContainer = document.getElementsByClassName('resultados-seccion1')[0]
    resultsContainer.setAttribute('style', 'display:unset;display: flex;flex-direction: column;justify-content: center; align-items: center;')

    fetchapi(giphyApiURL)
}

var Responselist = []

async function fetchapi(giphyApiURL) {

    /* FETCH TO THE API */
    let request = await fetch(giphyApiURL)
    let apiResponse = await request.json()
    
    /* SEND TO THE API */
    localStorage.setItem("cardssearch",JSON.stringify(apiResponse))
    /* OBTAIN    */
    // let resultinlocal= JSON.parse(localStorage.getItem("cardssearch"))
    // console.log(resultinlocal)

    // COPY THE OBJECT INTO ANOTHER VARIABLE
    Responselist= JSON.parse(JSON.stringify(apiResponse))

    /* PRINT FIRST ROW OF 12 CARDS */
    cardGif(Responselist, 'response', 2, 'tarjetaAPI')

    vermas(Responselist)
}


function vermas(Responselist) {
    var contadorapi = 0
    
    /* LOAD ANOTHER SET OF IMAGES WITH SEE MORE*/
    var vermas= document.getElementsByClassName('vermas')[0]
    vermas.addEventListener('click', newImages)

    function newImages(){
        contadorapi++
        
        if (contadorapi <= 3) {
            cardGif(Responselist, 'response', 2, 'tarjetaAPI', 12 * contadorapi, 12 * (contadorapi + 1))
        }
    }
    
        /* CLEAR API  */
        onEnter.addEventListener('keydown', (e) => {
            if (e.key === 'Enter')
                contadorapi=3
        })
    
        lupaapi.addEventListener('click', () => {
            contadorapi=3
        })

}


contadorclicks++

// function suggestioncardclear(){
    
//     let lupaimgactive= document.getElementsByClassName('imglupaactive')
//     for (let i = 0; i < lupaimgactive.length; i++) {
//         lupaimgactive[i].addEventListener('click',()=>{
//             contadorapi=3
//         })
        
//     }
// }