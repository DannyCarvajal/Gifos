
function createCardModel(json, majorclass, imgclass) {

    let imgPathtrending = json.images.downsized_medium.url
    let gifId = json.id

    /* DEFINIR TITULO Y CREADOR */
    const [titlefinal, userfinal] = titlecreator(json.title)

    let infoStorage = modelStorage(json)

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

const modelStorage = (json) => {

    return infoStorage = `
    {  "title": "${json.title}",
        "id": "${json.id}",
        "images":{
            "downsized_medium":{
                "url": "${json.images.downsized_medium.url}"
            }
        }
    }`

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
