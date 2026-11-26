import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import { MotionPrefsProvider } from './providers/MotionPrefs';
import { SmoothScrollProvider } from './providers/SmoothScroll';
import { IntroProvider } from './providers/Intro';
import { ScrollSignalsProvider } from './providers/ScrollSignals';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MotionPrefsProvider>
        <SmoothScrollProvider>
          <ScrollSignalsProvider>
            <IntroProvider>
              <App />
            </IntroProvider>
          </ScrollSignalsProvider>
        </SmoothScrollProvider>
      </MotionPrefsProvider>
    </BrowserRouter>
  </StrictMode>,
);
