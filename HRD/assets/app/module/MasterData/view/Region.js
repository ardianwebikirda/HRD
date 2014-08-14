Ext.define('HRIS.module.MasterData.view.Region',{
	extend		: 'Ext.panel.Panel',
	title 		: 'Region',
	iconCls		: 'icon-flag_green',
	alias		: 'widget.Region',
	id			: 'Region',
	layout		: 'fit',
	requires	: ['HRIS.module.MasterData.view.grid.GridRegion'],
	height		: 250,
	width		: 1000,
	closable	: true,
	items		: [
		{xtype	: 'gridregion'},
	]
});