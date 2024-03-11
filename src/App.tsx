import "./App.css";
import { useLoginForm } from "./hooks/login";
import { MAX_LOGIN_ATTEMPT } from "./utils/constant";

function App() {
  const {
    failedAttempts,
    currentPage,
    isLoading,
    handleSubmit,
    emailRef,
    passwordRef,
    isForbiddenLogin,
  } = useLoginForm();

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
      {!!failedAttempts && (
        <span>Failed Attempts Left : {MAX_LOGIN_ATTEMPT - failedAttempts}</span>
      )}
      <button type="submit" disabled={isLoading || isForbiddenLogin}>
        {isLoading
          ? "Loading"
          : isForbiddenLogin
          ? "Login Attempt Exhausted"
          : "Submit"}
      </button>
    </form>
  );
}

export default App;
