Ext.define('HRIS.module.MasterData.view.form.FormCountry',{
   	extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
	title		: 'Form Country',
	alias		: 'widget.formcountry',
	id			: 'formcountry',
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
                        xtype       : 'textfield',
                        fieldLabel  : 'Code Country',
                        allowBlank  : false,
                        name        : 'code',
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
                        xtype       : 'textfield',
                        fieldLabel  : 'Phone Code',
                        allowBlank  : false,
                        name        : 'phone',
                        emptyText   : 'Phone Code',
                        anchor      : '100%'    
                    }
				]
			}
		];
        me.buttons = [
            {
                text    : 'Save',
                iconCls : 'icon-disk',
                action  : 'save'
            },
            {
                text    : 'Reset',
                iconCls : 'icon-error',
                action  : 'reset'
            }
        ];
		me.callParent(arguments);
	}
});