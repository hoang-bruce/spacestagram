// set initial count
let url = "https://api.nasa.gov/planetary/apod?api_key=";
let api_key = "DEMO_KEY";

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
            if (response.media_type === 'image') {
                document.getElementById("load-more-button").insertAdjacentHTML("beforeBegin",
                    '<div class="container-2"><img id="pic-' + count + '" src="" alt="NASA Picture Of The Day" width="100%"><div class="flex-box-container-post"><h2 id="title-' + count + '"></h2><h3 id="date-' + count + '"></h3><p id="explanation-' + count + '"></p><div><button class="button-dark" id="like-' + count + '" onclick="likePicture(this.id)"> <i class="fa fa-heart"></i> Like</button></div></div></div>');
            } else if (response.media_type === 'video') {
                document.getElementById("load-more-button").insertAdjacentHTML("beforeBegin",
                    '<div class="container-2"><iframe id="pic-' + count + '" width="1280" height="720" src=""></iframe><div class="flex-box-container-post"><h2 id="title-' + count + '"></h2><h3 id="date-' + count + '"></h3><p id="explanation-' + count + '"></p><div><button class="button-dark" id="like-' + count + '" onclick="likePicture(this.id)"> <i class="fa fa-heart"></i> Like</button></div></div></div>');
            }

            document.getElementById("title-" + count).textContent = response.title;
            document.getElementById("date-" + count).textContent = response.date;
            if (response.hdurl != null) {
                document.getElementById("pic-" + count).src = response.hdurl;
            } else {
                document.getElementById("pic-" + count).src = response.url;
            }
            document.getElementById("explanation-" + count).textContent = response.explanation;

            // Check if image is already liked, if it is, then like it after refresh.
            if (sessionStorage.getItem(response.date) != null && sessionStorage.getItem(response.date) == 1) {
                document.getElementById("like-" + count).classList.toggle("liked");
            } else {
                sessionStorage.setItem(response.date, 0);
            }

            count += 1;
        }
    })
}


// Sets the button to "liked". Sets session storage to retain info that the picture is liked.
function likePicture(clicked_id) {
    let element = document.getElementById(clicked_id);
    element.classList.toggle("liked");
    if (sessionStorage.getItem(document.getElementById("date-" + clicked_id.split('-')[1]).textContent) == null || sessionStorage.getItem(document.getElementById("date-" + clicked_id.split('-')[1]).textContent) == 0) {
        sessionStorage.setItem(document.getElementById("date-" + clicked_id.split('-')[1]).textContent, 1);
    } else {
        sessionStorage.setItem(document.getElementById("date-" + clicked_id.split('-')[1]).textContent, 0);
    }

    //localStorage.setItem(document.getElementById("date-" + clicked_id.split('-')[1]).textContent, 0);
}