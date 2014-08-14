Ext.define('HRIS.module.MasterData.view.form.FormEditReligion',{
   	extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
	title		: 'Form Religion',
    requires    : ['HRIS.module.MasterData.store.Religion'],
	alias		: 'widget.formeditreligion',
	id			: 'formeditreligion',
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
                        fieldLabel  : 'ID Religion',
                        allowBlank  : false,
                        name        : 'id',
                        anchor      : '100%'    
                    },
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
                text   : 'Edit',
                xtype  : 'button',
                iconCls: 'icon-disk',
                action : 'update'
            }
        ];
		me.callParent(arguments);
	}
});