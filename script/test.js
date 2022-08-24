var Linter = require("eslint").Linter;
var linter = new Linter();

var messages = linter.verify("var foo", {
    rules: {
        semi: 2
    }
}, { filename: "foo.js" });
console.log(messages)