Ext.define('HRIS.module.MasterHR.view.JobLevel',{
	extend		: 'Ext.panel.Panel',
	title 		: 'JobLevel',
	iconCls		: 'icon-medal_gold_1',
	alias		: 'widget.JobLevel',
	id			: 'JobLevel',
	layout		: 'fit',
	requires	: ['HRIS.module.MasterHR.view.grid.GridJobLevel'],
	height		: 250,
	width		: 1000,
	closable	: true,
	items		: [
		{xtype	: 'gridjoblevel'},
	]
});