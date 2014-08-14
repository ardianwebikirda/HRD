Ext.define('HRIS.module.MasterData.view.form.FormEditCountry',{
   	extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
	title		: 'Form Country',
    requires    : ['HRIS.module.MasterData.store.Country'],
	alias		: 'widget.formeditcountry',
	id			: 'formeditcountry',
	width       : 550,
    height      : 200,
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
                        fieldLabel  : 'ID Country',
                        allowBlank  : false,
                        name        : 'id',
                        anchor      : '100%'    
                    },
                    {
                        xtype       : 'textfield',
                        fieldLabel  : 'Code Country',
                        allowBlank  : false,
                        name        : 'code',
                        dataIndex   : 'code',
                        emptyText   : 'Code Country',
                        anchor      : '100%'    
                    },
                    {
						xtype		: 'textfield',
						fieldLabel	: 'Country Name',
						allowBlank	: false,
						name 		: 'name',
						emptyText	: 'Nama Country',
						anchor		: '100%'	
					},
					{
                        fieldLabel  : 'Phone Code',
                        tooltip     : 'Is Active?',
                        xtype       : 'textfield',
                        dataIndex   : 'phone',
                        name        : 'phone',
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