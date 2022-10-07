import { PropsWithChildren, useRef } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

const defaultClassName = 'film-nav__item';
const selectedClassName = 'film-nav__item--active';

type TabProps = {
  selected?: boolean;
  id: string;
  tabIndex: number;
  clickHandler: (tabId: string) => void;
};

function Tab(props: PropsWithChildren<TabProps>): JSX.Element {
  const { children, selected, id, tabIndex, clickHandler } = props;

  const className = classNames(defaultClassName, {
    [`${selectedClassName}`]: selected
  });

  return (
    <li
      className={className}
      role='tab'
      id={`tab${id}`}
      key={id}
      aria-selected={selected ? 'true' : 'false'}
      aria-controls={`panel${id}`}
      tabIndex={tabIndex || (selected ? 0 : undefined)}
      onClick={() => {
        clickHandler(id);
      }}
    >
      <a
        href='#'
        className='film-nav__link'
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        {children}
      </a>
    </li>
  );
}

export default Tab;
