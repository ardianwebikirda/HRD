Ext.define('HRIS.module.MasterHR.model.Department',{
	extend 	: 'Ext.data.Model',
	fields 	: [
		{name : 'id', type : 'string'},
		{name : 'code', type : 'string'},
		{name : 'name', type : 'string'},
		{name : 'isactive', type : 'string'}
	]
});