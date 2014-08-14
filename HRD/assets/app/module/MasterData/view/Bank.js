Ext.define('HRIS.module.MasterData.view.Bank',{
	extend		: 'Ext.panel.Panel',
	title 		: 'Bank',
	iconCls		: 'icon-money',
	alias		: 'widget.Bank',
	id			: 'Bank',
	layout		: 'fit',
	requires	: ['HRIS.module.MasterData.view.grid.GridBank'],
	height		: 250,
	width		: 1000,
	closable	: true,
	items		: [
		{xtype	: 'gridbank'},
	]
});