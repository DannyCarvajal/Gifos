
/* GENERAL FUNCTION TO CREATE CARDS  */
function cardGif(json, imageclass, number, divclass, aumento = 0, aumento2 = 12, title) {

    for (let i = 0 + aumento; i < aumento2; i++) {

        console.log('1')

        if (divclass === "favoritescard" || divclass === "misgifoscard") {

        console.log('2')


            if (json[i].includes('title')) {
                var division1 = json[i].split("title")
                var imgPathtrending = division1[0]
                var division2 = division1[1].split("idcardgif")
                var title = division2[0].trim(0)
                var id = division2[1]

                /* ID OF THE GIF */
                // var gifid = document.createElement("p")
                // gifid.className = "gifid"
                // gifid.setAttribute('style', 'display:none;')
                // gifid.innerText = id
            }


            // var card3 = document.createElement("img")
            // card3.setAttribute("src", "Assets/icon-trash-normal.svg")
            // card3.className = `card${number} card${number}-interaction3 trash`

            // var card4 = document.createElement("img")
            // card4.setAttribute('style', 'display:none;')
            // card4.setAttribute("src", "Assets/icon-fav-active.svg")
            // card4.className = `card${number} card${number}-interaction3-active`

            // /* FAVORITES OVERLAT REQUIRE AN EXTRA 8PX BOTTOM */
            // var overlay = document.createElement("div")
            // overlay.className = "overlay-colorselect8"


            var card3src= "Assets/icon-trash-normal.svg"
            var card3class= `card${number} card${number}-interaction3 trash`
            var card4src= "Assets/icon-fav-active.svg"
            var card4class= `card${number} card${number}-interaction3-active`
            var overlayclass= "overlay-colorselect8"

        } else {

            console.log('2')

            var imgPathtrending = json.data[i].images.downsized_medium.url
            var title = json.data[i].title

            // /* ID OF THE GIF */
            // var gifid = document.createElement("p")
            // gifid.className = "gifid"
            // gifid.setAttribute('style', 'display:none;')
            // gifid.innerText = json.data[i].id

            
            // var card3 = document.createElement("img")
            // card3.setAttribute("src", "Assets/icon-fav.svg")
            // card3.className = `card${number} card${number}-interaction3`
            
            // var card4 = document.createElement("img")
            // card4.setAttribute("src", "Assets/icon-fav-active.svg")
            // card4.className = `card${number} card${number}-interaction3-active`
            
            // var overlay = document.createElement("div")
            // overlay.className = "overlay-colorselect"
            
            var card3src= "Assets/icon-fav.svg"
            var card3class= `card${number} card${number}-interaction3`
            var card4src= "Assets/icon-fav-active.svg"
            var card4class=  `card${number} card${number}-interaction3-active`
            var overlayclass= "overlay-colorselect"
            var id= json.data[i].id
        }

        /* DEFINIR TITULO Y CREADOR */
        if (title.includes('by')) {
            var dividiendoeltitulo = title.split("by")
            var titlefinal = dividiendoeltitulo[0].replace('GIF', '')
            var userfinal = dividiendoeltitulo[1].trim(0)
        } else {
            var titlefinal = title.replace('GIF', '')
            var userfinal = " "
        }


        // /* ADD THE IMAGES TO THE CONTAINER */
        // var generaldiv = document.createElement("div")
        // generaldiv.className = divclass, `tarjeta${i}`

        // /* CREATION OF CARDS */
        // var cardoptions = document.createElement("div")
        // cardoptions.className = `cardoptions cardoptionshover${number}`


        // var card1 = document.createElement("img")
        // card1.setAttribute("src", "Assets/icon-max-normal.svg")
        // card1.className = `card${number} card${number}-interaction1`

        // var card2 = document.createElement("img")
        // card2.setAttribute("src", "Assets/icon-download.svg")
        // card2.className = `card${number} card${number}-interaction2`

        // var cardtitle = document.createElement("div")
        // cardtitle.className = `card${number} card${number}-info`

        // var username = document.createElement("h4")
        // username.innerText = userfinal

        // /* TITLE AND DESCRIPTION OF THE GIF */
        // var giftitle = document.createElement("p");
        // giftitle.className = "titlecurrentgif"
        // giftitle.innerText = titlefinal

        // cardtitle.appendChild(username)
        // cardtitle.appendChild(giftitle)

        // /* APPEND INTO THE CARD CONTAINER */
        // cardoptions.appendChild(card1)
        // cardoptions.appendChild(card2)
        // cardoptions.appendChild(card3)
        // cardoptions.appendChild(card4)
        // cardoptions.appendChild(cardtitle)
        // cardoptions.appendChild(gifid)
        // cardoptions.appendChild(overlay)

        // var trendingImage = document.createElement("img")
        // trendingImage.setAttribute("src", imgPathtrending)
        // trendingImage.setAttribute("alt", titlefinal)
        // trendingImage.className = imageclass

        // /* APPEND EVERYTHING INTO THE GEN DIV */
        // generaldiv.appendChild(cardoptions)
        // generaldiv.appendChild(trendingImage)

        console.log('3')


        let generaldiv= `
            <div class= "${divclass} tarjeta${i}">
                <div class="cardoptions cardoptionshover${number}">
                    <img class="card${number} card${number}-interaction1" src="Assets/icon-max-normal.svg"> 
                    <img class="card${number} card${number}-interaction2" src="Assets/icon-download.svg"> 
                    <img class="${card3class}" src="${card3src}"> 
                    <img class="${card4class}" src="${card4src}"> 
                    <div class="card${number} card${number}-info"> 
                        <h4>${userfinal}</h4>
                        <div class="titlecurrentgif" >${titlefinal}</div>
                    </div>
                </div>
                <img class="${imageclass}" src="${imgPathtrending}" alt="${titlefinal}"> 
                <p class="gifid" style="display:none;"> ${id} </p>
                <div class="${overlayclass}"> </div>
            </div>
        `

        console.log(generaldiv);


        if (number == 1) {

            var cards = document.getElementsByClassName("cards")[0]
            cards.innerHTML+= generaldiv

        } else if (divclass == "favoritescard") {

            let container = document.getElementsByClassName('cardfavcontainer')[0]
            container.innerHTML+= generaldiv

        } else if (divclass == "misgifoscard"){

            let container = document.getElementsByClassName('misgifoscontainer')[0]
            container.innerHTML+= generaldiv

        } else {
            let container = document.getElementsByClassName('containerapiresult')[0]
            container.innerHTML+= generaldiv
        }
    }


    hoverCardOptions(imageclass, number)
    cardoptionsfuc(number, aumento)

    /* EVERY TIME A CARD IS CREATED IS CHECKED  */
    if ( divclass !== "misgifoscard")
    localfavpressed()

}



