import { createContext } from 'react';

const SplitPaneContext = createContext({
   onMouseHoldDown: (e: any) => {},
   clientHeight: '',
   setClientHeight: (value: number) => {},
   clientWidth: 0,
   setClientWidth: (value: number) => {},
});

export default SplitPaneContext;
