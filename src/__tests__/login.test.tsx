import { expect, test, vi } from "vitest";
import App from "../App";
import { fireEvent, render, screen, waitFor } from "../utils/test-utils";
import { MAX_LOGIN_ATTEMPT } from "../utils/constant";

test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2 === 3);
});

describe("Login Form Test", () => {
  it("renders login form correctly", () => {
    render(<App />);
    expect(screen.getByText("Login Form")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  it("submit invalid Email", async () => {
    render(<App />);
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(emailInput, { target: { value: "atufefeny0@soh" } });
    fireEvent.change(passwordInput, { target: { value: "9uQFfffefF1Lh" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Invalid Email");
    });
  });

  it("submit valid login credentials", async () => {
    render(<App />);

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(emailInput, { target: { value: "atuny0@sohu.com" } });
    fireEvent.change(passwordInput, { target: { value: "9uQFF1Lh" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Welcome Home !!!")).toBeInTheDocument();
    });
  });

  it("submit invalid login credentials", async () => {
    render(<App />);
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(emailInput, { target: { value: "atuny0@sohu.com" } });
    fireEvent.change(passwordInput, { target: { value: "9uQdfdffFF1Lh" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Invalid credentials");
    });
  });

  it("limit Attempt wrong credential", async () => {
    render(<App />);
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(emailInput, { target: { value: "atuny0@sohu.com" } });
    fireEvent.change(passwordInput, { target: { value: "9uQdfdffFF1Lh" } });

    for (let attemp = 1; attemp <= MAX_LOGIN_ATTEMPT; attemp++) {
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(
          screen.getByText(
            `Failed Attempts Left : ${MAX_LOGIN_ATTEMPT - attemp}`
          )
        ).toBeInTheDocument();

        if (attemp === MAX_LOGIN_ATTEMPT) {
          expect(
            screen.getByText("Login Attempt Exhausted")
          ).toBeInTheDocument();
        }
      });
    }
  });
});
