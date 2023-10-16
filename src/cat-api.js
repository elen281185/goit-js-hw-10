const url = 'https://api.thecatapi.com/v1';
const api_key = "live_1tuo6caBJuiJmfc1XpTmIRJu5lZyliM8nxubNmqyOPNq8Ayb2drpi1nkc7pt4Xo2";

export function fetchBreeds() {
    return fetch(`${url}/breeds?api_key=${api_key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });       
};

export function fetchCatByBreed(breedId) {
    return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }); 
    };