import "./App.css";
import { useLoginForm } from "./hooks/login";

function App() {
  const { currentPage, isLoading, handleSubmit, emailRef, passwordRef } =
    useLoginForm();

  if (currentPage === "home") {
    return <h1>Welcome Home !!!</h1>;
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Login Form</h2>
      <div className="form-input">
        <label htmlFor="email">Username</label>
        <input
          ref={emailRef}
          type="email"
          name="email"
          placeholder="Email..."
          required
        />
      </div>
      <div className="form-input">
        <label htmlFor="email">Password</label>
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password..."
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading" : "Submit"}
      </button>
    </form>
  );
}

export default App;
