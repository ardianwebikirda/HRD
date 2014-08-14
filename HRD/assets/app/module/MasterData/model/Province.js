Ext.define('HRIS.module.MasterData.model.Province',{
	extend 	: 'Ext.data.Model',
	fields	: [
		{
			name : 'id', 
			type : 'string'
		},
		{
			name : 'id_country', 
			type : 'string'
		},
		{
			name : 'country', 
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