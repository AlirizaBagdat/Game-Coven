const login = async (event) => {
    event.preventDefault();                                                               // <= Preventing the default form submission behavior.

    const email = document.querySelector('#emailLogin').value.trim();                     // <= queryid needs to be created for #
    const password = document.querySelector('#passwordLogin').value.trim();               // <= queryid needs to be created for #

    if (email && password) {
        const response = await fetch('/api/users/login', {                                // <= Checking if both email and password are provided. Sends a POST request to the endpoint.
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {                                                                // <= Checking if the response status is ok.
            console.log('Logged in successfully!');                                       // <= If login is successful, then logs a message to user and redirect to the home page.
            document.location.replace('/');        // <= Need to enter route here!                                        
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', login);                    
