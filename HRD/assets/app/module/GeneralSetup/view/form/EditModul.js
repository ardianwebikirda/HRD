Ext.define('HRIS.module.GeneralSetup.view.form.EditModul', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.editmodul',
    id      : 'editmodul',
    layout  : 'fit',
    modal   : true,
    requires: [
        'HRIS.module.GeneralSetup.store.ViewModul',
    ],
    title   : 'Edit Modul',
    autoShow: true,
    height  : 500,
    width   : 500,
    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype       : 'form',
                border      : false,
                bodyPadding : 5,
                items: [
                    {
                        xtype       : 'textfield',
                        name        : 'id',
                        fieldLabel  : 'ID',
                        anchor      : '100%',
                        readOnly    : true
                    },{
                        xtype       : 'textfield',
                        name        : 'name',
                        fieldLabel  : 'Nama',
                        anchor      : '100%'
                    },{
                        xtype       : 'textfield',
                        name        : 'icon',
                        fieldLabel  : 'Icon',
                        anchor      : '100%'
                    },{
                        xtype       : 'combobox',
                        name        : 'parent',
                        emptyText   : 'Parent Modul',
                        fieldLabel  : 'Parent Modul',
                        autoScroll  : false,
                        store       : 'HRIS.module.GeneralSetup.store.ViewModul',
                        displayField: 'name',
                        valueField  : 'id',
                        anchor      : '100%'                   
                    },{
                        xtype       : 'checkbox',
                        name        : 'isactive',
                        fieldLabel  : 'Aktif',
                        anchor      : '100%',
                        inputValue   : 'isactive'
                    },{
                        xtype       : 'htmleditor',
                        name        : 'description',
                        fieldLabel  : 'Keterangan',
                        labelWidth  : 77
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