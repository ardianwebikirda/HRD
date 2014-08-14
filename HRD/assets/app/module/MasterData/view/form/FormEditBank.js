Ext.define('HRIS.module.MasterData.view.form.FormEditBank',{
   	extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
	title		: 'Form Bank',
    requires    : ['HRIS.module.MasterData.store.Bank'],
	alias		: 'widget.formeditbank',
	id			: 'formeditbank',
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
                        fieldLabel  : 'ID Bank',
                        allowBlank  : false,
                        name        : 'id',
                        anchor      : '100%'    
                    },
                    {
						xtype		: 'textfield',
						fieldLabel	: 'Bank Name',
						allowBlank	: false,
						name 		: 'name',
						emptyText	: 'Nama Bank',
						anchor		: '100%'	
					},
					{
                        fieldLabel  : 'Aktif',
                        tooltip     : 'Is Active?',
                        xtype       : 'checkboxfield',
                        dataIndex   : 'isactive',
                        name        : 'isactive',
                        flex        : 1
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