/* ON HOVER SHOW CARD OPTIONS  */
function hoverCardOptions(imgClass, number) {

    let imgonhoverClass = document.getElementsByClassName(imgClass)
    let cardgeneral = document.getElementsByClassName(`card${number}`)


    /* HOVER ON PURPLE  */
    for (let i = 0; i < imgonhoverClass.length; i++) {

        imgonhoverClass[i].addEventListener('mouseover', () => {
            imgonhoverClass[i].previousElementSibling.classList.remove(`cardoptionshover${number}`)
        })

    }

    /* STILL PURPLE HOVER ONMOUSE CARDS */
    for (let i = 0; i < cardgeneral.length; i++) {

        cardgeneral[i].addEventListener('mouseover', () => {
            cardgeneral[i].parentElement.classList.remove(`cardoptionshover${number}`)
        })

    }

    /* REMOVE ON MOUSEOUT */
    for (let i = 0; i < imgonhoverClass.length; i++) {

        imgonhoverClass[i].addEventListener('mouseout', () => {
            imgonhoverClass[i].previousElementSibling.classList.add(`cardoptionshover${number}`)
        })

    }

    for (let i = 0; i < cardgeneral.length; i++) {

        cardgeneral[i].addEventListener('mouseout', () => {
            cardgeneral[i].parentElement.classList.add(`cardoptionshover${number}`)
        })

    }

}


