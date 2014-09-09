function addTooltip(value, metadata) {
    metadata.tdAttr = 'data-qtip="' + 'Select & Double Click To Edit Data' + '"';
    return value;
}

Ext.define('HRIS.module.MasterHR.view.grid.GridEmployee',{
	extend 		: 'Ext.grid.Panel',
	title		: 'List Employee',
	alias 		: 'widget.gridemployee',
	store 		: 'HRIS.module.MasterHR.store.Employee',
	id 			: 'gridemployee',
	iconCls		: 'icon-application_view_columns',
	margins 	: '1px 1px 1px 1px',
	tooltip 	: 'Double Click To Edit Data',
	selModel 	: {
		selType 	: 'checkboxmodel',
		mode 		: 'MULTI',
		checkOnly	: true,
		width		: '3%',
		action 		: 'selected'
	},
	dockedItems		: [{
			xtype			: 'pagingtoolbar',
			store 			: 'HRIS.module.MasterHR.store.Employee',
			dock 			: 'bottom',
			displayInfo		: true
	}],
	columns		: [
		{
			text 		: 'NO',
			xtype		: 'rownumberer',
			width		: '3%'
		},
		{
			text 		: 'CODE',
			dataIndex	: 'code',
			renderer 	: addTooltip
		},
		{
			text 		: 'FIRST NAME',
			dataIndex	: 'fname',
			width		: '15%',
			renderer 	: addTooltip
		},
		{
			text 		: 'LAST NAME',
			dataIndex	: 'lname',
			width		: '15%',
			renderer 	: addTooltip
		},
		{
			text 		: 'COMPANY',
			dataIndex	: 'name_company',
			width		: '23%',
			renderer 	: addTooltip
		},
		{
			text 		: 'DEPARTMENT',
			dataIndex	: 'name_department',
			width		: '31%',
			renderer 	: addTooltip
		}
	],
	tbar		: [
		{xtype : 'button', text : 'Add', iconCls : 'icon-add', action : 'add'},
		{xtype : 'button', text : 'Delete', iconCls : 'icon-delete', action : 'delete'},
		'->',
		{
			xtype			: 'textfield',
			emptyText		: 'Search Here ....',
			width			: '35%',
			caseSensitive	: false,
			enableKeyEvents	: true,
			action			: 'search'
		}
	]
});