Ext.define('HRIS.module.MasterHR.view.form.FormOfficeHour',{
   	extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
	title		: 'Form OfficeHour',
    store       : 'HRIS.module.MasterHR.store.OfficeHour',
    requires    : ['HRIS.module.MasterHR.store.OfficeHour'],
	alias		: 'widget.formofficehour',
	id			: 'formofficehour',
	width       : 500,
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
						xtype		: 'textfield',
						fieldLabel	: 'OfficeHour Name',
						allowBlank	: false,
						name 		: 'name',
                        dataIndex   : 'name',
						emptyText	: 'Nama OfficeHour',
						anchor		: '100%'	
					},
                    {
                         fieldLabel  : 'Work Start',
                         xtype       : 'timefield',
                         name        : 'time_in',
                         emptyText   : 'Click For Get Work Start',
                         format      : 'H:i',
                         increment   : 30,
                         minValue    : '05:00 AM',
                         maxValue    : '11:00 PM',
                         formatValue : 'H:i:s',
                         anchor      : '100%'
                    },
                    {
                         fieldLabel  : 'Work End',
                         xtype       : 'timefield',
                         name        : 'time_out',
                         emptyText   : 'Click For Get Work End',
                         format      : 'H:i',
                         increment   : 30,
                         minValue    : '05:00 AM',
                         maxValue    : '11:00 PM',
                         formatValue : 'H:i:s',
                         anchor     : '100%'
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