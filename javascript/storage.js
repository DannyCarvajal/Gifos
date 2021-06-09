/* ADD OR REMOVE FROM THE LOCAL STORGE*/

const gifStorage = (gifInfo,varClass,storeClass) => {
    
    /*CREATE ID LIST COMPARE WITH THE ID OF THE GIF*/
    if ( varClass.length > 0){
        var idList = gifIdList(varClass)
    }
    
    /* IF THE LOCAL ISN'T EMPTY AND MATCHES WITH A PREVIOUS ID ERASE IT, OTHERWISE ADD IT */
    if ( varClass.length > 0 && idList.includes(gifInfo.id)){
        let gifIdPosition = idList.indexOf(gifInfo.id)
        varClass.splice(gifIdPosition, 1)
        localStorage.setItem(storeClass, JSON.stringify(varClass))
        console.log(varClass)
    } else {
        varClass.push(gifInfo)
        localStorage.setItem(storeClass, JSON.stringify(varClass))
        console.log(varClass)
    }

}

/* ARRAY WITH JUST THE ID'S OF THE FAVLIST */
const gifIdList = (varClass) => {
    let savedGifsId = []
    varClass.forEach( likedGif => {savedGifsId.push(likedGif.id)})
    return savedGifsId
}

/* LIKE OR UNLIKE A HEART */
const gifHeartPressed = () => {

    let heartactive = document.getElementsByClassName(`card-interaction3-active`)
    let idList = gifIdList(favlist)

    /* IF YOU HAVE A HEART LET'S SEE IF SOMEONE DISLIKED YOU */
    for (let i = 0; i < heartactive.length; i++) {
        if (heartactive[i].classList.contains('display') && !idList.includes(heartactive[i].classList[2])){
            heartactive.classList.toggle("display")
            console.log(' I disliked you '+i)
        }
    }

    /* IF YOU ARE IN THE LIST AND YOU DON'T HAVE A HEART LET'S PRESS IT */

    for (let i = 0 ; i < idList.length; i++) {
        let gifCard = document.getElementsByClassName(idList[i])[0]

        if ( gifCard !== undefined && !gifCard.classList.contains('display')){
            gifCard.classList.toggle('display')
        }
    }

}