
/* SEARCH TOPICS TRENDING */

const trendingEndpoint = `https://api.giphy.com/v1/trending/searches?api_key=${APIkey1}`
const trendTopicContainer = document.getElementsByClassName('trending-topics')[0]

! async function fetchTrendingTopics(trendUrl) {

    const request = await fetch(trendUrl)
    const response = await request.json()
    appendTopics(response.data)

}(trendingEndpoint)

appendTopics = (data) => {
    
    for (let i in data){
        /* Capitalize first letter */
        let nametopic = data[i].charAt(0).toUpperCase() + data[i].slice(1)

        if ( i < 4){
            trendTopicContainer.innerHTML += nametopic + ', '
        } else {
            trendTopicContainer.innerHTML += nametopic 
            return
        }
        
    }
}


