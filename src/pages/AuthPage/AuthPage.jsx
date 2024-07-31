import React, { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function AuthPage({ setUser }) {
  const [showButton, setShowButton] = useState(false);

  return (
    <main>
      <h1 className="main-heading">AuthPage</h1>
      <button onClick={() => setShowButton(!showButton)}>
        {!showButton ? "SIGN UP" : "LOG IN"}
      </button>
      {showButton ? (
        <SignUpForm setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </main>
  );
}
