$(document).ready(() => {
    const getURL = 'https://rickandmortyapi.com/api/character/';
    // Number of Rick and Morty to be returned
    const numChars = 3;
    // Number of Characters currently available at the endpoint + 1
    const numAvailChars = 827;
    let charsPage = $('#products')
    // populate products page
    async function newRicks() {
        getRicked().then(rickChars => {
        //console.log(rickChars[0]);
        charsPage.empty();
        charsPage.append(
            `<div class="container text-center pt-5">
                <h1>Welcome to the Rick and Morty character product page!!</h1>
                <h6>Could you make an episode using these ${numChars} characters?</h6>
                <div class="container d-flex  border-bottom p-sm-5">
                    <div class="row justify-content-evenly">
                    <div class="col-lg-3 col-sm-8 pb-5">
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text"><b>${rickChars[0].name}</b></p>
                            </div>
                            <img src=${rickChars[0].image} class="card-img-top" alt="rick and morty character">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><b>Species:</b> ${rickChars[0].species}</li>
                                <li class="list-group-item"><b>Status:</b> ${rickChars[0].status}</li>
                                <li class="list-group-item"><b>Location:</b> ${rickChars[0].location.name}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-8 pb-5">
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text"><b>${rickChars[1].name}</b></p>
                            </div>
                            <img src=${rickChars[1].image} class="card-img-top" alt="rick and morty character">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><b>Species:</b> ${rickChars[1].species}</li>
                                <li class="list-group-item"><b>Status:</b> ${rickChars[1].status}</li>
                                <li class="list-group-item"><b>Location:</b> ${rickChars[1].location.name}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-8 pb-5">
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text"><b>${rickChars[2].name}</b></p>
                            </div>
                            <img src=${rickChars[2].image} class="card-img-top" alt="rick and morty character">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><b>Species:</b> ${rickChars[2].species}</li>
                                <li class="list-group-item"><b>Status:</b> ${rickChars[2].status}</li>
                                <li class="list-group-item"><b>Location:</b> ${rickChars[2].location.name}</li>
                            </ul>
                        </div>
                    </div>
                    </div>
                </div>
            </div>`
            )
        });
    }
    newRicks();
    $("#refreshBtn").click( function () {
        newRicks();
    })
    /**
     * A function for retrieving three Rick and Morty Characters
     * 
     */
    async function getRicked() {
        let charNums = [];
        for (let i = 0; i < numChars; i++) {
            charNums.push(Math.floor(Math.random() * numAvailChars))
        }
        // append array to URL to return set number of chars
        //console.log(charNums);
        let rickURL = `${getURL}${charNums}`
        //console.log(rickURL)
        let response = await fetch(rickURL);
        let rickChars = await response.json();
        return rickChars;
    }
});