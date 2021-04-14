/* API KEYS */
const APIkey1 = "aJ2dqTQO1FnTqFW200cIokXq4VwdVYTl"
// const APIkey2 = "bqYEWvblUOmRhEaNR9NoUmWCxOFmXQm0"
// const APIkey3 = "sy5TZIKLHt1Zm0hyBPoK3toaaoxK0hHT"
// const APIkey4 = "CXMg8k4qSHCnGhujyJ9Y77WT29KqScTx"

function iconchange(name, method, src) {

    name.addEventListener(`${method}`, metododeCambio);

    function metododeCambio() {
        name.setAttribute('src', `${src}`)
    }
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