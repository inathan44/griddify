// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
let grammar: any;

(function () {
  function id(x) {
    return x[0];
  }
  grammar = {
    Lexer: undefined,
    ParserRules: [
      {
        name: "start",
        symbols: [{ literal: "=" }, "func"],
        postprocess: function (d) {
          return d[1];
        },
      },
      { name: "start", symbols: ["cell"], postprocess: id },
      { name: "start", symbols: ["number"], postprocess: id },
      { name: "start", symbols: ["string"], postprocess: id },
      {
        name: "func",
        symbols: ["operation", { literal: "(" }, "args", { literal: ")" }],
        postprocess: function (d) {
          return { operation: d[0], args: d[2] };
        },
      },
      {
        name: "operation$string$1",
        symbols: [{ literal: "S" }, { literal: "U" }, { literal: "M" }],
        postprocess: function joiner(d) {
          return d.join("");
        },
      },
      { name: "operation", symbols: ["operation$string$1"], postprocess: id },
      {
        name: "operation$string$2",
        symbols: [
          { literal: "A" },
          { literal: "V" },
          { literal: "E" },
          { literal: "R" },
          { literal: "A" },
          { literal: "G" },
          { literal: "E" },
        ],
        postprocess: function joiner(d) {
          return d.join("");
        },
      },
      { name: "operation", symbols: ["operation$string$2"], postprocess: id },
      {
        name: "operation$string$3",
        symbols: [{ literal: "M" }, { literal: "I" }, { literal: "N" }],
        postprocess: function joiner(d) {
          return d.join("");
        },
      },
      { name: "operation", symbols: ["operation$string$3"], postprocess: id },
      {
        name: "operation$string$4",
        symbols: [{ literal: "M" }, { literal: "A" }, { literal: "X" }],
        postprocess: function joiner(d) {
          return d.join("");
        },
      },
      { name: "operation", symbols: ["operation$string$4"], postprocess: id },
      { name: "args", symbols: ["nonemptyargs"] },
      {
        name: "args",
        symbols: [],
        postprocess: function (d) {
          return d[0] || [];
        },
      },
      { name: "nonemptyargs$ebnf$1", symbols: [] },
      {
        name: "nonemptyargs$ebnf$1$subexpression$1",
        symbols: [{ literal: "," }, "arg"],
      },
      {
        name: "nonemptyargs$ebnf$1",
        symbols: ["nonemptyargs$ebnf$1", "nonemptyargs$ebnf$1$subexpression$1"],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: "nonemptyargs",
        symbols: ["arg", "nonemptyargs$ebnf$1"],
        postprocess: function (d) {
          var rest = d[1].map(function (element) {
            return element[1];
          });
          return [].concat(d[0], rest);
        },
      },
      { name: "arg", symbols: ["cell"], postprocess: id },
      { name: "arg", symbols: ["number"], postprocess: id },
      { name: "arg", symbols: ["func"], postprocess: id },
      { name: "arg", symbols: ["string"], postprocess: id },
      { name: "cell$ebnf$1", symbols: [/[a-z]/] },
      {
        name: "cell$ebnf$1",
        symbols: ["cell$ebnf$1", /[a-z]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      { name: "cell$ebnf$2", symbols: [/[0-9]/] },
      {
        name: "cell$ebnf$2",
        symbols: ["cell$ebnf$2", /[0-9]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      { name: "cell$ebnf$3$subexpression$1$ebnf$1", symbols: [/[a-z]/] },
      {
        name: "cell$ebnf$3$subexpression$1$ebnf$1",
        symbols: ["cell$ebnf$3$subexpression$1$ebnf$1", /[a-z]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      { name: "cell$ebnf$3$subexpression$1$ebnf$2", symbols: [/[0-9]/] },
      {
        name: "cell$ebnf$3$subexpression$1$ebnf$2",
        symbols: ["cell$ebnf$3$subexpression$1$ebnf$2", /[0-9]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: "cell$ebnf$3$subexpression$1",
        symbols: [
          { literal: ":" },
          "cell$ebnf$3$subexpression$1$ebnf$1",
          "cell$ebnf$3$subexpression$1$ebnf$2",
        ],
      },
      {
        name: "cell$ebnf$3",
        symbols: ["cell$ebnf$3$subexpression$1"],
        postprocess: id,
      },
      {
        name: "cell$ebnf$3",
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: "cell",
        symbols: ["cell$ebnf$1", "cell$ebnf$2", "cell$ebnf$3"],
        postprocess: function (d) {
          return (
            d[0].join("") +
            d[1].join("") +
            (d[2] ? ":" + d[2][1].join("") + d[2][2].join("") : "")
          );
        },
      },
      { name: "number$ebnf$1", symbols: [/[0-9]/] },
      {
        name: "number$ebnf$1",
        symbols: ["number$ebnf$1", /[0-9]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: "number",
        symbols: ["number$ebnf$1"],
        postprocess: function (d) {
          return parseInt(d[0].join(""), 10);
        },
      },
      { name: "string$ebnf$1", symbols: [/[^,\(\)]/] },
      {
        name: "string$ebnf$1",
        symbols: ["string$ebnf$1", /[^,\(\)]/],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: "string",
        symbols: ["string$ebnf$1"],
        postprocess: function (d) {
          return d[0].join("");
        },
      },
    ],
    ParserStart: "start",
  };
})();

export default grammar;
