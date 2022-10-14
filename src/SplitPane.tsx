import React, {
   FC,
   createRef,
   useContext,
   useEffect,
   useRef,
   useState,
   ClassAttributes,
   HTMLAttributes,
} from 'react';
import QuoteContext from './QuoteContext';
import SplitPaneContext from './SplitPaneContext';

const SplitPane: FC<{ children: any; className: string }> = ({
   children,
   ...props
}) => {
   const [clientHeight, setClientHeight] = useState<any>(null);
   const [clientWidth, setClientWidth] = useState<any>(null);
   const yDividerPos = useRef<any>(null);
   const xDividerPos = useRef<any>(null);

   const onMouseHoldDown = (e: { clientY: null; clientX: null }) => {
      yDividerPos.current = e.clientY;
      xDividerPos.current = e.clientX;
   };

   const onMouseHoldUp = () => {
      yDividerPos.current = null;
      xDividerPos.current = null;
   };

   const onMouseHoldMove = (e: {
      clientY: string | number | null;
      clientX: string | number | null;
   }) => {
      if (!yDividerPos.current && !xDividerPos.current) {
         return;
      }

      setClientHeight(clientHeight + e.clientY - yDividerPos.current);
      setClientWidth(clientWidth + e.clientX - xDividerPos.current);

      yDividerPos.current = e.clientY;
      xDividerPos.current = e.clientX;
   };

   useEffect(() => {
      document.addEventListener('mouseup', onMouseHoldUp);
      document.addEventListener('mousemove', onMouseHoldMove);

      return () => {
         document.removeEventListener('mouseup', onMouseHoldUp);
         document.removeEventListener('mousemove', onMouseHoldMove);
      };
   });

   return (
      <div {...props}>
         <SplitPaneContext.Provider
            value={{
               clientHeight,
               setClientHeight,
               clientWidth,
               setClientWidth,
               onMouseHoldDown,
            }}
         >
            {children}
         </SplitPaneContext.Provider>
      </div>
   );
};

export const Divider = (
   props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLDivElement> &
      HTMLAttributes<HTMLDivElement>
) => {
   const { onMouseHoldDown } = useContext(SplitPaneContext);

   return <div {...props} onMouseDown={onMouseHoldDown} />;
};

export const SplitPaneTop = (
   props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLDivElement> &
      HTMLAttributes<HTMLDivElement>
) => {
   const topRef = createRef<any>();
   const { clientHeight, setClientHeight } = useContext(SplitPaneContext);
   const { quotes, setCurrQuote } = useContext(QuoteContext);

   useEffect(() => {
      if (!clientHeight) {
         setClientHeight(topRef.current.clientHeight);
         return;
      }

      topRef.current.style.minHeight = clientHeight + 'px';
      topRef.current.style.maxHeight = clientHeight + 'px';
   }, [clientHeight]);

   return (
      <div {...props} className="split-pane-top" ref={topRef}>
         <h1>Famous quotes:</h1>
         <ul>
            {quotes.map((el, i) => {
               return (
                  <li key={i}>
                     <a href="#" onClick={() => setCurrQuote(el.id)}>
                        {el.author}
                     </a>
                  </li>
               );
            })}
         </ul>
      </div>
   );
};

export const SplitPaneBottom = (
   props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLDivElement> &
      HTMLAttributes<HTMLDivElement>
) => {
   const { currQuote } = useContext(QuoteContext);

   return (
      <div {...props} className="split-pane-bottom">
         Current <b>quote id</b>: {currQuote}
      </div>
   );
};

export const SplitPaneLeft = (
   props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLDivElement> &
      HTMLAttributes<HTMLDivElement>
) => {
   const topRef = createRef<any>();
   const { clientWidth, setClientWidth } = useContext(SplitPaneContext);

   useEffect(() => {
      if (!clientWidth && topRef.current) {
         const cw = topRef.current.clientWidth;
         setClientWidth(cw / 2);
         topRef.current.style.minWidth = clientWidth + 'px';
         topRef.current.style.maxWidth = clientWidth + 'px';
      }
   }, [clientWidth]);

   return <div {...props} className="split-pane-left" ref={topRef} />;
};

export const SplitPaneRight = (
   props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLDivElement> &
      HTMLAttributes<HTMLDivElement>
) => {
   const { quotes, currQuote } = useContext(QuoteContext);
   const quote = quotes.find((el) => el.id === currQuote);

   return (
      <div {...props} className="split-pane-right">
         <div className="quote">
            <blockquote>{quote?.description}</blockquote>—{' '}
            <span>{quote?.author}</span>
         </div>
      </div>
   );
};

export default SplitPane;
