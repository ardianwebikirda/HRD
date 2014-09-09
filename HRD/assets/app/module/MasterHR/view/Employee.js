Ext.define('HRIS.module.MasterHR.view.Employee',{
	extend 		: 'Ext.panel.Panel',
	title		: 'Data Employee',
	iconCls		: 'icon-user_suit_black',
	alias		: 'widget.Employee',
	id			: 'Employee',
	iconCLs		: 'icon-user_suit_black',
	layout		: 'accordion',
	plain 		: true,
	closable	: true,
	requires	: [
		'HRIS.module.MasterHR.view.grid.GridEmployee'
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
			region	: 'west',
			xtype	: 'gridemployee',
			flex	: 0.8
		}
	]
});