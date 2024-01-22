let commentsArray = [];

function addCommentLocally(username, comment) {                                                     // <= Function to add a new comment to the local array.
    const newComment = {
        username: username,
        comment: comment,
        timestamp: new Date().toLocaleString()
    };
    commentsArray.push(newComment);
}

async function addCommentToBackend(username, comment) {                                             // <= Function to add a new comment to the backend.
    try {
        const response = await fetch('', {                      // <= API database route NEEDED!
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                comment: comment,
            }),
        });

        if (response.ok) {                                                                          // <= If the comment is successfully added to the backend, local array will be updated. 
           
            addCommentLocally(username, comment);
        } else {
            console.error('Failed to add comment to the backend');
        }
    } catch (error) {
        console.error('Error adding comment to the backend:', error);                              // <= Error code to let user know of the error. 
    }
}

fetchComments().then((backendComments) => {                                                        // <= Fetches comments from the backend and update the local array.
    commentsArray = backendComments;
    renderComments();
});


function renderComments() {                                                                  // <= Function to render comments using Handlebars.
    const commentsTemplate = document.getElementById('comments-template').innerHTML;
    const compiledTemplate = Handlebars.compile(commentsTemplate);
    console.log(compiledTemplate)
}    
document.getElementById('comments-container').innerHTML = compiledTemplate({ comments: commentsArray }); // <= ID-for comments. 