Ext.define('HRIS.module.MasterHR.view.form.FormJobTitle',{
   	extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
	title		: 'Form Job Title',
	alias		: 'widget.formjobtitle',
	id			: 'formjobtitle',
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
                        xtype       : 'combobox',
                        fieldLabel  : 'Level',
                        allowBlank  : false,
                        name        : 'level',
                        autoScroll  : false,
                        store       : Ext.create('HRIS.module.MasterHR.store.JobLevel'),
                        displayField : 'name',
                        valueField  : 'id',
                        emptyText   : 'Set The Level Here',
                        anchor      : '100%'    
                    },
                    {
						xtype		: 'textfield',
						fieldLabel	: 'Job Title Name',
						allowBlank	: false,
						name 		: 'name',
						emptyText	: 'Type Job Title Name Here ...',
						anchor		: '100%'	
					},
                    {
                        xtype       : 'checkbox',
                        name        : 'isactive',
                        tooltip     : 'Activation',
                        fieldLabel  : 'Active',
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