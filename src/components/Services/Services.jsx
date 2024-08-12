import axios from 'axios';

const dataRequest = async url => {
  const { data } = await axios.get(url, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTU4YmVjZWNmNTM4OTQ3N2RlN2E3MmI1ODRkZDViZiIsIm5iZiI6MTcyMjg3MDkzNy4xODc2MzMsInN1YiI6IjYzODVhZjliMmUwNjk3MDI5MmU0YTYyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.504sSMw6xkLbLg9EtJxY9BlIZvH_Gi1hHxNm_ILzwVY',
      accept: 'application/json',
    },
  });

  return data;
};

export const IMG_LINK = 'https://image.tmdb.org/t/p/w500';
export const TREND_URL =
  'https://api.themoviedb.org/3/trending/movie/day?language=uk-UA';

export default dataRequest;
