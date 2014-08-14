Ext.define('HRIS.module.GeneralSetup.view.form.FormModul', {
    extend      : 'Ext.window.Window',
    closeable   : true,
    modal   : true,
    requires: [
        'HRIS.module.GeneralSetup.store.ViewModul',
    ],
    title       : 'Form Modul',
    alias       : 'widget.formmodul',
    id          : 'formmodul',
    width       : 550,
    height      : 450,
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
                        name        : 'id',
                        allowBlank  : true,
                        fieldLabel  : 'ID',
                        emptyText   : 'ID',
                        anchor      : '50%'
                    },
                    {
                        xtype       : 'textfield',
                        name        : 'name',
                        allowBlank  : false,
                        fieldLabel  : 'Nama Modul',
                        emptyText   : 'Nama Modul',
                        anchor      : '100%'
                    },
                    {
                        xtype       : 'combobox',
                        name        : 'parent',
                        emptyText   : 'Parent Modul',
                        fieldLabel  : 'Parent Modul',
                        autoScroll  : false,
                        store       : 'HRIS.module.GeneralSetup.store.ViewModul',
                        displayField: 'name',
                        valueField  : 'id',
                        anchor      : '100%'
                    },
                    {
                        xtype       : 'textfield',
                        name        : 'icon',
                        allowBlank  : false,
                        fieldLabel  : 'Icon Modul',
                        emptyText   : 'Icon Modul',
                        anchor      : '100%'
                    },
                    {
                        fieldLabel  : 'Aktif',
                        tooltip     : 'Is Active?',
                        xtype       : 'checkboxfield',
                        name        : 'isactive',
                        flex        : 1,
                        checked     : true
                    },                    {
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