/* HEART, DOWNLOAD AND MAX INTERACTION */
function cardoptionsfuc(number, startin) {

    /* HEART BUTTON FAVORITES AND CARD ICON CHANGE */

    /* HEART */
    let heart = document.getElementsByClassName(`card${number}-interaction3`);
    const heartactive = document.getElementsByClassName(`card${number}-interaction3-active`);

    for (let i = startin; i < heart.length; i++) {
        /* HEART HOVER */
        iconchange(heart[i], 'mouseover', "Assets/icon-fav-hover.svg");
        iconchange(heart[i], 'mouseout', "Assets/icon-fav.svg");

        /* HEART HOVER ON FAV CLICKED HOVER */
        heartactive[i].addEventListener('mouseover', () => {
            heart[i].setAttribute('src', 'Assets/icon-fav-hover.svg')
        })

        heartactive[i].addEventListener('mouseout', () => {
            heart[i].setAttribute('src', 'Assets/icon-fav.svg')
        })

        /* IF FAVORITES USE TRASH INSTEAD OF HEART */
        if (document.body.id !== "home") {

            var trash = document.getElementsByClassName('trash')

            for (let i = 0; i < trash.length; i++) {
                /* TRASH HOVER */
                iconchange(trash[i], 'mouseover', "Assets/icon-trash-hover.svg");
                iconchange(trash[i], 'mouseout', "Assets/icon-trash-normal.svg");
            }

        }
    }

    pressedheart(startin, number)
    maxcards(number)
    downloadcards(number)

}


function pressedheart(startin, number) {

    /* HEART */
    let heart = document.getElementsByClassName(`card${number}-interaction3`);
    const heartactive = document.getElementsByClassName(`card${number}-interaction3-active`);

    /* CORAZÓN MORADO AL OPRIMIR HEART BUTTON */
    for (let i = startin; i < heart.length; i++) {

        heart[i].addEventListener("click", () => {
            sendHeartLocal(i, number)
        })
        heartactive[i].addEventListener("click", () => {
            sendHeartLocal(i, number)
        })
    }
}

/* SEND THE HEART CHANGES TO THE LOCAL */
function sendHeartLocal(i, number) {

    /* HEART */
    const heartactive = document.getElementsByClassName(`card${number}-interaction3-active`)
    let titlecrtgif = document.getElementsByClassName(`card${number}-info`)
    var trash = document.getElementsByClassName('trash')

    if (document.body.id != "home" && heartactive[i].previousSibling.classList.contains('trash')) {
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
        let fulltitle = titlefavgif + ' by ' + userfavgif
        /* GIF ID */
        let gifid = titlecrtgif[i].nextElementSibling.innerText
        /* URL OF THE IMAGE */
        let urlsrc = titlecrtgif[i].parentElement.parentElement.lastChild.src
        var urlfav = urlsrc + ' title ' + fulltitle + 'idcardgif' + gifid

        heartactive[i].classList.toggle("display")

        if ( document.body.id == "misgifos"){
            misgifosstorage(urlfav)
        } else {
            favoritesstorage(urlfav)
        }

    }


}


function downloadcards(number,maxid,maxtitle) {

    let download = document.getElementsByClassName(`card${number}-interaction2`);

    for (let i = 0; i < download.length; i++) {

        if(download[i].classList.contains('card3') || download[i].nextElementSibling.classList.contains('maxcard')){

            download[i].addEventListener('click',()=> downloadGif(maxtitle,maxid))

        } else {
            
            let downloadid= download[i].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText
            let downloadtitle= download[i].nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.innerText
            download[i].addEventListener('click',()=> downloadGif(downloadid,downloadtitle))
        }


        iconchange(download[i], 'mouseover', "Assets/icon-download-hover.svg");
        iconchange(download[i], 'mouseout', "Assets/icon-download.svg");

    }


}



async function downloadGif(id,dtitle) {


    if ( dtitle!= undefined){

    //create new a element
    let a = document.createElement('a')
    let realid = id.trim()
    let title = dtitle
    // get image as blob
    // let response = await fetch(`https://media0.giphy.com/media/${realid}/giphy.gif?cid=e9ff928175irq2ybzjyiuicjuxk21vv4jyyn0ut5o0d7co50&rid=giphy.gif`)
    let response = await fetch(`https://media.giphy.com/media/${realid}/giphy.gif?rid=giphy.gif`)
    let file = await response.blob()

    a.download = title

    a.href = window.URL.createObjectURL(file)
    //click on element to start download
    a.click()

    }

}




