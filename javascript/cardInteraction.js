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

const heart = document.getElementsByClassName(`card-interaction3`)
const heartactive = document.getElementsByClassName(`card-interaction3-active`)

const heartButton = () => {

    for (let i = 0; i < heart.length; i++) {

        if ( !heart[i].classList.contains("trash")){
        /* HEART ICON ON HOVER */
        iconchange(heart[i], 'mouseover', "Assets/icon-fav-hover.svg")
        iconchange(heart[i], 'mouseout', "Assets/icon-fav.svg")

        /* STILL HOVER WHILE MOUSEOVER IN INNER HEART */
        heartactive[i].addEventListener('mouseover', () => heart[i].src = "Assets/icon-fav-hover.svg")
        heartactive[i].addEventListener('mouseout', () => heart[i].src = "Assets/icon-fav.svg")

        /* SAVE LIKED HEART, USING THE ID OF THE HEART */
        heart[i].addEventListener("click", () => { saveLikedHeart(heart[i].nextElementSibling.nextElementSibling.innerText) })
        heartactive[i].addEventListener("click", () => { saveLikedHeart(heart[i].nextElementSibling.nextElementSibling.innerText) })
        }
    }

    /* LET'S SEE IF SOMEONE LIKED / DISLIKED YOU */
    gifHeartPressed()
}

const saveLikedHeart = (gifInfo) => {

    let saveGifInfo = JSON.parse(gifInfo)
    let gifElement = document.getElementsByClassName(saveGifInfo.id)[0]

    gifElement.classList.toggle("display")
    gifStorage(saveGifInfo,favlist,'favorites')
}


const trashButton = () => {
    
    const trash = document.getElementsByClassName('trash')
    /* TRASH HOVER */
    for (let i = 0; i < trash.length; i++) {
        iconchange(trash[i], 'mouseover', "Assets/icon-trash-hover.svg");
        iconchange(trash[i], 'mouseout', "Assets/icon-trash-normal.svg");

        trash[i].addEventListener('click',()=> {

            let eraseElement = document.getElementsByClassName("favoritescard")[i]
            eraseElement.style.display = "none"

            if ( document.body.id === "home"){
                gifStorage(JSON.parse(trash[i].nextElementSibling.nextElementSibling.innerText),favlist,"favorites")
            } else {
                gifStorage(JSON.parse(trash[i].nextElementSibling.nextElementSibling.innerText),myGifList,"misgifos")
                
            }
        })
    }

}

const downloadcards = () => {

    let download = document.getElementsByClassName(`card-interaction2`);

    for (let i = 0; i < download.length; i++) {
        /* CHANGE ICON ON HOVER */
        iconchange(download[i], 'mouseover', "Assets/icon-download-hover.svg")
        iconchange(download[i], 'mouseout', "Assets/icon-download.svg")

        download[i].addEventListener('click', () => downloadGif(download[i].nextElementSibling.nextElementSibling.nextElementSibling.innerText))
    }

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


const max = document.getElementsByClassName(`card-interaction1`)

const maxButton = () => {


    for (let i = 0; i < max.length; i++) {
        iconchange(max[i], 'mouseover', "Assets/icon-max-hover.svg");
        iconchange(max[i], 'mouseout', "Assets/icon-max-normal.svg");

        max[i].addEventListener('click', () => {


            let infoStorage = JSON.parse(max[i].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText)
            let maxbackground = document.getElementsByClassName('maxbackground')[0]

            const [titlefinal, userfinal] = titlecreator(infoStorage.title)

            let card = `
                <img class="returnButton" src="Assets/close.svg" alt="Return button">
                <div style="position:fixed;" class= "gifMaxContainer">
                    <img src="Assets/icon-download.svg"> 
                    <img src="Assets/icon-fav.svg"> 
                    <img src="Assets/icon-fav-active.svg"> 
                    <p class="gifInfo" style="display:none;"> ${JSON.stringify(infoStorage)} </p>
                    <div class="cardtitles"> 
                        <h4>${userfinal}</h4>
                        <p >${titlefinal}</p>
                    </div>
                </div>
        `
            // <img class="gifMaxImg" src="${infoStorage.images.downsized_medium.url}" alt="${titlefinal}"> 

            document.body.innerHTML += card


            /* BACKGROUND */
            maxbackground.setAttribute('style', 'display:unset;')
            /* HIDE SCROLLBAR */
            document.documentElement.setAttribute('style', 'overflow-y:hidden;')


            // /* STYLES IMG MAX */
            let maxImg = document.getElementsByClassName('gifMaxImg')[0]
            maxImg.setAttribute('style', `
            position:fixed;
            top:17%; 
            left:27%;
            width:695px; 
            height: 385px;  
            z-index:500;
            `)

            let returnMaxButton = document.getElementsByClassName('returnButton')[0]
            returnMaxButton.setAttribute('style', `cursor:pointer;z-index: 500;width:20px; height:20px; position: fixed; top:20px; right:20px;`)

            returnMaxButton.addEventListener('click', () => {

                document.body.removeChild(document.body.lastElementChild)
                document.body.removeChild(document.body.lastElementChild)
                maxbackground.setAttribute('style', 'display:none;')
                document.documentElement.setAttribute('style', 'overflow-y:unset;')
            })
        })

    }
}