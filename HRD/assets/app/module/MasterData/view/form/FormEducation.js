Ext.define('HRIS.module.MasterData.view.form.FormEducation',{
   	extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
	title		: 'Form Education',
	alias		: 'widget.formeducation',
	id			: 'formeducation',
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