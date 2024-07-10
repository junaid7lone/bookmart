import React from 'react';
import BookList from './components/BookList';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Book Web App</h1>
      </header>
      <main>
        <BookList />
      </main>
    </div>
  );
};

export default App;
