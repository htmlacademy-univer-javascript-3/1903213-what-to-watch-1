import { PropsWithChildren } from 'react';
import classNames from 'classnames';

const defaultClassName = 'film-nav__list';

function TabsList(props: PropsWithChildren): JSX.Element {
  const { children, ...attributes } = props;
  return (
    <nav className={classNames('film-nav', 'film-card__nav')}>
      <ul
        {...attributes}
        className={classNames(defaultClassName)}
        role='tablist'
      >
        {children}
      </ul>
    </nav>
  );
}

export default TabsList;
