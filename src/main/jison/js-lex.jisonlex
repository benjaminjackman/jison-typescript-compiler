digit [0-9]
id [a-zA-Z_\$][a-zA-Z0-9_\$]*
esc \\


%%


"//".*                          /* ignore comment*/
"/*".*                          /* ignore c-style comment*/
\s+                             /* skip whitespace */
"null"                          return 'NULLTOKEN'
"true"                          return 'TRUETOKEN'
"false"                         return 'FALSETOKEN'

"var"                           return 'VAR'
"with"                          return 'WITH'
"switch"                        return 'SWITCH'
"function"                      return 'FUNCTION'
"debugger"                      return 'DEBUGGER'


{id}                            return 'IDENT'
{digit}                         return 'NUMBER'
"\"(?:{esc}[\"bfnrt/{esc}]|{esc}u[a-fA-F0-9]{4}|[^\"{esc}])*\"", "yytext = yytext.substr(1,yyleng-2); return 'STRING';"

'/'                             return '/'
'/='                             return 'DIVEQUAL'
'='                             return '='
';'                             return ';'
','                             return ','
'.'                             return '.'
'('                             return '('
')'                             return ')'
'['                             return '['
']'                             return ']'
'{'                             return 'OPENBRACE'
'}'                             return 'CLOSEBRACE'


<<EOF>>                         return 'EOF';