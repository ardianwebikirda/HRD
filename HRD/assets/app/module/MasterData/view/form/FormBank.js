Ext.define('HRIS.module.MasterData.view.form.FormBank',{
   	extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
	title		: 'Form Bank',
	alias		: 'widget.formbank',
	id			: 'formbank',
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
                        name        : 'isactive',
                        flex        : 1,
                        checked     : true
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