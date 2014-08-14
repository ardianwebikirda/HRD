Ext.define('HRIS.module.MasterData.view.form.FormProvince',{
   	extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
	title		: 'Form Province',
    requires    : ['HRIS.module.MasterData.store.MinCountry'],
	alias		: 'widget.formprovince',
	id			: 'formprovince',
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
                        xtype       : 'combobox',
                        name        : 'country',
                        emptyText   : 'Type to Select Country',
                        fieldLabel  : 'Country',
                        autoScroll  : false,
                        store       : Ext.create('HRIS.module.MasterData.store.MinCountry'),
                        displayField: 'name',
                        valueField  : 'id',
                        anchor      : '100%',
                        listeners: {
                            buffer: 100,
                            change: function() {
                              var store = this.store;
                              //store.suspendEvents();
                              store.clearFilter();
                              //store.resumeEvents();
                              store.filter({
                                  property: 'name',
                                  anyMatch: true,
                                  value   : this.getValue()
                              });
                            }
                        }
                    },
                    {
                        xtype       : 'textfield',
                        fieldLabel  : 'Code Province',
                        allowBlank  : false,
                        name        : 'code',
                        emptyText   : 'Code Province',
                        anchor      : '100%'    
                    },
                    {
						xtype		: 'textfield',
						fieldLabel	: 'Province Name',
						allowBlank	: false,
						name 		: 'name',
						emptyText	: 'Nama Province',
						anchor		: '100%'	
					},
                    {
                        text    : '-- Pada combobox country ketik nama country otomatis akan keluar',
                        height  : 20,
                        xtype   : 'label'
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