Ext.define('HRIS.module.Attendance.view.TabAttendance',{
	extend		: 'Ext.tab.Panel',
	alias 		: 'widget.tabattendance',
	id			: 'tabattendance',
	margins 	: '1px 1px 1px 1px',
	requires 	: ['HRIS.module.Attendance.view.form.FormAttendance'],
	items		: [
		{ xtype : 'formattendance' }
	]
});

Ext.define('HRIS.module.Attendance.view.Attendance',{
	extend 		: 'Ext.panel.Panel',
	title		: 'Data Attendance',
	iconCls		: 'icon-clock_go',
	alias		: 'widget.Attendance',
	id			: 'Attendance',
	iconCLs		: 'icon-user_suit_black',
	plain 		: true,
	closable	: true,
	requires	: [
		'HRIS.module.Attendance.view.grid.GridAttendance',
		'HRIS.module.Attendance.view.TabAttendance'

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
			xtype	: 'gridattendance',
			flex	: 0.8
		},
		{
			xtype	: 'tabattendance',
			flex	: 2
		}
	]
});