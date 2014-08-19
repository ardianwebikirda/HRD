Ext.define('HRIS.module.Presence.view.Attendance',{
	extend 		: 'Ext.panel.Panel',
	title		: 'Data Attendance',
	iconCls		: 'icon-clock_go',
	alias		: 'widget.Attendance',
	id			: 'Attendance',
	iconCLs		: 'icon-user_suit_black',
	plain 		: true,
	closable	: true,
	requires	: [
		'HRIS.module.Presence.view.grid.GridAttEmployee',
		'HRIS.module.Presence.view.TabAttendance'
	],
	layout		: {
		type	: 'hbox',
		align 	: 'stretch'
	},
	    defaults    : {
        flex    : 1
    },
	items		: [
		{
			xtype	: 'gridattemployee',
			flex	: 0.8
		},
		{
			xtype	: 'tabattendance',
			flex	: 2
		}
	]
});