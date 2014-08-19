Ext.define('HRIS.module.Presence.view.TabAttendance',{
	extend		: 'Ext.form.Panel',
	alias 		: 'widget.tabattendance',
	id			: 'tabattendance',
	margins 	: '1px 1px 1px 1px',
	frame 		: true,
	layout 		: 'fit',
	requires 	: [
		'HRIS.module.Presence.view.form.FormAttendance',
		'HRIS.module.Presence.view.grid.GridAttendance'
	],
    height      : 250,
    width       : 1000,
	layout 		: {
		type 	: 'vbox',
		align 	: 'stretch',
		padding : '2px'
	},
	items		: [
		{ xtype : 'formattendance', flex : 0.7, margins : '1px 1px 10px 1px', },
		{ xtype : 'gridattendance', flex : 1.3}
	]
});
