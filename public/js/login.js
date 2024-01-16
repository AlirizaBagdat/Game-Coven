const login = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#emailLogin').value.trim();                           // <= queryid needs to be created for #
    const password = document.querySelector('#passwordLogin').value.trim();                     // <= queryid needs to be created for #

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log('Logged in successfully!');
            document.location.replace('/');                  // <= need to enter route here after login 
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#loginBtn').addEventListener('submit', login);
