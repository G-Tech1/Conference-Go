window.addEventListener('DOMContentLoaded', async () => {
    
    const url = "http://localhost:8000/api/locations/";
    const response = await fetch(url);
    
    if (response.ok) {
        const data = await response.json();
        
        const selectTag = document.getElementById('location');
        for (let location of data.locations) {
            // Create an 'option' element
            const option = document.createElement('option');
            // Set the '.value' property of the option element to the
            // state's abbreviation
            option.value = location.id;
            // Set the '.innerHTML' property of the option element to
            // the state's name
            option.innerHTML = location.name;
            // Append the option element as a child of the select tag
            selectTag.appendChild(option);
        }

        const formTag = document.getElementById('create-conference-form');
        formTag.addEventListener('submit', async event => {
            event.preventDefault();
            const formData = new FormData (formTag);
            const json = JSON.stringify(Object.fromEntries(formData));
            const conferenceUrl = 'http://localhost:8000/api/conferences/';
            const fetchConfig = {
                method: "post",
                body: json,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const conferenceResponse = await fetch(conferenceUrl, fetchConfig);
            if (conferenceResponse.ok) {
                formTag.reset();
                const newConference = await conferenceResponse.json();
                console.log(newConference);
            }
    });
    }

});