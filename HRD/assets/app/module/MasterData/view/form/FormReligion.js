Ext.define('HRIS.module.MasterData.view.form.FormReligion',{
   	extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
	title		: 'Form Religion',
	alias		: 'widget.formreligion',
	id			: 'formreligion',
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
						fieldLabel	: 'Religion Name',
						allowBlank	: false,
						name 		: 'name',
						emptyText	: 'Nama Religion',
						anchor		: '100%'	
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