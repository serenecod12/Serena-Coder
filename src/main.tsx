import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
import AuthProvider from './components/providers/auth-provider'
import { ThemeProvider } from './components/providers/theme-provider'
import './styles/index.css'

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
			  <ThemeProvider defaultTheme='dark'>
			  	<AuthProvider>
			  		<App />
			  	</AuthProvider>
			  </ThemeProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
)