function maxcards(number) {

    /* DOWNLOAD AND MAX*/
    let max = document.getElementsByClassName(`card${number}-interaction1`);

    for (let i = 0; i < max.length; i++) {
        iconchange(max[i], 'mouseover', "Assets/icon-max-hover.svg");
        iconchange(max[i], 'mouseout', "Assets/icon-max-normal.svg");

        max[i].addEventListener('click', () => {


            /* 1. CONTACT WITH THE RESOURCES */

            /* TITLE */
            let creator = max[i].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.innerText
            let title = max[i].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.innerText

            /* IMAGE */
            let imagesrc = max[i].parentElement.nextElementSibling.src

            /* PARENT ELEMENT */
            let parent = max[i].parentElement

            /* GIF ID */
            let id = max[i].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText

            /* BACKGROUND */
            let maxbackground = document.getElementsByClassName('maxbackground')[0]

            /* REPOSITION BUTTONS */

            var card2 = document.createElement("img")
            card2.setAttribute("src", "Assets/icon-download.svg")
            card2.className = `card3 card3-interaction2`
            card2.setAttribute('style', 'position: absolute; bottom:15px; right: 25px;cursor:pointer;')

            /* CREATE NEW IMAGE WITH FIXED POSITION */
            let newimage = document.createElement("img")
            newimage.src = imagesrc
            // newimage.setAttribute('style', 'width:100%; height:100%')
            newimage.className= "mobileimagemax"
            // position:fixed; bottom:28%; left:28%;  z-index:100;

            /* Background white */
            maxbackground.setAttribute('style', 'display:unset')
            /* Hide scrollbar */
            document.documentElement.setAttribute('style', 'overflow-y:hidden;')

            /* GENERAL DIV WITH IMAGE AND BUTTON */
            let divimgbutton = document.createElement("div")
            divimgbutton.className= "mobiledivmax"
            // divimgbutton.setAttribute('style', ' position:fixed; top:17%; left:27%;width:695px; height: 385px;  z-index:100;')
            // width:48.62%; height: 55%;
            divimgbutton.appendChild(newimage)
            divimgbutton.appendChild(card2)
            document.body.appendChild(divimgbutton)


            /* CREATE HEART INSIDE OF MAX IF  */
            if (!max[i].nextElementSibling.nextElementSibling.classList.contains('trash')) {

                var card3 = document.createElement("img")
                card3.setAttribute("src", "Assets/icon-fav.svg")
                card3.className = `card3 card3-interaction3 maxcard`
                card3.setAttribute('style', 'position: absolute; bottom:15px; right: 74px; cursor:pointer;')

                var card4 = document.createElement("img")
                card4.setAttribute("src", "Assets/icon-fav-active.svg")
                card4.className = `card3 card3-interaction3-active maxcard`

                divimgbutton.appendChild(card3)
                divimgbutton.appendChild(card4)

                let infosrc = favidlist()
                if (infosrc.includes(id)) {
                    card4.classList.toggle('display')
                }

            }
            downloadcards(3,title,id)
            cardoptionsfuc(3, 0)

            /* ADD TITLES */
            let creatortext = document.createElement("h1")
            creatortext.innerText = creator
            // creatortext.setAttribute('style', 'position:fixed; font-family: "Montserrat", sans-serif; font-size:15px;font-weight:400; bottom:178px; left:28%; z-index:100; color: var(--negro)')
            creatortext.classList= "mobilecreatormax"
            // creatortext.setAttribute('style', 'position:fixed; font-family: "Montserrat", sans-serif; font-size:100%;font-weight:400; bottom:23.5%; left:28%; z-index:100; color: var(--negro)')
            document.body.appendChild(creatortext)

            /* TITLE */
            let titletext = document.createElement("p")
            titletext.innerText = title
            titletext.classList= "mobiletitlemax"
            // titletext.setAttribute('style', 'position:fixed; font-family: "Montserrat", sans-serif; font-size:112.5%; font-weight:700; bottom:20%; left:28%; z-index:100; color: var(--negro)')
            document.body.appendChild(titletext)

            /* GIF ID */
            let imageid = document.createElement("p")
            imageid.innerText = id
            imageid.className = "gifid"
            imageid.setAttribute('style', 'display:none;')
            document.body.appendChild(imageid)


            /* RETURN WHEN X IS PRESSED*/
            let returnx = document.createElement("img")
            returnx.src = "Assets/close.svg"
            returnx.className= "returnx"
            // returnx.setAttribute('style', 'position: absolute; top:-15%; right:-10%; z-index:100; cursor:pointer; height:5%;')
            divimgbutton.appendChild(returnx)

            let eliminate = [divimgbutton, returnx, creatortext, titletext, imageid]

            returnx.addEventListener('click', () => {

                eliminate.forEach(element => {
                    element.parentNode.removeChild(element)
                });

                maxbackground.setAttribute('style', 'display:none;')

                localfavpressed()

                document.documentElement.setAttribute('style', 'overflow-y:unset;')

            })
        })

    }
}


