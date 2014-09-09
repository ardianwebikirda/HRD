Ext.define('HRIS.module.Presence.view.TabUpload',{
	extend		: 'Ext.tab.Panel',
	alias 		: 'widget.tabupload',
	id			: 'tabupload',
	margins 	: '1px 1px 1px 1px',
	frame 		: true,
	requires 	: [
		'HRIS.module.Presence.view.grid.GridAttEmployee',
		'HRIS.module.Presence.view.grid.GridUpload'
	],
	layout 		: {
		type	: 'fit'
	},
	items		: [
		{ xtype : 'gridattemployee', flex : 1 },
		{ xtype : 'gridupload', flex : 1 }
	]
});