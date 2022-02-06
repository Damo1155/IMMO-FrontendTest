module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    globals: {
        $: "readonly"
    },
    extends: [
        "plugin:vue/essential",
        "@vue/airbnb",
        "@vue/typescript",
        "@vue/typescript/recommended"
    ],
    plugins: [
        "vue"
    ],
    rules: {
        "indent": "off",
        "one-var": "off",
        "eol-last": "off",
        "quotes": "double",
        "unicode-bom": "off",
        "import/no-unresolved": "off",

        "quotes": ["error", "double"],
        "comma-dangle": ["error", "never"],
        "linebreak-style": ["error", "windows"],
        "operator-linebreak": ["error", "after"],

        "object-curly-newline": [
            "error",
            {
                "ImportDeclaration": {
                    "multiline": true,
                    "minProperties": 4
                }
            }
        ],

        "prefer-destructuring": [
            "error",
            {
                "object": true,
                "array": false // Performance impact on large datasets so should be coded based on the situation
            }
        ],

        // Vue Configuration
        "vue/no-v-for-template-key": "off",
        "vue/no-multiple-template-root": "off",
        "vuejs-accessibility/label-has-for": "off", // Disabled as the implementation isn't right for our requirements
        "vuejs-accessibility/heading-has-content": "off",

        // Environment Configuration
        "no-console": "warn",
        "no-shadow": "off", // Disabled as need the TS version
        "import/named": "off", // Disabled as throwing false positives against the 'api.js' file
        "consistent-return": "off", // Disabled as throwing false positives against the 'StringService' file
        "@typescript-eslint/no-shadow": ["error"],
        "import/extensions": "off"
    },
    overrides: [
        {
            files: [
                "*.vue"
            ],
            rules: {
                "max-len": "off",
                "vue/max-len": [
                    "error",
                    {
                        code: 200,
                        comments: 150,
                        template: 9000,
                        ignoreUrls: true,
                        ignoreStrings: true,
                        ignoreRegExpLiterals: true,
                        ignoreTemplateLiterals: true
                    }
                ]
            }
        }
    ]
}