import { Fragment, PropsWithChildren } from 'react';

type TabPanelProps = {
  id: number;
  selected?: boolean;
};

function TabPanel(props: PropsWithChildren<TabPanelProps>): JSX.Element {
  const { children, selected } = props;

  return <Fragment>{selected ? children : null}</Fragment>;
}

export default TabPanel;
