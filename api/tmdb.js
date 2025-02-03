export async function getLatestMovies() {
  const API_KEY = '4ff4aa8b7fbe0121991122d6041cfb66';
  const LATEST_MOVIES = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`;
  const IMAGEN_PLACEHOLDER = 'https://media.istockphoto.com/id/1147544807/es/vector/no-imagen-en-miniatura-gr%C3%A1fico-vectorial.jpg?s=612x612&w=0&k=20&c=Bb7KlSXJXh3oSDlyFjIaCiB9llfXsgS7mHFZs6qUgVk='

  const rawData = await fetch(LATEST_MOVIES);
  const json = await rawData.json();

  const { results } = json;

  return results.map((movie) => {
    const { title, id, release_date, overview, poster_path, vote_average } = movie;

    const posterUrl = poster_path
      ? `https://image.tmdb.org/t/p/w500/${poster_path}`
      : IMAGEN_PLACEHOLDER;

    return {
      title,
      id,
      releaseDate: release_date,
      overview,
      posterUrl,
      rating: vote_average,
    };
  });
}

export async function getMovieDetails(id) {
  const API_KEY = '4ff4aa8b7fbe0121991122d6041cfb66';
  const MOVIE_DETAILS = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-ES&append_to_response=reviews`;
  const IMAGEN_PLACEHOLDER = 'https://media.istockphoto.com/id/1147544807/es/vector/no-imagen-en-miniatura-gr%C3%A1fico-vectorial.jpg?s=612x612&w=0&k=20&c=Bb7KlSXJXh3oSDlyFjIaCiB9llfXsgS7mHFZs6qUgVk='

  const rawData = await fetch(MOVIE_DETAILS);
  const json = await rawData.json();

  const { title, overview, release_date, vote_average, poster_path, reviews } = json;

  const posterUrl = poster_path
      ? `https://image.tmdb.org/t/p/w500/${poster_path}`
      : IMAGEN_PLACEHOLDER;

  const formattedReviews = reviews.results.map((review) => {
    return {
      quote: review.content,
      score: review.author_details.rating,
      date: review.created_at,
      author: review.author
    };
  });

  return {
    posterUrl,
    title,
    id,
    releaseDate: release_date,
    description: overview,
    rating: vote_average,
    reviews: formattedReviews,
  };
}
