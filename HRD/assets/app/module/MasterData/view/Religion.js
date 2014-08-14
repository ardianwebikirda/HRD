Ext.define('HRIS.module.MasterData.view.Religion',{
	extend		: 'Ext.panel.Panel',
	title 		: 'Religion',
	iconCls		: 'icon-book_go',
	alias		: 'widget.Religion',
	id			: 'Religion',
	layout		: 'fit',
	requires	: ['HRIS.module.MasterData.view.grid.GridReligion'],
	height		: 250,
	width		: 1000,
	closable	: true,
	items		: [
		{xtype	: 'gridreligion'},
	]
});