import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { theme } from './App'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store'
import {Provider} from 'react-redux'
import {QueryClientProvider,QueryClient} from 'react-query'
import { ThemeProvider } from '@emotion/react'
const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnMount:false,
      refetchOnReconnect:true,
      refetchOnWindowFocus:false,
      // refetchInterval:10000,
      // refetchIntervalInBackground:true,
    }
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
  <QueryClientProvider client={queryClient}  >
    <Provider store={store}>
    <App />
  </Provider>
  </QueryClientProvider>
  </BrowserRouter>
  </ThemeProvider>
  ,
)
