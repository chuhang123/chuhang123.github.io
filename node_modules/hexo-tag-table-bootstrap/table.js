var marked = require('marked');
/**
 * table tag
 *
 * Syntax:
 *   {% table [class] %}
 *   table
 *   {% endtable %}
 */

module.exports = function(args, content){
	var style, icon;
	if (args.length > 0)
		style = 'table '+args[0];
	else
		style ='table';
var table=marked(content);
table=table.replace("<table>", '<table class="'+style+'">');
console.log(table);
	return table;
};
