import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["./__tests__/teardown-users.ts"],
};

export default jestConfig;
