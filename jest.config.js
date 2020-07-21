require("dotenv").config();

module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json",
        },
    },
    moduleFileExtensions: [
        "js",
        "ts",
        "tsx",
    ],
    setupFiles: ["jest-date-mock"],
    testEnvironment: "node",
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
};
