import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	dir: "./",
});

const config: Config = {
	coverageProvider: "v8",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	transform: {
		"^.+\\.(ts|tsx)$": "babel-jest", // Use babel-jest for TypeScript/JSX files
	},
	transformIgnorePatterns: ["/node_modules/(?!(@supabase|@babel|@firebase|uuid|lodash-es)/)"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
};

export default createJestConfig(config);
