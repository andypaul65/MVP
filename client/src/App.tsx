import React from 'react';
import MvpPage from './pages/MvpPage';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css'

// Main App component, serving as the root for the MVP UI.
// Educational note: Functional component structure with clear imports and exports.
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <MvpPage />
    </ErrorBoundary>
  );
};

export default App;
