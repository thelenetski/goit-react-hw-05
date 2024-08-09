import css from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const SearchBar = ({ value, onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    if (
      form.elements.search.value.trim() === '' ||
      /^\s*$/.test(form.elements.search.value.trim())
    ) {
      return toast.error('Empty request, please write some text.');
    }
    onSubmit(form.elements.search.value.trim());
    // form.reset();
  };

  return (
    <div className={css.search}>
      <div>
        <Toaster position="top-left" reverseOrder={true} />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          // autoFocus
          placeholder={value === '' ? 'Search movies' : value}
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
