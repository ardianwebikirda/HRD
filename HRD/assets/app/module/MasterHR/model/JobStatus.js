Ext.define('HRIS.module.MasterHR.model.JobStatus',{
	extend 	: 'Ext.data.Model',
	fields	: [
		{
			name : 'id', 
			type : 'string'
		},
		{
			name : 'level', 
			type : 'string'
		},
		{
			name : 'name', 
			type : 'string'
		},
		{
			name : 'isactive',
			type : 'string'
		}
	]
});