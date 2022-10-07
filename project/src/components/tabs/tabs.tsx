import { PropsWithChildren } from 'react';

function Tabs(props: PropsWithChildren): JSX.Element {
  const { children } = props;

  return <div className='film-card__desc'>{children}</div>;
}

export default Tabs;
