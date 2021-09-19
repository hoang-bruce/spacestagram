// set initial count
let url = "https://api.nasa.gov/planetary/apod?api_key=";
let api_key = "wOHvM1cJzmBzG4unFqCfFfCUB3tr1gJaNEqNxgFq";

// total image count
var count = 0;

// for grabbing previous date's pictures
let today = new Date();
let apod_date = new Date();

// Open a new connection, using the GET request on the URL endpoint
//req.open("GET", url + api_key, true);

// apod_date.setDate(today.getDate() - count);
// req.open("GET", url + api_key + "&date=" + apod_date.toISOString().split('T')[0], true);
// // Send request
// req.send();

// req.addEventListener("load", function () {
//     if (req.status == 200 && req.readyState == 4) {
//         var response = JSON.parse(req.responseText);
//         document.getElementById("title").textContent = response.title;
//         document.getElementById("date").textContent = response.date;
//         document.getElementById("pic").src = response.hdurl;
//         document.getElementById("explanation").textContent = response.explanation;
//         count = 1;
//     }
// })

loadMore();

function loadMore() {

    let req = new XMLHttpRequest();

    apod_date.setDate(today.getDate() - count);
    req.open("GET", url + api_key + "&date=" + apod_date.toISOString().split('T')[0], true);
    // Send request
    req.send();

    req.addEventListener("load", function () {
        if (req.status == 200 && req.readyState == 4) {
            var response = JSON.parse(req.responseText);
            document.getElementById("load-more-button").insertAdjacentHTML("beforeBegin",
                '<div class="container-2"><img id="pic-' + count + '" src="" alt="NASA Picture Of The Day" width="100%"><div class="flex-box-container-post"><h2 id="title-' + count + '"></h2><h3 id="date-' + count + '"></h3><p id="explanation-' + count + '"></p></div></div>');
            
            document.getElementById("title-" + count).textContent = response.title;
            document.getElementById("date-" + count).textContent = response.date;
            document.getElementById("pic-" + count).src = response.hdurl;
            document.getElementById("explanation-" + count).textContent = response.explanation;
            count += 1;
        }
    })
}