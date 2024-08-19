import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import dataRequest from '../Services/Services';
import Loader from '../Loader/Loader';
import MovieList from '../MovieList/MovieList';
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';

const MovieCat = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { catName } = useParams();
  const [page, setPage] = useState(1);

  const URL = `https://api.themoviedb.org/3/discover/movie?include_adult=true&language=uk-UA&page=${page}&sort_by=popularity.desc&with_genres=${catName.match(
    /\d+/g
  )}`;

  useEffect(() => {
    const requestData = async () => {
      try {
        setLoading(true);
        const data = await dataRequest(URL);
        setData(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    requestData();
  }, [catName, page]);

  return (
    <>
      {loading && <Loader />}
      {loading === false && data.results && (
        <>
          <MovieList data={data.results} state={location} />
          <div className="navePageWrap">
            {page > 1 && (
              <div className="navPage">
                <button type="button" onClick={() => setPage(page - 1)}>
                  <GrFormPrevious />
                </button>
              </div>
            )}
            {page < data.total_pages && (
              <div className="navPage">
                <button type="button" onClick={() => setPage(page + 1)}>
                  <GrFormNext />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MovieCat;
