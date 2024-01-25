const newReview = async (event) => {
    event.preventDefault();

    const score = document.querySelector('#score').value.trim();
    const description = document.querySelector('#review-description').value.trim();
    const url = window.location.pathname.split('/');
    const game_id = url[url.length - 1];
  
    if (score && description && game_id) {
      const response = await fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({ score, description, game_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/game/${game_id}`);
      } else {
        alert('Failed to create review');
      }
    }
  };


  document
  .querySelector('.review')
  .addEventListener('submit', newReview);