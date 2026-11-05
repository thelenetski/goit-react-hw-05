import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';
import { IoMdHome } from 'react-icons/io';
import { RiMenuSearchFill } from 'react-icons/ri';
import { MdFavorite } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavMovies,
  selectPage,
  selectPagesNav,
  selectTotalPages,
} from '../../redux/selectors';
import { nextPage, prevPage } from '../../redux/moviesSlice';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { MdWhatshot } from 'react-icons/md';
import NavTitle from '../NavTitle/NavTitle';
import { BsBookmarkHeartFill } from 'react-icons/bs';
// import { changeItems } from '../../redux/moviesSlice';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const showPagesNav = useSelector(selectPagesNav);
  const totalPages = useSelector(selectTotalPages);
  const results = useSelector(selectFavMovies);
  const location = useLocation();

  const sumFavMovies = res => {
    const sum = res.reduce(
      (accumulator, item) => (item.status ? accumulator + 1 : accumulator),
      0
    );
    return sum;
  };

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <h1 className={css.title}>Movie DES</h1>
        <div className={css.linkBox}>
          <NavLink to="/home" className={buildLinkClass}>
            <IoMdHome />
            <span>Головна</span>
          </NavLink>
          <NavLink
            to={
              location.pathname.includes('movies')
                ? location.pathname + location.search
                : '/movies'
            }
            className={buildLinkClass}
          >
            <RiMenuSearchFill />
            <span>Пошук</span>
          </NavLink>
          <NavLink to="/favorites" className={buildLinkClass}>
            <MdFavorite />
            <span>Обране</span>
          </NavLink>
          {showPagesNav && page > 1 && (
            <div className={clsx(css.navPage, 'fadeIn')}>
              <button
                type="button"
                onClick={() => {
                  dispatch(prevPage());
                }}
              >
                <GrFormPrevious />
              </button>
            </div>
          )}
          {showPagesNav && page < totalPages && (
            <div className={clsx(css.navPage, 'fadeIn')}>
              <button
                type="button"
                onClick={() => {
                  dispatch(nextPage());
                }}
              >
                <GrFormNext />
              </button>
            </div>
          )}
        </div>
      </nav>
      {location.pathname === '/home' && (
        <NavTitle
          title="Сьогодні у тренді"
          icon={<MdWhatshot size={26} color="orange" />}
        />
      )}
      {location.pathname === '/favorites' && (
        <NavTitle
          title={
            results !== null && sumFavMovies(results) > 0
              ? `Мої фільми (${sumFavMovies(results)})`
              : `Немає обраних фільмів`
          }
          icon={<BsBookmarkHeartFill size={26} color="var(--color-active)" />}
        />
      )}
    </header>
  );
};

export default Navigation;
