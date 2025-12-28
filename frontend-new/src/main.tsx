import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App';
import './index.css';

// Ensure the root element takes full height
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Add global styles classes
document.body.classList.add('antialiased', 'text-gray-900', 'bg-gray-50', 'dark:bg-gray-900');
rootElement.classList.add('h-full');

const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);