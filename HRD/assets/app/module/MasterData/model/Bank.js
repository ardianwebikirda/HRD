Ext.define('HRIS.module.MasterData.model.Bank',{
	extend 	: 'Ext.data.Model',
	fields	: [
		{
			name : 'id', 
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