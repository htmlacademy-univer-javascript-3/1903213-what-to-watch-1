import { Fragment, PropsWithChildren } from 'react';

type TabPanelProps = {
  id: number;
  selected?: boolean;
};

function TabPanel(props: PropsWithChildren<TabPanelProps>): JSX.Element {
  const { children, selected, id } = props;

  return <Fragment key={id}>{selected ? children : null}</Fragment>;
}

export default TabPanel;
