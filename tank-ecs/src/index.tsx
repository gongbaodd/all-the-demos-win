import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './app/page';

const App = () => {
  return (
    <Home />
  );
}

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
