module.exports = {
    "setupFilesAfterEnv": [
        "<rootDir>/jest.setup.ts"
    ],
    "roots": [
        "<rootDir>/__tests__"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
}