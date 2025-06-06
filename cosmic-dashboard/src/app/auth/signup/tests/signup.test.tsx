import { fireEvent, render, screen, act, waitFor } from "@testing-library/react";
import supabase from "@/app/utils/supabaseClient";
import SignUp from "../page";

const push = jest.fn();
jest.mock("next/navigation", () => ({
	useRouter: () => ({
		push: push,
	}),
}));

jest.mock("@/app/utils/supabaseClient", () => ({
	auth: {
		signUp: jest.fn(),
	},
}));

describe("Sign Up Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the signup form", () => {
		render(<SignUp />);
		expect(screen.getByRole("form")).toBeInTheDocument();
		expect(screen.getByLabelText("Email:")).toBeInTheDocument();
		expect(screen.getByLabelText("Password:")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Sign Up Button" })).toBeInTheDocument();
	});

	it("handles successful sign up and redirects to dashboard", async () => {
		const mockSignUp = supabase.auth.signUp as jest.Mock;
		mockSignUp.mockResolvedValue({
			data: { user: { id: 123, email: "test@example.com" } },
			error: null,
		});

		jest.useFakeTimers();
		render(<SignUp />);

		const emailInput = screen.getByLabelText("Email:");
		const passwordInput = screen.getByLabelText("Password:");
		const submitBtn = screen.getByRole("button", { name: "Sign Up Button" });

		act(() => {
			fireEvent.change(emailInput, { target: { value: "test@example.com" } });
			fireEvent.change(passwordInput, { target: { value: "password123" } });
			fireEvent.click(submitBtn);
		});

		await waitFor(() => {
			expect(submitBtn).toHaveTextContent("Signing up...");
			expect(submitBtn).toBeDisabled();
		});

		await waitFor(() => {
			expect(mockSignUp).toHaveBeenCalledWith({
				email: "test@example.com",
				password: "password123",
			});
			expect(screen.getByText("Sign up successful! Redirecting...")).toBeInTheDocument();
		});

		act(() => {
			jest.advanceTimersByTime(2000);
		});

		expect(push).toHaveBeenCalledWith("/dashboard");

		jest.useRealTimers();
	});

	it("handles errors from supabase", async () => {
		const mockSignUp = supabase.auth.signUp as jest.Mock;
		mockSignUp.mockResolvedValue({
			data: null,
			error: { message: "Invalid email or password" },
		});

		render(<SignUp />);

		const emailInput = screen.getByLabelText("Email:");
		const passwordInput = screen.getByLabelText("Password:");
		const submitBtn = screen.getByRole("button", { name: "Sign Up Button" });

		act(() => {
			fireEvent.change(emailInput, { target: { value: "test@example.com" } });
			fireEvent.change(passwordInput, { target: { value: "password123" } });
			fireEvent.click(submitBtn);
		});

		await waitFor(() => {
			expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
			expect(submitBtn).not.toBeDisabled();
		});
	});
});
