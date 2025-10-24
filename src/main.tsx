import { createRoot } from 'react-dom/client';
import '../src/global.css';
import App from './app.tsx';

createRoot(document.getElementById('root')!).render(<App />);
