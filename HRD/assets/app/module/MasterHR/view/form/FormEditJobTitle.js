Ext.define('HRIS.module.MasterHR.view.form.FormEditJobTitle',{
   	extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
	title		: 'Form Job Title',
    store       : Ext.create('HRIS.module.MasterHR.store.JobTitle'),
    requires    : ['HRIS.module.MasterHR.store.JobTitle'],
	alias		: 'widget.formeditjobtitle',
	id			: 'formeditjobtitle',
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
                        xtype       : 'combobox',
                        name        : 'id_joblevel',
                        emptyText   : 'Level',
                        fieldLabel  : 'Level',
                        autoScroll  : false,
                        store       : 'HRIS.module.MasterHR.store.JobLevel',
                        displayField: 'name',
                        valueField  : 'id',
                        anchor      : '100%'  
                    },
                    {
						xtype		: 'textfield',
						fieldLabel	: 'Job Title Name',
						allowBlank	: false,
						name 		: 'name',
                        dataIndex   : 'name',
						emptyText	: 'Nama Job Title',
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
                text   : 'Edit',
                xtype  : 'button',
                iconCls: 'icon-disk',
                action : 'update'
            }
        ];
		me.callParent(arguments);
	}
});