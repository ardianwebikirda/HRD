Ext.define('HRIS.module.MasterHR.view.Department',{
	extend 		: 'Ext.panel.Panel',
	title 		: 'Department',
	iconCls		: 'icon-page',
	closable	: true,
	layout		: 'fit',
	requires	: ['HRIS.module.MasterHR.view.grid.GridDepartment'],
	 layout: {
        type   :'hbox',
        padding:'3',
        align  :'stretch'
    },
    defaults : {
        flex : 1
    },
	items : [
		{xtype : 'griddepartment', flex : 1.5},
	]
});