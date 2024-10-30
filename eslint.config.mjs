import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: globals.node,  // Use `globals.node` instead of `globals.browser` for Node.js
      ecmaVersion: "latest",  // Set ECMAScript version to the latest
      sourceType: "module"    // Set module type to use import/export
    }
  },
  pluginJs.configs.recommended,  // Extend recommended settings
];
