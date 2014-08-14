Ext.define('HRIS.module.MasterData.view.Province',{
	extend		: 'Ext.panel.Panel',
	title 		: 'Province',
	iconCls		: 'icon-flag_blue',
	alias		: 'widget.Province',
	id			: 'Province',
	layout		: 'fit',
	requires	: ['HRIS.module.MasterData.view.grid.GridProvince'],
	height		: 250,
	width		: 1000,
	closable	: true,
	items		: [
		{xtype	: 'gridprovince'},
	]
});