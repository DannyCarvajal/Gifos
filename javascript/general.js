/* API KEYS */
const APIkey1 = "aJ2dqTQO1FnTqFW200cIokXq4VwdVYTl"

function iconchange(name, method, src) {
    
    name.addEventListener(`${method}`, ()=> name.src = src);
}


/* CHANGE SVG BETWEEN DARK AND LIGHT MODE */
function svgChange(nombre, src1, src2) {
    (contador % 2 == 0) ? nombre.setAttribute('src', `${src1}`) : nombre.setAttribute('src', `${src2}`);
}


/* CHANGE METHODS BETWEEN DARK AND LIGHT MODE */
function methodChange(nombre, metodo, normal, night) {

    if (metodo == 1) {
        metodo = 'mouseover';
    } else if (metodo == 2) {
        metodo = 'mouseout'
    } else if (metodo == 3) {
        metodo = 'click';
    }

    nombre.addEventListener(`${metodo}`, () => {
        svgChange(nombre, `${normal}`, `${night}`)
    })
}


/* STORAGE FAVORITE GIFS */

var favlist
!function initFavStorage() {
    if (JSON.parse(localStorage.getItem("favorites"))) {
        /* IF THERE'S SOMETHING INSIDE */
        favlist = JSON.parse(localStorage.getItem("favorites"))
    } else {
        /* IF THE FAV LIST IS EMPTY */
        favlist = []
    }
}()

/* STORAGE MY OWN GIFS */
var myGifList
!function initMyGifStorage() {

    if (JSON.parse(localStorage.getItem("misgifos"))) {
        myGifList = JSON.parse(localStorage.getItem("misgifos"))
    } else {
        myGifList = []
    }

}()