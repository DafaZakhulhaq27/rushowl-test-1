import { SyntheticEvent, useCallback, useRef, useState } from "react";
import "./App.css";
import fetcher from "./utils/fetcher";
import axios from "axios";

function App() {
  const [currentPage, setCurrentPage] = useState<"login" | "home">("login");
  const [loading, setIsLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        await fetcher.post("/auth/login", {
          // using split("@")[0] because the dummy API only provides login
          // with a username, while in the requirements test you have to use email.
          // so I used split to remove the email
          username: emailRef.current?.value.split("@")[0],
          password: passwordRef.current?.value,
        });

        setCurrentPage("home");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.message);
        } else {
          alert(JSON.stringify(error));
        }
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [emailRef, passwordRef]
  );

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
      <button type="submit" disabled={loading}>
        {loading ? "Loading" : "Submit"}
      </button>
    </form>
  );
}

export default App;
