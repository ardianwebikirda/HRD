Ext.define('HRIS.module.MasterHR.model.JobTitle',{
	extend 	: 'Ext.data.Model',
	fields	: [
		{
			name : 'id', 
			type : 'string'
		},
		{
			name : 'id_joblevel', 
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