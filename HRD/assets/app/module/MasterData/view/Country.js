Ext.define('HRIS.module.MasterData.view.Country',{
	extend		: 'Ext.panel.Panel',
	title 		: 'Country',
	iconCls		: 'icon-flag_red',
	alias		: 'widget.Country',
	id			: 'Country',
	layout		: 'fit',
	requires	: ['HRIS.module.MasterData.view.grid.GridCountry'],
	height		: 250,
	width		: 1000,
	closable	: true,
	items		: [
		{xtype	: 'gridcountry'},
	]
});