Ext.define('HRIS.module.MasterData.view.form.FormEditProvince',{
   	extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
	title		: 'Form Province',
	alias		: 'widget.formeditprovince',
	id			: 'formeditprovince',
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
                        fieldLabel  : 'ID Province',
                        allowBlank  : false,
                        name        : 'id',
                        anchor      : '100%'    
                    },
                    {
                        xtype       : 'combobox',
                        name        : 'id_country',
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
                        dataIndex   : 'code',
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