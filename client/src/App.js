import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Update from './components/Update';
import AuthorForm from './components/CreateOne';

function App() {
  // state var
  const [authors, setAuthors] = useState([]);

  return (
    <div>
      <div className="App">
        <Routes>
          {/* SHOW ALL */}
          <Route
            path="/"
            element={<Main authors={authors} setAuthors={setAuthors} />}
          />

          {/* EDIT */}
          <Route path="/:id/edit" element={<Update />} />

          {/* CREATE ONE */}
          <Route path="/new" element={<AuthorForm authors={authors} setAuthors={setAuthors} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;