import { createContext } from 'react';
export type QuoteType = {
   id: number;
   author: string;
   description: string;
};
const QuoteContext = createContext({
   quotes: [{ id: 1, author: '', description: '' }],
   currQuote: 1,
   setCurrQuote: (value: number) => {},
});

export default QuoteContext;
