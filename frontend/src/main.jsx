import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@/sass/style.scss';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: Infinity
        }
    }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
              <App />
          <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
  </StrictMode>,
)
