Ext.define('HRIS.module.MasterHR.view.JobTitle',{
	extend		: 'Ext.panel.Panel',
	title 		: 'Job Title',
	iconCls		: 'icon-medal_bronze_1',
	alias		: 'widget.JobTitle',
	id			: 'JobTitle',
	layout		: 'fit',
	requires	: ['HRIS.module.MasterHR.view.grid.GridJobTitle'],
	height		: 250,
	width		: 1000,
	closable	: true,
	items		: [
		{xtype	: 'gridjobtitle'},
	]
});