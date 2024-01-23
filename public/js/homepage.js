// function fetchLatestPosts() {
//     fetch('/api/posts/latest')                                                         // <= Function to fetch and display the latest forum posts from database. Double check route NEEDED!
//         .then(response => response.json())
//         .then(posts => {
//            const latestPostsContainer = document.getElementById('latest-posts');       // <= Fetches of latest posts.
//             latestPostsContainer.innerHTML = '';                                       // <= Clears existing content.

//             posts.forEach(post => {                                                    // <= Displays each post.
//                 const postElement = document.createElement('div');
//                 postElement.classList.add('post');
//                 postElement.innerHTML = `
//                     <h3>${post.title}</h3>
//                     <p>${post.content}</p>
//                     <p>Author: ${post.author}</p>
//                 `;
//                 latestPostsContainer.appendChild(postElement);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching latest posts:', error);
//         });
// }


// function handleLogin() {                                                        // <= Function to handle user login.
    
//     const loginForm = document.getElementById('login-form');       
//     loginForm.addEventListener('submit', function (event) {
//         event.preventDefault();

       
//         const formData = new FormData(loginForm);
//         fetch('/api/login', {                                                  // <= API endpoint NEEDED!
//             method: 'POST',
//             body: formData
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
                
//                 window.location.href = '/dashboard';                           // <= Redirects to the user's dashboard.
//             } else {
                
//                 alert('Login failed. Please check your credentials.');         // <= Displays an error message to user if. 
//             }
//         })
//         .catch(error => {
//             console.error('Error during login:', error);
//         });
//     });
// }


// document.addEventListener('DOMContentLoaded', function () {                    // <= Functions to call when the DOM is loaded. fetches & displays the latest posts.
   
//     fetchLatestPosts();

    
//     handleLogin();
// });


// document.querySelector('#homepage').addEventListener('click', homepage);