import { SyntheticEvent, useCallback, useMemo, useRef, useState } from "react";
import fetcher from "../utils/fetcher";
import axios from "axios";
import { MAX_LOGIN_ATTEMPT } from "../utils/constant";

export const useLoginForm = () => {
  const [currentPage, setCurrentPage] = useState<"login" | "home">("login");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const validateEmail = useCallback((email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      if (emailRef.current?.value && !validateEmail(emailRef.current?.value)) {
        alert("Invalid Email");
        return;
      }

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
        setFailedAttempts((prevAttempts) => prevAttempts + 1);
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
    [emailRef, passwordRef, failedAttempts]
  );

  const isForbiddenLogin = useMemo(() => {
    return failedAttempts >= MAX_LOGIN_ATTEMPT;
  }, [failedAttempts]);

  return {
    failedAttempts,
    currentPage,
    isLoading,
    handleSubmit,
    emailRef,
    passwordRef,
    isForbiddenLogin,
  };
};
