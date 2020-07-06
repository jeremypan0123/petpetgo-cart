module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "mocha": true
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "extends": [
        // "eslint:recommended",
        "plugin:react/recommended",
    ],
    "plugins": [
        "@typescript-eslint",
        "react",
        "react-hooks"
    ],

    "rules": {
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": ["error", {
            "default": "array-simple",
        }],
        "@typescript-eslint/ban-types": "error",
        "@typescript-eslint/class-name-casing": "error",
        "@typescript-eslint/explicit-member-accessibility": [
            "off",
            {
                "overrides": {
                    "constructors": "off"
                }
            }
        ],
        /**
         * 目前沒辦法檢測泛型 type 定義的 indent
         * 避開 type 的 indent 檢測
         * @issue https://github.com/typescript-eslint/typescript-eslint/issues/455
         */
        "@typescript-eslint/indent": ["warn", "tab", {
            SwitchCase: 1,
            ignoredNodes: ['TSTypeParameterInstantiation']
        }],
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                "multiline": {
                    "delimiter": "semi",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        "@typescript-eslint/member-ordering": "off",
        // "@typescript-eslint/no-angle-bracket-type-assertion": "error",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-unused-vars": ["warn",
            {
                "vars": "all",
                "args": "after-used",
                "ignoreRestSiblings": false
            }
        ],
        // "@typescript-eslint/no-triple-slash-reference": "error",
        "@typescript-eslint/no-use-before-declare": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        // "@typescript-eslint/prefer-interface": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/quotes": [
            "error",
            "single"
        ],
        "@typescript-eslint/semi": [
            "error",
            "always"
        ],
        "@typescript-eslint/type-annotation-spacing": "error",
        "@typescript-eslint/unified-signatures": "error",
        // "arrow-body-style": "error",
        "arrow-parens": [
            "off",
            "as-needed"
        ],
        "camelcase": "off",
        "comma-dangle": ["error",
            {
                "arrays": "always-multiline",
                "objects": "always-multiline",
                "imports": "always-multiline",
                "exports": "always-multiline",
                "functions": "always-multiline"
            }
        ],
        "complexity": "off",
        "constructor-super": "error",
        "curly": [
            "error",
            "multi-line"
        ],
        "dot-notation": "error",
        "eol-last": "error",
        "eqeqeq": [
            "error",
            "smart"
        ],
        "guard-for-in": "off",
        "id-blacklist": [
            "error",
            "any",
            "Number",
            "number",
            "String",
            "string",
            "Boolean",
            "boolean",
            "Undefined",
            "undefined"
        ],
        "id-match": "error",
        "import/order": "off",
        "max-classes-per-file": "off",
        "max-len": [
            "warn",
            { "code": 120 }
        ],
        "new-parens": "error",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-console": "off",
        "no-debugger": "error",
        "no-empty": "error",
        "no-eval": "error",
        "no-fallthrough": "off",
        "no-invalid-this": "off",
        "no-multiple-empty-lines": "error",
        "no-new-wrappers": "error",
        "no-shadow": [
            "off",
            {
                "hoist": "all"
            }
        ],
        "no-throw-literal": "error",
        "no-trailing-spaces": "warn",
        "no-undef-init": "error",
        "no-underscore-dangle": "off",
        "no-unsafe-finally": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "no-var": "error",
        "no-warning-comments": "warn",
        "object-shorthand": "error",
        /** 不檢測 因為不用一個 const, let, var 定義所用變數 */
        // "one-var": "error",
        "prefer-arrow/prefer-arrow-functions": "off",
        "prefer-const": "error",
        "quote-props": [
            "error",
            "consistent-as-needed"
        ],
        "radix": "error",
        "space-before-function-paren": [
            "error",
            {
                "anonymous": "always",
                "named": "never",
                "asyncArrow": "always"
            }
        ],
        "use-isnan": "error",
        "valid-typeof": "off",
        /** 不檢測 因為 nextjs 會自動設定 React in global */
        "react/react-in-jsx-scope": "off",
        /** 不檢測 因為不實作 react 的 prop-types */
        "react/prop-types": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "keyword-spacing": "warn"
    }
};
