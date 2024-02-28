start -> "=" func {% function(d) { return d[1]; } %}
       | cell {% id %}
       | number {% id %}
       | string {% id %}

func -> operation "(" args ")" {% function(d) { return { operation: d[0], args: d[2] }; } %}

operation -> "SUM" {% id %}
           | "AVERAGE" {% id %}
           | "MIN" {% id %}
           | "MAX" {% id %}

args -> nonemptyargs | null {% function(d) { return d[0] || []; } %}

nonemptyargs -> arg ("," arg):* {% function(d) { 
    var rest = d[1].map(function(element) {
        return element[1];
    });
    return [].concat(d[0], rest);
} %}

arg -> cell {% id %}
     | number {% id %}
     | func {% id %}
     | string {% id %}

cell -> [a-z]:+ [0-9]:+ (":" [a-z]:+ [0-9]:+):? {% function(d) { 
    return d[0].join('') + d[1].join('') + (d[2] ? ':' + d[2][1].join('') + d[2][2].join('') : ''); 
} %}

number -> [0-9]:+ {% function(d) { return parseInt(d[0].join(''), 10); } %}

string -> [^,\(\)]:+ {% function(d) { return d[0].join(''); } %}