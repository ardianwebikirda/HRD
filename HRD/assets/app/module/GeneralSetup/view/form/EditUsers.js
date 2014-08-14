Ext.define('HRIS.module.GeneralSetup.view.form.EditUsers', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.editusers',
    requires: [
        'HRIS.module.GeneralSetup.store.ViewRole'
    ],
    id      : 'editusers',
    layout  : 'fit',
    modal   : true,
    title   : 'Edit Users',
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
                        hidden      : true
                    },{
                        xtype       : 'textfield',
                        name        : 'name',
                        fieldLabel  : 'Nama',
                        anchor      : '100%'
                    },{
                        xtype       : 'textfield',
                        name        : 'firstname',
                        fieldLabel  : 'Nama Depan',
                        anchor      : '100%'
                    },{
                        xtype       : 'textfield',
                        name        : 'lastname',
                        fieldLabel  : 'Nama Belakang',
                        anchor      : '100%'
                    },{
                        xtype       : 'textfield',
                        name        : 'username',
                        fieldLabel  : 'Username',
                        anchor      : '100%'
                    },{                   
                        xtype       : 'combobox',
                        name        : 'role',
                        emptyText   : 'Role User',
                        fieldLabel  : 'Role User',
                        autoScroll  : false,
                        store       : 'HRIS.module.GeneralSetup.store.ViewRole',
                        displayField: 'name',
                        valueField  : 'id',
                        anchor      : '100%'
                    },{
                        xtype       : 'textfield',
                        name        : 'email',
                        fieldLabel  : 'Email',
                        anchor      : '100%'
                    },{
                        xtype       : 'textfield',
                        name        : 'phone',
                        fieldLabel  : 'Telephone',
                        anchor      : '100%'
                    },{
                        xtype       : 'textfield',
                        name        : 'mobile',
                        fieldLabel  : 'No Handphone',
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