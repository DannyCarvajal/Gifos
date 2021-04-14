

// API Request either on enter or click
let onEnter = document.getElementById('input')
onEnter.addEventListener('keydown', enterValidator)

function enterValidator(e) {
    if (e.key === 'Enter')
        sendApiRequest()
};

let lupaapi = document.getElementsByClassName('lupa')[0]
lupaapi.addEventListener('click', sendApiRequest)


/* General counter */
var contadorclicks = 0

function suggestioncardclear(){
    
    let lupaimgactive= document.getElementsByClassName('imglupaactive')
    for (let i = 0; i < lupaimgactive.length; i++) {
        lupaimgactive[i].addEventListener('click',()=>{
            contadorapi=3
        })
        
    }
}

function sendApiRequest() {

    console.log('has mandado la api')
    /* GENERAL CHANGES BEFORE FETCH */

    /* CLEAR TRENDIG TOPICS// FOR A LINE  */
    let trendingtopicsclear = document.getElementsByClassName('trending-seccion1')[0]
    trendingtopicsclear.innerHTML = ""
    let linea = document.createElement("div")
    linea.setAttribute('style', 'width:23.5vw; height:0.1px; opacity: 0.5; background-color: #9CAFC3;')
    trendingtopicsclear.appendChild(linea)

    /* CLEAN THE CONTAINER ON A NEW SEARCH  */
    let container = document.getElementsByClassName('containerapiresult')[0];
    container.innerHTML = ""

    /* SET URL FOR THE FETCH*/
    var userInput = document.getElementById('input').value
    var giphyApiURL = `https://api.giphy.com/v1/gifs/search?q=${userInput}
        &rating=pg&api_key=${APIkey1}`

    /* HEADER OF THE CONTAINER WITH THE TITLE SEARCH */
    let tituloapirequest = document.getElementsByClassName('tituloapirequest')[0];
    tituloapirequest.innerHTML = userInput;

    /* STYLES FOR THE CONTAINER*/
    let resultadosseccion1 = document.getElementsByClassName('resultados-seccion1')[0]
    resultadosseccion1.setAttribute('style', 'display:unset;display: flex;flex-direction: column;justify-content: center; align-items: center;')

    fetchapi(giphyApiURL)
}

var Responselist = []

async function fetchapi(giphyApiURL) {

    /* FETCH TO THE API */
    var fetchreq = await fetch(giphyApiURL)
    var requestres = await fetchreq.json()
    
    /* SEND TO THE API */
    localStorage.setItem("cardssearch",JSON.stringify(requestres))
    /* OBTAIN    */
    // let resultinlocal= JSON.parse(localStorage.getItem("cardssearch"))
    // console.log(resultinlocal)

    // COPY THE OBJECT INTO ANOTHER VARIABLE
    Responselist= JSON.parse(JSON.stringify(requestres))

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

