const logout = async () => {
    const response = await fetch('/api/users/logout', {         // <= Double check route after API completion!
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },          // Sent a POST request to the endpoint.
    });
  
    if (response.ok) {                                           
      document.location.replace('/');                           // <= To check if the response status is OK. If successful, redirect the user to the home page.
    } else {
      alert(response.statusText);                               // <= If there's an error, display an alert with the error message.
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);        // <= Added click event listener to the element with the id 'logout'.