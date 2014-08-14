Ext.define('HRIS.module.MasterData.view.Education',{
	extend		: 'Ext.panel.Panel',
	title 		: 'Education',
	iconCls		: 'icon-award_star_gold_1',
	alias		: 'widget.Education',
	id			: 'Education',
	layout		: 'fit',
	requires	: ['HRIS.module.MasterData.view.grid.GridEducation'],
	height		: 250,
	width		: 1000,
	closable	: true,
	items		: [
		{xtype	: 'grideducation'},
	]
});