import * as nearley from "nearley";
import grammar from "./formula";

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// Parse some input
const input = "=SUM(1,2,3)";
parser.feed(input);

// The results are in parser.results
console.log(parser.results);
