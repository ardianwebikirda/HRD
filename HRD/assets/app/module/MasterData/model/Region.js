Ext.define('HRIS.module.MasterData.model.Region',{
	extend 	: 'Ext.data.Model',
	fields	: [
		{
			name : 'id', 
			type : 'string'
		},
		{
			name : 'id_province', 
			type : 'string'
		},
		{
			name : 'province', 
			type : 'string'
		},
		{
			name : 'code', 
			type : 'string'
		},
		{
			name : 'name', 
			type : 'string'
		}
	]
});