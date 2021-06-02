/* REQUEST THE TRENDING CARROUSEL IMAGES */
let giphyApitrending = `https://api.giphy.com/v1/gifs/trending?api_key=${APIkey1}&rate=g&limit=12`
const container = document.getElementsByClassName('cards')[0]

/*SELECT THE BUTTONS  */
const rightarrowCarrousel = document.getElementsByClassName('flechaDerecha')[0]
const leftarrowCarrousel = document.getElementsByClassName('flechaIzquierda')[0]

/* CARROUSEL CARDS  */
!async function carrouselImages(giphyApitrending) {

    try {
        let fetchtopics = await fetch(giphyApitrending)
        let response = await fetchtopics.json()

        printGifCarrousel(response.data)

        rightarrowCarrousel.addEventListener('click', translatex)
        leftarrowCarrousel.addEventListener('click', translatexreverse)
        
    }
    catch (error) {
        console.error('palper en trending topics', error)
    }
}(giphyApitrending)

const printGifCarrousel = (json) => {
    
    json.forEach(Gifelement => {
        const cardModel = createCardModel(Gifelement, 1,"card1 card1-interaction3" ,"Assets/icon-fav.svg","card1 card1-interaction3-active" , "Assets/icon-fav-active.svg","overlay-colorselect" ,"tarjeta", "card-trending" )
        container.innerHTML += cardModel
    })
    
    hoverCardOptions('card-trending', 1)
    cardoptionsfuc(1, 0)
    localfavpressed()
    
}

let ReverseCarrouselCounter = 1 , NormalCarrouselCounter = 1;
const tarjetas = document.getElementsByClassName('tarjeta')

function translatex() {
    
    /* VALIDATE IF IT'S AT THE END RIGHT */
    if (NormalCarrouselCounter !== tarjetas.length - 2){
        Array.from(tarjetas).forEach(card=>{
            card.setAttribute('style', `transition: 0.7s ease-out; transform: translateX(${-385 * NormalCarrouselCounter}px);`)
        })
        NormalCarrouselCounter++
        ReverseCarrouselCounter--
    }
}

function translatexreverse() {

    if (ReverseCarrouselCounter !== 1) {
        Array.from(tarjetas).forEach(card=>{
            card.setAttribute('style', `transition: 0.7s ease-out; transform: translateX(${385 * ReverseCarrouselCounter}px);`)
        })
        NormalCarrouselCounter--
        ReverseCarrouselCounter++
    }
}