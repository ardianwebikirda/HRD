Ext.define('HRIS.module.MasterData.model.Country',{
	extend 	: 'Ext.data.Model',
	fields	: [
		{
			name : 'id', 
			type : 'string'
		},
		{
			name : 'code', 
			type : 'string'
		},
		{
			name : 'name', 
			type : 'string'
		},
		{
			name : 'phone', 
			type : 'string'
		}
	]
});