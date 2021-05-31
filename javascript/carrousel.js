/* REQUEST THE TRENDING CARROUSEL IMAGES */
var giphyApitrending = `https://api.giphy.com/v1/gifs/trending?api_key=${APIkey1}&rate=g&limit=12`

/*SELECT THE BUTTONS  */
var rightarrowtrending = document.getElementsByClassName('flechaDerecha')[0]
var leftarrowtrending = document.getElementsByClassName('flechaIzquierda')[0]

/* CARROUSEL CARDS  */
!async function carrouselImages(giphyApitrending) {

    try {

        let fetchtopics = await fetch(giphyApitrending)
        let response = await fetchtopics.json()

        printGifCarrousel(response.data)

        // RIGHT MOVE
        rightarrowtrending.addEventListener('click', translatex)

        // LEFT MOVE
        leftarrowtrending.addEventListener('click', translatexreverse)

    }
    catch (error) {
        console.error('palper en trending topics', error)
    }
}(giphyApitrending)

const printGifCarrousel = (json) => {

    console.log(json);

    json.forEach(Gifelement => {

        const cardModel = createCardModel(Gifelement, 1,"card1 card1-interaction3" ,"Assets/icon-fav.svg","card1 card1-interaction3-active" , "Assets/icon-fav-active.svg","overlay-colorselect" ,"tarjeta", "card-trending" )

        const container = document.getElementsByClassName('cards')[0]
        container.innerHTML += cardModel
    })

    hoverCardOptions('card-trending', 1)
    cardoptionsfuc(1, 0)
    localfavpressed()

}



var contadorsliderreverse = 1
var contadorslider = 1
var tarjetas = document.getElementsByClassName('tarjeta')


function translatex() {

    /* VALIDATE IF IT'S AT THE END RIGHT */
    if (contadorslider == 10) {

        for (let i = 0; i < tarjetas.length; i++) {
            tarjetas[i].setAttribute('style', `transition: 0.7s ease-out; transform: translateX(0);`)
        }
        contadorsliderreverse = 1
        contadorslider = 1

    } else {
        for (let i = 0; i < tarjetas.length; i++) {
            tarjetas[i].setAttribute('style', `transition: 0.7s ease-out; transform: translateX(${-385 * contadorslider}px);`)
        }
        contadorslider++
        contadorsliderreverse--

    }


}

function translatexreverse() {

    if (contadorsliderreverse == 1) {

        for (let i = 0; i < tarjetas.length; i++) {
            tarjetas[i].setAttribute('style', `transition: 0.7s ease-out; transform: translateX(-3450px);`)
        }
        contadorsliderreverse = -8
        contadorslider = 10

    } else {
        for (let i = 0; i < tarjetas.length; i++) {
            tarjetas[i].setAttribute('style', `transition: 0.7s ease-out; transform: translateX(${385 * contadorsliderreverse}px);`)
        }
        contadorsliderreverse++
        contadorslider--

    }


}









