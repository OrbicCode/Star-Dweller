import { render, screen } from "@testing-library/react";
import SignUp from "../page";

jest.mock("next/navigation", () => ({
	useRouter: () => ({
		push: jest.fn(),
	}),
}));

describe("Sign Up Page", () => {
	it("renders the signup form", () => {
		render(<SignUp />);
		expect(screen.getByRole("form")).toBeInTheDocument();
		expect(screen.getByLabelText("Email:")).toBeInTheDocument();
		expect(screen.getByLabelText("Password:")).toBeInTheDocument();
	});
});
