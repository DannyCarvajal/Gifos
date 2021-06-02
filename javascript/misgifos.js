

/*--------------- CHECK IF THE LOCAL IS EMPTY OR NOT AND ASSIGN A VARIABLE----------------------*/
var idlist
!function initlocalstorage() {

    if (JSON.parse(localStorage.getItem("misgifos"))) {
        /* IF THERE'S SOMETHING INSIDE */
        idlist = JSON.parse(localStorage.getItem("misgifos"))
        console.log('here with '+idlist)
    } else {
        /* IF THE FAV LIST IS EMPTY */
        console.log(' or here')
        idlist = []
    }

}()


/* CREATE THE CARDS INSIDE THE FAV SECTION*/
if (idlist.length !==0) {

    console.log('join print')

    let container = document.getElementsByClassName('containermisgifosabroad')[0]

    /* REMOVE PREVIOUS CONTAINER ITEMS */
    for (let i = 0; i < 2; i++) {
        container.removeChild(container.lastElementChild)
    }

    cardGif(idlist, 'response', 2, 'misgifoscard', 0, idlist.length)

}

const printMyGif = () => {

    
}


function misgifosstorage(urlmisgifos){

    console.log('quiero eliminar a '+urlmisgifos)

    let comparisonarray = []

    for (let i = 0; i < idlist.length; i++) {

        var divisionsrctitle = idlist[i].split("idcardgif")
        comparisonarray.push(divisionsrctitle[1].trim())
    }


    console.log( 'comparison array es '+ comparisonarray)

    let comparison2 = urlmisgifos.split('idcardgif')
    var idurlmisgifos = comparison2[1].trim()

    console.log('el id del gifo que quireo eliminar es '+idurlmisgifos)

    /* ERASE IT FROM THE LOCAL  */
    var erase = comparisonarray.indexOf(idurlmisgifos)
    console.log('el z index del gif que quiero eliminar es igual a '+erase)
    idlist.splice(erase, 1)
    console.log('la nueva lista es '+ idlist)
    localStorage.setItem('misgifos', JSON.stringify(idlist))
}
