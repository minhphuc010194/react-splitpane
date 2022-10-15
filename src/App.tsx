import React, { useState } from 'react';
import SplitPane, {
   Divider,
   SplitPaneBottom,
   SplitPaneLeft,
   SplitPaneRight,
   SplitPaneTop,
} from './SplitPane';
import QuoteContext, { QuoteType } from './QuoteContext';

// import './App.css';

const quotes: QuoteType[] = [
   {
      id: 1,
      author: 'Nelson Mandela',
      description:
         'The greatest glory in living lies not in never falling, but in rising every time we fall.',
   },
   {
      id: 2,
      author: 'Walt Disney',
      description: 'The way to get started is to quit talking and begin doing.',
   },
   {
      id: 3,
      author: 'Oprah Winfrey',
      description:
         "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
   },
];

export default function App() {
   const [currQuote, setCurrQuote] = useState(1);

   return (
      <div>
         <QuoteContext.Provider value={{ quotes, currQuote, setCurrQuote }}>
            <SplitPane
               style={{
                  width: '100vw',
                  height: '100vh',
                  display: 'flex',
                  flexDirection: 'row',
               }}
            >
               <SplitPaneLeft
                  style={{
                     flex: 1,
                     overflow: 'hidden',
                  }}
               >
                  <SplitPane
                     style={{
                        width: '100vw',
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                     }}
                  >
                     <SplitPaneTop
                        style={{
                           flex: 1,
                           overflow: 'hidden',
                           backgroundColor: '#ccc',
                           textAlign: 'left',
                           padding: '2%',
                        }}
                     />
                     <Divider
                        style={{
                           border: '5px solid black',
                           cursor: 'row-resize',
                        }}
                     />
                     <SplitPaneBottom
                        style={{
                           flex: 1,
                           overflow: 'hidden',
                           backgroundColor: '#ccc',
                           textAlign: 'left',
                           padding: '2%',
                        }}
                     />
                  </SplitPane>
               </SplitPaneLeft>
               <Divider
                  style={{
                     border: '5px solid black',
                     cursor: 'col-resize',
                  }}
               />

               <SplitPaneRight
                  style={{
                     flex: 1,
                     overflow: 'hidden',
                     backgroundColor: '#fff',
                     backgroundImage: `linear-gradient(
                           90deg,
                           transparent 79px,
                           #abced4 79px,
                           #abced4 81px,
                           transparent 81px
                        ),
                        linear-gradient(#eee 0.1em, transparent 0.1em)`,
                     backgroundSize: '100% 1.2em',
                  }}
               />
            </SplitPane>
         </QuoteContext.Provider>
      </div>
   );
}
