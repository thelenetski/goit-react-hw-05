// import axios from 'axios';

// const dataRequest = async url => {
//   const { data } = await axios.get(url, {
//     headers: {
//       Authorization:
//         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTU4YmVjZWNmNTM4OTQ3N2RlN2E3MmI1ODRkZDViZiIsIm5iZiI6MTcyMjg3MDkzNy4xODc2MzMsInN1YiI6IjYzODVhZjliMmUwNjk3MDI5MmU0YTYyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.504sSMw6xkLbLg9EtJxY9BlIZvH_Gi1hHxNm_ILzwVY',
//       accept: 'application/json',
//     },
//   });

//   return data;
// };

export const IMG_LINK = 'https://image.tmdb.org/t/p/w500';
export const IMG_LINK_ORIGINAL = 'https://image.tmdb.org/t/p/original';
export const TREND_URL =
  'https://api.themoviedb.org/3/trending/movie/day?language=uk-UA';

// export default dataRequest;

export const genres = [
  {
    id: 28,
    name: 'Бойовик',
    originalName: 'action',
  },
  {
    id: 12,
    name: 'Пригоди',
    originalName: 'abenteuer',
  },
  {
    id: 16,
    name: 'Мультфільм',
    originalName: 'animation',
  },
  {
    id: 35,
    name: 'Комедія',
    originalName: 'comedy',
  },
  {
    id: 80,
    name: 'Кримінал',
    originalName: 'crime',
  },
  {
    id: 99,
    name: 'Документальний',
    originalName: 'documentary',
  },
  {
    id: 18,
    name: 'Драма',
    originalName: 'drama',
  },
  {
    id: 10751,
    name: 'Сімейний',
    originalName: 'family',
  },
  {
    id: 14,
    name: 'Фентезі',
    originalName: 'fantasy',
  },
  {
    id: 36,
    name: 'Історичний',
    originalName: 'history',
  },
  {
    id: 27,
    name: 'Жахи',
    originalName: 'horror',
  },
  {
    id: 10402,
    name: 'Музика',
    originalName: 'music',
  },
  {
    id: 9648,
    name: 'Детектив',
    originalName: 'mystery',
  },
  {
    id: 10749,
    name: 'Мелодрама',
    originalName: 'romance',
  },
  {
    id: 878,
    name: 'Фантастика',
    originalName: 'science-fiction',
  },
  {
    id: 10770,
    name: 'Телефільм',
    originalName: 'tv-Movie',
  },
  {
    id: 53,
    name: 'Трилер',
    originalName: 'thriller',
  },
  {
    id: 10752,
    name: 'Військовий',
    originalName: 'war',
  },
  {
    id: 37,
    name: 'Вестерн',
    originalName: 'western',
  },
];
