document.addEventListener("DOMContentLoaded", function () {                 // <= Function to fetch and display user comments from the backend                                                                   
    function fetchComments() {
                                                                // <= Backend API call NEEDED.
            const backendEndpoint = '/api/getComments';         // <= API endpoint (route) for fetching user comments from backend NEEDED.                   
                                                            
            fetch('/api/login', {                               // <= API endpoint NEEDED!
                method: 'GET',
                body: formData
            })                                                     // <= Fetch API request to the backend NEEDED.
            .then(response => response.json())
            .then(data => {
                displayComments(data)
                ;                                      // <= Processes the data and displays user's passed engagements from database. There is a possiblity of needing to pass the comments-array to the Handlebars template since we want to view the user's previous comments as well.
            })
            .catch(error => {
                console.error('Error fetching comments:', error);       
            });
    }

    function displayComments(userComments) {                                // <= Function to display user comments with dates & time provided.
        const commentsList = document.getElementById("comments-list");

        userComments.forEach(comment => {
            const li = document.createElement("li");                        // <= List ID
            const date = document.createElement("span");                    // <= Date ID   
            const text = document.createElement("p");                       // <= Paragrapgh ID

            date.textContent = comment.date;
            text.textContent = comment.text;

            li.appendChild(date);                                           // <= Appending date and text as Child element.
            li.appendChild(text);
            commentsList.appendChild(li);
        });
    }

    fetchComments();  
});




















document.querySelector('#profile').addEventListener('click', profile);