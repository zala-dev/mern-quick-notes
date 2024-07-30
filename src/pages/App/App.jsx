import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import NewNotePage from "../NewNotePage/NewNotePage";
import AuthPage from "../AuthPage/AuthPage";
import NotesPage from "../NotesPage/NotesPage";
import NavBar from "../../components/NavBar/NavBar";

import { getUser } from "../../utils/user-service";

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="app-container">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/notes/new" element={<NewNotePage />} />
            <Route path="/notes" element={<NotesPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
