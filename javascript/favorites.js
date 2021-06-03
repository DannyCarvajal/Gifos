
/*--------------- CHECK IF THE LOCAL IS EMPTY OR NOT AND ASSIGN A VARIABLE----------------------*/
var favlist
!function initlocalstorage() {

    if (JSON.parse(localStorage.getItem("favorites"))) {
        /* IF THERE'S SOMETHING INSIDE */
        favlist = JSON.parse(localStorage.getItem("favorites"))
    } else {
        /* IF THE FAV LIST IS EMPTY */
        favlist = []
    }

}()


/* CREATE THE CARDS INSIDE THE FAV SECTION*/
if (favlist.length !== 0 && document.body.id == "favoritos") {
    
    const container = document.getElementsByClassName('containerfavabroad')[0]

    /* REMOVE PREVIOUS CONTAINER ITEMS */
    for (let i = 0; i < 2; i++) {
        container.removeChild(container.lastElementChild)
    }

    cardGif(favlist, 'response', 2, 'favoritescard', 0, favlist.length)

}
/*--------------------------------------------------------------------------------------------*/


/* ADD OR REMOVE FROM THE LOCAL STORGE*/
function favoritesstorage(urlfav) {

    /* COMPARE JUST BETWEEN THE ID BECAUSE THE CDI OF THE URL CHANGES EVEN BEING THE SAME PICTURE*/

    if (favlist.length !== 0) {

        var comparisonarray = favidlist()
        let comparison2 = urlfav.split('idcardgif')
        var idurlfav = comparison2[1].trim()
    }

    /* IF THE LOCAL ISN'T EMPTY AND MATCHES WITH A PREVIOUS ID ERASE IT, OTHERWISE ADD IT */
    if (favlist.length !== 0 && comparisonarray.includes(idurlfav)) {

        var z = comparisonarray.indexOf(idurlfav)
        favlist.splice(z, 1)
        localStorage.setItem('favorites', JSON.stringify(favlist))

    } else {

        favlist.push(urlfav)
        localStorage.setItem('favorites', JSON.stringify(favlist))
    }

}


/* REMAIN THE FAVORITE PRESSED OR UNCLICK IT DEPENDING IF YOUR'RE IN THE LOCAL */
function localfavpressed() {

    let images = document.getElementsByClassName('gifid')
    var infosrc = favidlist()

    for (let i = 0; i < images.length; i++) {

        /* PRESS THE HEART IF IT'S IN THE LOCAL STORAGE */
        let heartactive = images[i].previousElementSibling.previousElementSibling
        let imageid = images[i].innerText.trim()


        if (infosrc.includes(imageid)) {

            /* IF CARD IS IN THE LOCAL BUT ALREADY HAVE THE HEART */
            if (heartactive.classList.contains('display')) {
                /* IF CARD IS IN THE LOCAL WITHOUT HEART PRESS IT */
            } else {
                heartactive.classList.toggle("display")
            }

        }
        /* IF YOU ARE NOT IN THE LOCAL BUT YOU ARE PRESSED, UNCLICK THE HEART*/
        else if (heartactive.classList.contains('display')) {
            heartactive.classList.toggle("display")
        }

    }
}

/* ARRAY WITH JUST THE ID'S OF THE FAVLIST */
function favidlist() {

    let infosrc = []

    for (let i = 0; i < favlist.length; i++) {

        if (favlist[i].includes('idcardgif')) {
            var divisionsrctitle = favlist[i].split("idcardgif")
            infosrc.push(divisionsrctitle[1].trim())
        } else {
            infosrc.push(favlist[i])
        }

    }

    return infosrc;
}




