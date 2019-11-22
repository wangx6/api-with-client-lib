module.exports = function() {
	var me = this;
	var $ = require('jquery');

	// inject value into template
	Object.keys(me.data).forEach(function(key) {
		me.template = me.template.replace('{{' + key + '}}', me.data[key]);
	});

	// bind the template to the root element
	me.root.html(me.template);
	
};