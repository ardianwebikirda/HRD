Ext.define('HRIS.module.MasterHR.view.JobStatus',{
	extend		: 'Ext.panel.Panel',
	title 		: 'JobStatus',
	iconCls		: 'icon-medal_silver_1',
	alias		: 'widget.JobStatus',
	id			: 'JobStatus',
	layout		: 'fit',
	requires	: ['HRIS.module.MasterHR.view.grid.GridJobStatus'],
	height		: 250,
	width		: 1000,
	closable	: true,
	items		: [
		{xtype	: 'gridjobstatus'},
	]
});