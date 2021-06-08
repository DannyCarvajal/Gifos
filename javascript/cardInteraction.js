let cardgeneral = document.getElementsByClassName("card")
let gifImageclassMiniSize = document.getElementsByClassName("response")
let gifImageclassBigSize = document.getElementsByClassName("card-trending")

/* ON HOVER SHOW TITLE, PURPLE BG, AND BUTTONS  */
const onHoverCard = (size) => {

    let className;

    if (size === "miniSize") {
        className = gifImageclassMiniSize
    } else {
        className = gifImageclassBigSize
    }

    /* SHOW AND REMOVE PURPLE ON HOVER */
    Array.from(className).forEach(cardGif => {
        cardGif.addEventListener('mouseover', () => cardGif.previousElementSibling.classList.remove(`cardoptionshover`))
        cardGif.addEventListener('mouseout', () => cardGif.previousElementSibling.classList.add(`cardoptionshover`))
    })

    /*REMAIN PURPLE HOVER ON PRESSING BUTTONS  */
    Array.from(cardgeneral).forEach(card => {
        card.addEventListener('mouseover', () => card.parentElement.classList.remove(`cardoptionshover`))
        card.addEventListener('mouseout', () => card.parentElement.classList.add(`cardoptionshover`))
    })

}

const heartButton = (gifIdClass) => {

    let elementHeartActive = document.getElementsByClassName(gifIdClass)[0]
    let elementHeart = elementHeartActive.previousElementSibling

    if (!elementHeart.classList.contains("trash")) {

        /* HEART ICON ON HOVER */
        iconchange(elementHeart, 'mouseover', "Assets/icon-fav-hover.svg")
        iconchange(elementHeart, 'mouseout', "Assets/icon-fav.svg")

        /* STILL HOVER WHILE MOUSEOVER IN INNER HEART */
        elementHeartActive.addEventListener('mouseover', () => elementHeart.src = "Assets/icon-fav-hover.svg")
        elementHeartActive.addEventListener('mouseout', () => elementHeart.src = "Assets/icon-fav.svg")

        /* SAVE LIKED HEART, USING THE ID OF THE HEART */
        elementHeart.addEventListener("click", () => { saveLikedHeart(elementHeart.nextElementSibling.nextElementSibling.innerText) })
        elementHeartActive.addEventListener("click", () => { saveLikedHeart(elementHeart.nextElementSibling.nextElementSibling.innerText) })
    }


    // /* LET'S SEE IF SOMEONE LIKED / DISLIKED YOU */
    gifHeartPressed()
}

const saveLikedHeart = (gifInfo) => {

    let saveGifInfo = JSON.parse(gifInfo)
    let gifElement = document.getElementsByClassName(saveGifInfo.id)[0]

    gifElement.classList.toggle("display")
    gifStorage(saveGifInfo, favlist, "favorites")
}


const trashButton = () => {

    const trash = document.getElementsByClassName('trash')
    /* TRASH HOVER */
    for (let i = 0; i < trash.length; i++) {
        iconchange(trash[i], 'mouseover', "Assets/icon-trash-hover.svg");
        iconchange(trash[i], 'mouseout', "Assets/icon-trash-normal.svg");

        trash[i].addEventListener('click', () => {

            let eraseElement = document.getElementsByClassName("favoritescard")[i]
            eraseElement.style.display = "none"

            if (document.body.id === "favoritos" || document.body.id === "home") {
                gifStorage(JSON.parse(trash[i].nextElementSibling.nextElementSibling.innerText), favlist, "favorites")
            } else {
                gifStorage(JSON.parse(trash[i].nextElementSibling.nextElementSibling.innerText), myGifList, "misgifos")

            }
        })
    }

}

const downloadButton = (gifElementIdClass) => {

    let elementId = document.getElementsByClassName(gifElementIdClass)[0]
    let elementDownload = elementId.previousElementSibling.previousElementSibling

    /* CHANGE ICON ON HOVER */
    iconchange(elementDownload, 'mouseover', "Assets/icon-download-hover.svg")
    iconchange(elementDownload, 'mouseout', "Assets/icon-download.svg")

    elementDownload.addEventListener('click', () => downloadGif(elementDownload.nextElementSibling.nextElementSibling.nextElementSibling.innerText))

}

