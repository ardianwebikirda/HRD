Ext.define('HRIS.module.MasterHR.view.form.FormDepartment2',{
   	extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
	title		: 'Form Department',
	alias		: 'widget.formdepartment2',
	id			: 'formdepartment2',
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
                        name        : 'id_company',
                        fieldLabel  : 'ID Company',
                        anchor      : '100%'
                    },
                    {
						xtype         : 'combobox',
						fieldLabel    : 'Name',
                        store         : Ext.create('HRIS.module.MasterHR.store.Department'),
                        displayField  : 'name',
                        valueField    : 'id',
						allowBlank    : false,
						name          : 'name',
                        dataIndex     : 'name',
						emptyText     : 'Nama Department',
						anchor        : '100%',
                        listConfig  : {
                            getInnerTpl: function() {
                                return '{code} | {name}';
                            }
                        }	
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
                text   : 'Pilih Department',
                xtype  : 'button',
                iconCls: 'icon-disk',
                action : 'saveDept'
            }
        ];
		me.callParent(arguments);
	}
});