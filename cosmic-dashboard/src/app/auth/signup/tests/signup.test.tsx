import { render, screen } from "@testing-library/react";
import SignUp from "../page";

describe("Sign Up Page", () => {
	it("renders the signup form", () => {
		render(<SignUp />);
		expect(screen.getByRole("form")).toBeInTheDocument();
	});
});
