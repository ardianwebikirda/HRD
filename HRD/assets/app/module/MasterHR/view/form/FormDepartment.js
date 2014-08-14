Ext.define('HRIS.module.MasterHR.view.form.FormDepartment',{
   	extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
	title		: 'Form Department',
    store       : 'HRIS.module.MasterHR.store.Department',
    requires    : ['HRIS.module.MasterHR.store.Department'],
	alias		: 'widget.formdepartment',
	id			: 'formdepartment',
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
                        fieldLabel  : 'ID Job Level',
                        allowBlank  : false,
                        name        : 'id',
                        anchor      : '100%'    
                    },
                    {
                        xtype       : 'textfield',
                        fieldLabel  : 'Code',
                        allowBlank  : false,
                        name        : 'code',
                        dataIndex   : 'code',
                        emptyText   : 'Set Code Here',
                        anchor      : '100%'    
                    },
                    {
						xtype		: 'textfield',
						fieldLabel	: 'Name',
						allowBlank	: false,
						name 		: 'name',
                        dataIndex   : 'name',
						emptyText	: 'Nama Department',
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