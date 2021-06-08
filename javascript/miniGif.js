/* THE FAV GIF AND MYGIF HAVE THE SAME SIZE AND CLASSES, THEY'RE 'MINI GIFS' */

const printMiniTrashGif = (gifList,containername) => {
    
    let container = document.getElementsByClassName(containername)[0]

    /* PRINT FAV GIFS */
        for (let i = 0; i < gifList.length ; i++) {

            const [titlefinal, userfinal] = titlecreator(gifList[i].title)

            let cardModel = `
                <div class= "favoritescard">
                    <div class="cardoptions cardoptionshover">
                        <img class="card card-interaction1" src="Assets/icon-max-normal.svg"> 
                        <img class="card card-interaction2" src="Assets/icon-download.svg"> 
                        <img class="card card-interaction3 trash" src="Assets/icon-trash-normal.svg"> 
                        <img class="card card-interaction3-active" src="Assets/icon-fav-active.svg" style="display:none;"> 
                        <p class="gifInfo" style="display:none;"> ${JSON.stringify(gifList[i])} </p>
                        <div class="cardtitles"> 
                            <h4>${userfinal}</h4>
                            <p class="titlecurrentgif" >${titlefinal}</p>
                        </div>
                        <div class="overlay-colorselect8"> </div>
                    </div>
                    <img class="response" src="${gifList[i].images.downsized_medium.url}" alt="${titlefinal}"> 
                </div>
            `
            container.innerHTML+= cardModel
        }
        
    onHoverCard('miniSize')
    trashButton()
    maxButton()
}


/* CREATE THE CARDS INSIDE THE FAV SECTION*/
if (favlist.length !== 0 && document.body.id == "favoritos") {    
    
    const container = document.getElementsByClassName('containerfavabroad')[0]
    /* REMOVE PREVIOUS CONTAINER ITEMS */
    for (let i = 0; i < 2; i++) {
        container.removeChild(container.lastElementChild)
    }

    printMiniTrashGif(favlist,'cardfavcontainer')
}

/* CREATE THE CARDS INSIDE THE MYGIF SECTION */
if (myGifList.length !== 0 && document.body.id == "misgifos") {

    let container = document.getElementsByClassName('containermisgifosabroad')[0]

    /* REMOVE PREVIOUS CONTAINER ITEMS */
    for (let i = 0; i < 2; i++) {
        container.removeChild(container.lastElementChild)
    }

    printMiniTrashGif(myGifList, 'misgifoscontainer')
}