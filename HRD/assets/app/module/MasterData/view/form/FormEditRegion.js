Ext.define('HRIS.module.MasterData.view.form.FormEditRegion',{
   	extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
	title		: 'Form Region',
    store       : 'HRIS.module.MasterData.store.UpdateRegion',
    requires    : ['HRIS.module.MasterData.store.UpdateRegion'],
	alias		: 'widget.formeditregion',
	id			: 'formeditregion',
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
                        fieldLabel  : 'ID Region',
                        allowBlank  : false,
                        name        : 'id',
                        anchor      : '100%'    
                    },
                    {
                        xtype       : 'combo',
                        name        : 'id_province',
                        emptyText   : 'Type to Select Province',
                        fieldLabel  : 'Province',
                        autoScroll  : false,
                        store       : Ext.create('HRIS.module.MasterData.store.UpdateProvince'),
                        displayField: 'name',
                        valueField  : 'id',
                        anchor      : '100%',
                        listeners: {
                            buffer: 50,
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
                        fieldLabel  : 'Code Region',
                        allowBlank  : false,
                        name        : 'code',
                        dataIndex   : 'code',
                        emptyText   : 'Code Region',
                        anchor      : '100%'    
                    },
                    {
						xtype		: 'textfield',
						fieldLabel	: 'Region Name',
						allowBlank	: false,
						name 		: 'name',
						emptyText	: 'Region Name',
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