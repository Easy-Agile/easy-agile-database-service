const styleRules = {
    "arrow-parens": ["warn", "as-needed"],
    "comma-dangle": ["warn", {
        arrays: "always-multiline",
        exports: "always-multiline",
        functions: "ignore",
        imports: "always-multiline",
        objects: "always-multiline",
    }],
    "function-paren-newline": "off",
    "generator-star-spacing": ["warn", {
        after: false,
        before: false,
        named: {
            after: true,
            before: false,
        },
    }],
    "newline-per-chained-call": "off",
    "lines-between-class-members": "off",
    "object-curly-newline": ["warn", {
        ObjectExpression: {
            consistent: true,
            minProperties: 2,
        }
    }],
    "operator-linebreak": "off",
    "object-property-newline": ["warn", {}],
    "sort-keys": "warn",
    "@typescript-eslint/indent": ["warn", 4, {
        SwitchCase: 1,
    }],
    "@typescript-eslint/quotes": ["warn", "double", { avoidEscape: true }],
};

const analysisRules = {
    "default-case": "off",
    "func-names": "off",
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    "import/order": "warn",
    "max-len": "off",
    "require-yield": "off",
    "no-use-before-define": "off",
    "no-plusplus": "off",
    "no-mixed-operators": ["warn", {
        "allowSamePrecedence": true
    }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "class-methods-use-this": "off",
    "max-classes-per-file": "off"
};

module.exports = {
    env: {
        browser: false,
        jest: true,
        node: true,
    },
    extends: [
        "airbnb-typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:jest/recommended",
    ],
    plugins: [
        "jest"
    ],
    rules: {
        ...analysisRules,
        ...styleRules,
        indent: ["warn", 4, {
            SwitchCase: 1,
        }],
    },
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
};
