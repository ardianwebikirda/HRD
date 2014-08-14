Ext.define('HRIS.module.MasterHR.view.form.FormEditJobStatus',{
   	extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
	title		: 'Form JobStatus',
    store       : 'HRIS.module.MasterHR.store.JobStatus',
    requires    : ['HRIS.module.MasterHR.store.JobStatus'],
	alias		: 'widget.formeditjobstatus',
	id			: 'formeditjobstatus',
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
                        fieldLabel  : 'ID Job Status',
                        allowBlank  : false,
                        name        : 'id',
                        anchor      : '100%'    
                    },
                    {
						xtype		: 'textfield',
						fieldLabel	: 'Job Status Name',
						allowBlank	: false,
						name 		: 'name',
                        dataIndex   : 'name',
						emptyText	: 'Nama Job Status',
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