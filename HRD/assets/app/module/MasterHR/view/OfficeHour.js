Ext.define('HRIS.module.MasterHR.view.OfficeHour',{
	extend		: 'Ext.panel.Panel',
	title 		: 'OfficeHour',
	iconCls		: 'icon-clock',
	alias		: 'widget.OfficeHour',
	id			: 'OfficeHour',
	layout		: 'fit',
	requires	: ['HRIS.module.MasterHR.view.grid.GridOfficeHour'],
	height		: 250,
	width		: 1000,
	closable	: true,
	items		: [
		{xtype	: 'gridofficehour'},
	]
});