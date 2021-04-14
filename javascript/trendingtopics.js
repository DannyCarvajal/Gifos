
/* TRENDING TOPICS */

let trendingterms = `https://api.giphy.com/v1/trending/searches?api_key=${APIkey1}&limit=5`

! async function sendTrendingTopics(trendingterms) {

        let request =await fetch(trendingterms)
        let response = await request.json()

        let trendingtopics = document.getElementsByClassName('trending-topics')[0]

        for (let i = 0; i < 5; i++) {
            var nametopics = capitalize(response.data[i])

            function capitalize(topic) {
                return topic.charAt(0).toUpperCase() + topic.slice(1)
            }

            if (i < 4) {
                trendingtopics.innerHTML += nametopics + ', '
            } else {
                trendingtopics.innerHTML += nametopics
            }
        }


}(trendingterms)


