import clsx from 'clsx';
import css from './NavTitle.module.css';

function NavTitle({ title, icon }) {
  return (
    <h1 className={clsx(css.title, 'fadeIn')}>
      {title}
      {icon}
    </h1>
  );
}

export default NavTitle;
