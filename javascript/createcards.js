
function createCardModel(json, majorclass, imgclass) {

    let imgPathtrending = json.images.downsized_medium.url
    let gifId = json.id

    /* DEFINIR TITULO Y CREADOR */
    const [titlefinal, userfinal] = titlecreator(json.title)

    let infoStorage = `
    {  "title": "${json.title}",
        "id": "${gifId}",
        "images":{
            "downsized_medium":{
                "url": "${imgPathtrending}"
            }
        }
    }`

    return card = `<div class= "${majorclass}">
        <div class="cardoptions cardoptionshover">
            <img class="card card-interaction1" src="Assets/icon-max-normal.svg"> 
            <img class="card card-interaction2" src="Assets/icon-download.svg"> 
            <img class="card card-interaction3 " src="Assets/icon-fav.svg"> 
            <img class="card card-interaction3-active ${gifId}" src="Assets/icon-fav-active.svg"> 
            <p class="gifInfo" style="display:none;"> ${infoStorage} </p>
            <div class="cardtitles"> 
                <h4>${userfinal}</h4>
                <p class="titlecurrentgif" >${titlefinal}</p>
            </div>
            <div class="overlay-colorselect"> </div>
        </div>
            <img class="${imgclass}" src="${imgPathtrending}" alt="${titlefinal}"> 
        </div>
        `
}


/* RETURN THE TITLE AND NAME OF THE USER */
const titlecreator = (title) => {

    if (title.includes('by')) {
        let dividiendoeltitulo = title.split("by")
        let titlefinal = dividiendoeltitulo[0].replace('GIF', '')
        let userfinal = dividiendoeltitulo[1].trim(0)
        return [titlefinal, userfinal]

    } else {
        let titlefinal = title.replace('GIF', '')
        let userfinal = " "
        return [titlefinal, userfinal]
    }

}


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

const heart = document.getElementsByClassName(`card-interaction3`);
const heartactive = document.getElementsByClassName(`card-interaction3-active`);
const trash = document.getElementsByClassName('trash')


const heartButton = () => {

    for (let i = 0; i < heart.length; i++) {

        /* HEART ICON ON HOVER */
        iconchange(heart[i], 'mouseover', "Assets/icon-fav-hover.svg")
        iconchange(heart[i], 'mouseout', "Assets/icon-fav.svg")

        /* STILL HOVER WHILE MOUSEOVER IN INNER HEART */
        heartactive[i].addEventListener('mouseover', ()=> heart[i].src = "Assets/icon-fav-hover.svg")
        heartactive[i].addEventListener('mouseout', ()=> heart[i].src = "Assets/icon-fav.svg")

        /* SAVE LIKED HEART, USING THE ID OF THE HEART */
        heart[i].addEventListener("click", () => { saveLikedHeart(heart[i].nextElementSibling.nextElementSibling.innerText) })
        heartactive[i].addEventListener("click", () => { saveLikedHeart(heart[i].nextElementSibling.nextElementSibling.innerText) })
    }

    /* FAVORITE AND MY GIF USES TRASH ICON INSTEAD OF HEART */
    if (document.body.id !== "home") {
        /* TRASH HOVER */
        for (let i = 0; i < trash.length; i++) {
            iconchange(trash[i], 'mouseover', "Assets/icon-trash-hover.svg");
            iconchange(trash[i], 'mouseout', "Assets/icon-trash-normal.svg");
        }
    }

}

const saveLikedHeart = (gifInfo) => {

    let saveGifInfo = JSON.parse(gifInfo)
    let gifElement = document.getElementsByClassName(saveGifInfo.id)[0]

    console.log(gifElement);
    gifElement.classList.toggle("display")

    // if (document.body.id == "misgifos") {
    //     misgifosstorage(saveGifInfo)
    // } else {
    //     favoritesstorage(saveGifInfo)
    // }

}


/* SEND THE HEART CHANGES TO THE LOCAL */
function sendHeartLocal(i) {

    if (document.body.id != "home" && heartactive[i].previousElementSibling.classList.contains('trash')) {
        trash[i].parentElement.parentElement.setAttribute('style', 'display:none;')
    }

    if (heartactive[i].classList.contains('maxcard')) {


        /* INFORMATION OF THE CARD CLICKED  */
        let titlefavgif = heartactive[i].parentElement.nextElementSibling.innerText
        let userfavgif = heartactive[i].parentElement.nextElementSibling.nextElementSibling.innerText
        let fulltitle = titlefavgif + ' by ' + userfavgif
        /* GIF ID */
        let gifid = heartactive[i].parentElement.nextElementSibling.nextElementSibling.nextElementSibling.innerText
        /* URL OF THE IMAGE */
        let urlsrc = heartactive[i].previousElementSibling.previousElementSibling.previousElementSibling.src
        var urlfav = urlsrc + ' title ' + fulltitle + 'idcardgif' + gifid

        heartactive[i].classList.toggle("display")

        favoritesstorage(urlfav)


    } else {

        /* INFORMATION OF THE CARD CLICKED  */
        let titlefavgif = titlecrtgif[i].lastElementChild.innerText
        let userfavgif = titlecrtgif[i].firstElementChild.innerText
        let title = `${titlefavgif} GIF by ${userfavgif}`
        /* GIF ID */
        let id = titlecrtgif[i].nextElementSibling.innerText.trim()
        /* URL OF THE IMAGE */
        let url = titlecrtgif[i].parentElement.parentElement.lastElementChild.src
        var urlfav = url + ' title ' + title + 'idcardgif' + id



        console.log('this is the object ', fav);

        heartactive[i].classList.toggle("display")

        if (document.body.id == "misgifos") {
            misgifosstorage(urlfav)
        } else {
            favoritesstorage(urlfav)
        }

    }


}


function downloadcards(number, maxid, maxtitle) {

    let download = document.getElementsByClassName(`card${number}-interaction2`);

    for (let i = 0; i < download.length; i++) {

        if (download[i].classList.contains('card3') || download[i].nextElementSibling.classList.contains('maxcard')) {

            download[i].addEventListener('click', () => downloadGif(maxtitle, maxid))

        } else {

            let downloadid = download[i].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText
            let downloadtitle = download[i].nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.innerText
            download[i].addEventListener('click', () => downloadGif(downloadid, downloadtitle))
        }


        iconchange(download[i], 'mouseover', "Assets/icon-download-hover.svg");
        iconchange(download[i], 'mouseout', "Assets/icon-download.svg");

    }


}



async function downloadGif(id, dtitle) {

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

            document.body.innerHTML+= card
            console.log(card);


            /* BACKGROUND */
            maxbackground.setAttribute('style','display:unset;')
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
                maxbackground.setAttribute('style','display:none;')
                document.documentElement.setAttribute('style', 'overflow-y:unset;')
                console.log(maxbackground);
                // localfavpressed()

            })
        })

    }
}


