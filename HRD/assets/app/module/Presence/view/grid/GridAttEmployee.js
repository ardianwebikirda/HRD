Ext.define('HRIS.module.Presence.view.grid.GridAttEmployee',{
	extend 		: 'Ext.grid.Panel',
	title		: 'List Employee',
	alias 		: 'widget.gridattemployee',
	store 		: 'HRIS.module.Presence.store.AttEmployee',
	id 			: 'gridattemployee',
	iconCls		: 'icon-application_view_columns',
	margins 	: '1px 1px 1px 1px',
	selModel 	: {
		selType 	: 'checkboxmodel',
		mode 		: 'MULTI',
		checkOnly	: true,
		width		: '3%',
		action 		: 'selected'
	},
	dockedItems		: [{
			xtype			: 'pagingtoolbar',
			store 			: 'HRIS.module.Presence.store.AttEmployee',
			dock 			: 'bottom',
			displayInfo		: false
	}],
	columns		: [
		{
			text 		: 'NO',
			xtype		: 'rownumberer',
			width		: '10%'
		},
		{
			text 		: 'CODE',
			dataIndex	: 'code',
			width		: '15%'
		},
		{
			text 		: 'FIRST NAME',
			dataIndex	: 'fname',
			width		: '30%'
		},
		{
			text 		: 'LAST NAME',
			dataIndex	: 'lname',
			width		: '35%'
		}
	],
	tbar		: [
		{xtype : 'button', text : 'Delete', iconCls : 'icon-delete', action : 'delete'},
		'->',
		{
			xtype			: 'textfield',
			emptyText		: 'Search Here ....',
			width			: '80%',
			caseSensitive	: false,
			enableKeyEvents	: true,
			action			: 'search'
		}
	]
});