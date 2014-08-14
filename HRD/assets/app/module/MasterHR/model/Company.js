Ext.define('HRIS.module.MasterHR.model.Company',{
	extend 	: 'Ext.data.Model',
	fields 	: [
		{name : 'id', type : 'string'},
		{name : 'code', type : 'string'},
		{name : 'name', type : 'string'},
		{name : 'logo', type : 'string'},
		{name : 'isactive', type : 'string'}
	]
});