Ext.define('HRIS.module.MasterHR.view.TabEmployee',{
	extend		: 'Ext.tab.Panel',
	alias 		: 'widget.tabemployee',
	id			: 'tabemployee',
	frame 		: true,
	layout		: 'auto',
	layout 		: 'fit',
	margins 	: '1px 1px 1px 1px',
	requires 	: ['HRIS.module.MasterHR.view.form.FormEmployee'],
	items		: [
		{ xtype : 'formemployee' }
	]
});

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
		'HRIS.module.MasterHR.view.grid.GridEmployee',
		'HRIS.module.MasterHR.view.TabEmployee'

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
		},
		{
			region	: 'center',
			xtype	: 'tabemployee',
			flex	: 2
		}
	]
});