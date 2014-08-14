Ext.define('HRIS.module.MasterHR.view.form.FormJobLevel',{
   	extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
	title		: 'Form JobLevel',
    store       : 'HRIS.module.MasterHR.store.JobLevel',
    requires    : ['HRIS.module.MasterHR.store.JobLevel'],
	alias		: 'widget.formjoblevel',
	id			: 'formjoblevel',
	width       : 550,
    height      : 170,
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
                        fieldLabel  : 'ID Job Level',
                        allowBlank  : false,
                        name        : 'id',
                        anchor      : '100%'    
                    },
                    {
                        xtype       : 'numberfield',
                        fieldLabel  : 'Level',
                        allowBlank  : false,
                        name        : 'level',
                        dataIndex   : 'Level',
                        emptyText   : 'Set Level Here',
                        anchor      : '100%'    
                    },
                    {
						xtype		: 'textfield',
						fieldLabel	: 'JobLevel Name',
						allowBlank	: false,
						name 		: 'name',
                        dataIndex   : 'name',
						emptyText	: 'Nama JobLevel',
						anchor		: '100%'	
					},
                    {
                        xtype       : 'checkbox',
                        name        : 'isactive',
                        dataIndex   : 'isactive',
                        fieldLabel  : 'Active',
                        anchor      : '100%',
                        inputValue   : 'isactive'
                    }
				]
			}
		];
        me.buttons = [
            {
                text   : 'Save',
                xtype  : 'button',
                iconCls: 'icon-disk',
                action : 'save'
            }
        ];
		me.callParent(arguments);
	}
});