

const comenzar = document.getElementsByClassName('comenzar')[0]
const paso1 = document.getElementsByClassName('paso1')[0]
const paso2 = document.getElementsByClassName('paso2')[0]
const maintitle = document.getElementsByClassName('maintitle')[0]
const mainp = document.getElementsByClassName('mainp')[0]


var stream = null;

comenzar.addEventListener('click', firststep)


async function firststep() {

    try {

        const constraints = {
            audio: false,
            video: true
        }

        /* CHANGE ICONS */
        paso1.src = "Assets/paso-a-paso-hover.svg"
        comenzar.classList.add('showme')

        /* CHANGE DESCRIPTION  */
        maintitle.innerHTML = "¿Nos das acceso a tu cámara?"
        mainp.innerHTML = "El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO."

        /* ASK CAMERA USE */
        stream = await navigator.mediaDevices.getUserMedia(constraints);

        /* REMOVE PREVIOUS EVENT LISTENER */
        comenzar.removeEventListener('click', firststep)

        playvideo()

    }
    catch {
        console.error('error here')

    }

}

const video = document.getElementsByClassName('video')[0]
const comenzarButtonText = document.getElementsByClassName('comenzarinnertext')[0]

function playvideo() {

    /* CHANGE STEP ICONS */
    paso1.src = "Assets/paso-a-paso.svg"
    paso2.src = "Assets/paso-a-paso2-hover.svg"

    /* CHANGE DESCRIPTION */
    maintitle.innerHTML = ""
    mainp.innerHTML = ""

    /* SHOW ANS START THE USER CAMERA */
    video.setAttribute('style', 'display:block;')
    video.srcObject = stream;
    video.play();

    /* RECORD BUTTON */
    comenzarButtonText.innerHTML = "GRABAR"
    comenzar.classList.remove('showme')

    /* ON CLICK START RECORDING */
    comenzar.addEventListener('click', record)

}

const videoRecorded = document.getElementsByClassName('recorded')[0]
const timer = document.getElementsByClassName('timer')[0]

async function record() {

    var recorder = null
    /* REMOVE EVENT LISTENER */
    comenzar.removeEventListener('click', record)

    recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function () {
            console.log('started')
        },
    });

    recorder.startRecording()

    /* START TIMER */
    runtimer()

    /* WAIT 3 SECONDS AND STOP RECORDING */
    const sleep = m => new Promise(r => setTimeout(r, m))
    await sleep(3000)

    /* GET A BLOB WITH THE RECORDING */
    await recorder.stopRecording()
    var blobfile = await recorder.getBlob()

    /* PLAY THE VIDEO RECORDED  */
    videoRecorded.src = window.URL.createObjectURL(blobfile)
    videoRecorded.setAttribute('style', 'display:block;')

    /* PAUSE THE CAMERA */
    video.src = ""
    stream.getTracks()[0].stop()
    video.pause()

    /* RECORD BUTTON */
    comenzarButtonText.innerHTML = "FINALIZAR"

    function sendToUpload() {

        /* UPLOAD THE VIDEO */
        var form = new FormData()
        form.append('file', blobfile, 'myGif.gif');

        comenzar.removeEventListener('click', sendToUpload)
        timer.removeEventListener('click', reset)
        uploadGif(form)
        form.delete('file')
    }

    /* UPLOAD  */
    comenzar.addEventListener('click', sendToUpload)

    const reset = () => {
        videoRecorded.src = ""
        comenzar.removeEventListener('click', sendToUpload)
        timer.removeEventListener('click', reset)
        videoRecorded.setAttribute('style', 'display:none;')
        timer.innerHTML = ""
        firststep()
    }

    /* RESET THE RECORDING */
    timer.addEventListener('click', reset)
}

function runtimer() {
    /* SHOW THE TIMER  */
    timer.innerHTML = "0:03"
    timer.setAttribute('style', 'display:block;')

    let totalSeconds = 3;
    let setTimer = setInterval(setTime, 1000);

    function setTime() {
        --totalSeconds;
        timer.innerHTML = `0:0` + totalSeconds

        if (totalSeconds === 0) {
            clearInterval(setTimer)
            timer.innerHTML = "REPETIR CAPTURA"
        }
    }

}

const paso3 = document.getElementsByClassName('paso3')[0]
const loading = document.getElementsByClassName('preloader')[0]

async function uploadGif(sendform) {
    /* CHANGE BUTTON ICONS */
    paso2.src = "Assets/paso-a-paso2.svg"
    paso3.src = "Assets/paso-a-paso3-hover.svg"

    /* TEXT BUTTONS */
    timer.innerHTML = "Estamos subiendo tu gifo..."
    loading.setAttribute('style', 'display:block;')
    comenzarButtonText.innerHTML = "REPITE"

    /* SEND THE GIF */
    var urlupload = "https://upload.giphy.com/v1/gifs?api_key=" + APIkey1

    let request = await fetch(urlupload, {
        method: "POST",
        body: sendform

    });

    let response = await request.json();
    let gifid = response.data.id

    /* FETCH TO THE API */
    let giphyApiURL = `https://api.giphy.com/v1/gifs/${gifid}?api_key=${APIkey1}`

    let fetchreq = await fetch(giphyApiURL)
    let responseData = await fetchreq.json()


    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    let random = ['beautiful', 'amazing', 'best', 'thrilling', 'creepy', 'self', 'cool', 'chill', 'amazingly wonderful', 'palper']
    let randomname = random[getRandomNumber(0, random.length - 1)]

    responseData.data.title = `my ${randomname} gif`

    let infoStorage = JSON.parse(modelStorage(responseData.data))
    myGifList.push(infoStorage)

    /* SENNDING IT TO THE LOCAL */
    localStorage.setItem('misgifos', JSON.stringify(myGifList))

    /* SUCESS MESSAGE */
    imgPathmisgifos = ""
    blobfile = ""
    gifid = ""
    timer.innerHTML = "Gifo subido con éxito"
    loading.setAttribute('style', 'display:none;')

    /* RESET THE RECORDING */
    comenzar.addEventListener('click', again)

    function again() {
        loading.setAttribute('style', 'display:none;')
        videoRecorded.classList.remove('bgpurple')
        videoRecorded.setAttribute('style', 'display:none;')
        comenzar.removeEventListener('click', again)
        timer.innerHTML = ""
        paso3.src = "Assets/paso-a-paso3.svg"
        firststep()
    }
}