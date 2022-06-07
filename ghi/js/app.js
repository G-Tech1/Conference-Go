window.addEventListener('DOMContentLoaded', async () => { 

    const url = 'http://localhost:8000/api/conferences/';
    
    try {
        const response = await fetch(url);
        
        if (!response.ok){
            //throw an error when the response is bad
            throw new Error('Response is not ok');
        } else {
            // Get a promise that will turn into the JavaScript value based on the JSON
            const data = await response.json();
            // console.log(response);
            // console.log(data);

            const conference = data.conferences[0];
            const nameTag = document.querySelector('.card-title');
            console.log(conference);
            nameTag.innerHTML = conference.name;

            const descriptionTag = document.querySelector('.card-text');
            descriptionTag.innerHTML = conference.description;

            const detailUrl = `http://localhost:8000${conference.href}`;
            const detailResponse = await fetch(detailUrl);
            if (detailResponse.ok){
                const details = await detailResponse.json();
                console.log(details);

                const description = details.conference['description'];
                const descriptionTag = document.querySelector('.card-text');
                descriptionTag.innerHTML = description;
            }
s
        }
    } catch (e){
        // Handle the error from anywhere in the Promise
        console.error('error', error);

    }

});
