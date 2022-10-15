import { createContext } from 'react';

const SplitPaneContext = createContext({
   onMouseHoldDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {},
   clientHeight: 0,
   setClientHeight: (value: number) => {},
   clientWidth: 0,
   setClientWidth: (value: number) => {},
});

export default SplitPaneContext;