const downloadGif = async (gifInfo) => {

    let downloadGifInfo = JSON.parse(gifInfo)
    let id = downloadGifInfo.id
    let dtitle = downloadGifInfo.title

    if (dtitle != undefined) {

        //create new a element
        let a = document.createElement('a')
        let realid = id.trim()
        let title = dtitle
        // get image as blob
        let response = await fetch(`https://media.giphy.com/media/${realid}/giphy.gif?rid=giphy.gif`)
        let file = await response.blob()

        a.download = title
        a.href = window.URL.createObjectURL(file)
        //click on element to start download
        a.click()
    }
}


const maxButton = (gifElementIdClass) => {

    let elementId = document.getElementsByClassName(gifElementIdClass)[0]
    let elementMax = elementId.previousElementSibling.previousElementSibling.previousElementSibling

    iconchange(elementMax, 'mouseover', "Assets/icon-max-hover.svg")
    iconchange(elementMax, 'mouseout', "Assets/icon-max-normal.svg")

    elementMax.addEventListener('click', () => maxPrint(elementId,elementMax))
}

const maxPrint = (elementId, elementMax) => {

        /* HIDE SCROLLBAR */
        document.documentElement.setAttribute('style', 'overflow-y:hidden;')

        let infoStorage = JSON.parse(elementMax.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText)

        const [titlefinal, userfinal] = titlecreator(infoStorage.title)

        let gifMaxMainContainer = document.createElement('div')
        gifMaxMainContainer.className = "gifMaxContainer"
        gifMaxMainContainer.style = `position: fixed; z-index: 900;
            display:flex; justify-content:center; align-items:center;
            inset:0 ; background-color: rgba(0, 0, 0, 0.5);`

        let card = `
                <div style="width:700px; height:80%; background-color:white; display:flex;justify-content:center; align-items:center; z-index:1000; position:relative; max-width:100vw; border-radius:10px;">
                    <img class="returnButton" src="Assets/closewhite.svg" alt="Return button" style="position:fixed; right:20px; top:20px; height:20px; width:20px; z-index:900;cursor:pointer;">
                    <img class="card-interaction2" style="position:absolute; right:100px; bottom:65px; cursor:pointer;" src="Assets/icon-download.svg"> 
                    <img src="Assets/icon-fav.svg" style="position:absolute; right:136.5px; bottom:64px;"> 

                    <img class="card-max-active ${infoStorage.id}max" style="" src="Assets/icon-fav-active.svg"> 
                    <p class="gifInfo" style="display:none;"> ${JSON.stringify(infoStorage)} </p>
                    <div class="cardtitles"> 
                        <h4 style="position:absolute; left:100px; bottom:80px;">${userfinal}</h4>
                        <p  style="position:absolute; left:100px; bottom:55px;">${titlefinal}</p>
                    </div>
                    <img class="gifMaxImg" src="${infoStorage.images.downsized_medium.url}" alt="${titlefinal}" style="width:unset; height:unset; max-height:62%; margin-bottom:7%; max-width:90% ; "> 
                </div>
        `
        gifMaxMainContainer.innerHTML = card
        document.body.appendChild(gifMaxMainContainer)

        downloadButton(infoStorage.id+'max')
        heartButton(infoStorage.id+'max')

        // HEART INTERACTION
        let heartInteractionMax = document.getElementsByClassName(infoStorage.id+'max')[0]
        const displayHeart = () => {heartInteractionMax.classList.toggle('display')}

        if ( elementId.classList.contains('display'))
            displayHeart()

        // IF TRASH USER CAN'T DISLIKE INSIDE MAX
        if ( elementId.previousElementSibling.classList.contains('trash')){
            heartInteractionMax.style.display ="none"
            heartInteractionMax.previousElementSibling.style.display ="none"
        }
        
        heartInteractionMax.previousElementSibling.addEventListener('click',displayHeart)
        heartInteractionMax.addEventListener('click',displayHeart)


        // RETURN ON X CLICK
        let returnMaxButton = document.getElementsByClassName('returnButton')[0]

        const closeMax = () => {
            document.body.removeChild(document.body.lastElementChild)
            document.documentElement.setAttribute('style', 'overflow-y:unset;')
        }

        returnMaxButton.addEventListener('click', closeMax)
    
}