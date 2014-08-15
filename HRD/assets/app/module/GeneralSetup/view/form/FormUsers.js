Ext.define('HRIS.module.GeneralSetup.view.form.FormUsers', {
    extend      : 'Ext.window.Window',
    closeable   : true,
    modal       : true,
    title       : 'Form Users',
    requires: [
        'HRIS.module.GeneralSetup.store.ViewRole'
    ],
    alias       : 'widget.formusers',
    id          : 'formusers',
    width       : 500,
    height      : 550,
    bodyStyle   : 'padding: 7px',
    margins     :'5px 5px 5px 5px',
    layout      : 'fit',
    border      : false,
    frame       : true,
    initComponent: function() {
        var me = this;
        me.items  = [
            {
                xtype           : 'form',
                border          : false,
                frame           : true,
                bodyPadding     : 5,
                items       : [
                    {
                        xtype       : 'textfield',
                        name        : 'name',
                        allowBlank  : true,
                        fieldLabel  : 'Name',
                        emptyText   : 'Name User',
                        anchor      : '100%'
                    },
                    {
                        xtype       : 'textfield',
                        name        : 'username',
                        allowBlank  : false,
                        fieldLabel  : 'Username',
                        emptyText   : 'Username',
                        anchor      : '100%'
                    },
                    {
                        xtype       : 'combobox',
                        name        : 'role',
                        emptyText   : 'Role User',
                        fieldLabel  : 'Role User',
                        autoScroll  : false,
                        store       : 'HRIS.module.GeneralSetup.store.ViewRole',
                        displayField: 'name',
                        valueField  : 'id',
                        anchor      : '100%'
                    },
                    {
                        xtype       : 'textfield',
                        name        : 'password',
                        inputType   : 'password',
                        allowBlank  : false,
                        fieldLabel  : 'Password',
                        emptyText   : 'Password',
                        anchor      : '100%'
                    },
                    {
                        xtype       : 'textfield',
                        name        : 'email',
                        fieldLabel  : 'Email',
                        emptyText   : 'Email',
                        anchor      : '100%'
                    },
                    {
                        fieldLabel  : 'Aktif',
                        tooltip     : 'Is Active?',
                        xtype       : 'checkboxfield',
                        name        : 'isactive',
                        flex        : 1,
                        checked     : true
                    },
                    {
                       fieldLabel   : 'Description',
                       labelWidth   : 77,
                       tooltip      : 'Description',
                       xtype        : 'htmleditor',
                       name         : 'description'
                    }
                ],
            }
        ];
        me.buttons = [
            {
                text    : 'Save',
                iconCls : 'icon-disk',
                action  : 'save'//Nantinya akan dicontrol menggunakan controller
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
