function createCard(
    name, description, 
    pictureUrl, start,
    end, location
    ) {
    return `
        <div class="card gap-5 shadow-lg p-3 mb-5 bg-body rounded">
            <img src="${pictureUrl}" class="card-img-top" alt="..."/>
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
                <p class="card-text">${description}</p>
            </div>
            <div class="card-footer mb-2 text-muted">
                ${start} - ${end}
            </div>
        </div>
            `;
        }


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
            console.log(response);
            console.log(data);

            
            for (const conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                  const details = await detailResponse.json();
                  const title = details.conference.name;
                  const description = details.conference.description;
                  const pictureUrl = details.conference.location.picture_url;
                  const location = details.conference.location.name;
                  const start = new Date(details.conference.starts).toLocaleDateString()
                  const end = new Date(details.conference.ends).toLocaleDateString()
                  const html = createCard(
                      title, description, 
                      pictureUrl, start, 
                      end, location);
                  const column = document.querySelector('.row');
                  column.innerHTML += html;
                } 
            }
        }
    } catch (e){
        // Handle the error from anywhere in the Promise
        console.error('error', e);

    }

});
