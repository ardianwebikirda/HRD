Ext.define('HRIS.module.MasterData.view.form.FormEditEducation',{
   	extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
	title		: 'Form Education',
    requires    : ['HRIS.module.MasterData.store.Education'],
	alias		: 'widget.formediteducation',
	id			: 'formediteducation',
	width       : 550,
    height      : 150,
    bodyStyle   : 'padding: 7px',
    margins     :'5px 5px 5px 5px',
    layout      : 'fit',
    border      : false,
    frame       : true,
	initComponent : function(){
		var me = this;
		me.items = [
			{
				xtype		: 'form',
				border		: false,
				frame		: true,
				bodyPadding	: 5,
				items		: [
					{
                        xtype       : 'hidden',
                        fieldLabel  : 'ID Education',
                        allowBlank  : false,
                        name        : 'id',
                        anchor      : '100%'    
                    },
                    {
						xtype		: 'numberfield',
						fieldLabel	: 'Level',
						allowBlank	: false,
						name 		: 'level',
						emptyText	: 'Level',
						anchor		: '100%'	
					},
                    {
						xtype		: 'textfield',
						fieldLabel	: 'Education Name',
						allowBlank	: false,
						name 		: 'name',
						emptyText	: 'Nama Education',
						anchor		: '100%'	
					}
				]
			}
		];
        me.buttons = [
            {
                text   : 'Edit',
                xtype  : 'button',
                iconCls: 'icon-disk',
                action : 'update'
            }
        ];
		me.callParent(arguments);
	}
});