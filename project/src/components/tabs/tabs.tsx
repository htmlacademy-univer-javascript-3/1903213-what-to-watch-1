import { PropsWithChildren } from 'react';

type TabsProps = {};

function Tabs(props: PropsWithChildren<TabsProps>): JSX.Element {
  const { children } = props;

  return <div className='film-card__desc'>{children}</div>;
}

export default Tabs;
