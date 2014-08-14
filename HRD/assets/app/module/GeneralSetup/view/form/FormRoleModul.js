Ext.define('HRIS.module.GeneralSetup.view.form.FormRoleModul', {
    extend      : 'Ext.window.Window',
    closeable   : true,
    modal   : true,
    requires: [
        'HRIS.module.GeneralSetup.store.ViewAllModul',
    ],
    title       : 'Form Role Modul',
    alias       : 'widget.formrolemodul',
    id          : 'formrolemodul',
    width       : 400,
    height      : 300,
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
                        name        : 'idrole',
                        allowBlank  : true,
                        fieldLabel  : 'ID',
                        emptyText   : 'ID',
                        anchor      : '50%',
                        hidden      : true
                    },
                    {
                        xtype       : 'combobox',
                        name        : 'parent',
                        emptyText   : 'Modul',
                        fieldLabel  : 'Modul',
                        autoScroll  : false,
                        store       : 'HRIS.module.GeneralSetup.store.ViewAllModul',
                        tpl         : Ext.create('Ext.XTemplate', '<tpl for=".">','<div class="x-boundlist-item">','{id} - {name}','</div>','</tpl>'),
                        displayTpl  : Ext.create('Ext.XTemplate', '<tpl for=".">', '{id} - {name}', '</tpl>'),
                        displayField: 'id',
                        valueField  : 'id',
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
                        fieldLabel  : 'Create',
                        tooltip     : 'Is Create?',
                        xtype       : 'checkboxfield',
                        name        : 'iscreate',
                        flex        : 1,
                        checked     : true
                    },
                    {
                        fieldLabel  : 'Update',
                        tooltip     : 'Is Update?',
                        xtype       : 'checkboxfield',
                        name        : 'isupdate',
                        flex        : 1,
                        checked     : true
                    },
                    {
                        fieldLabel  : 'Delete',
                        tooltip     : 'Is Delete?',
                        xtype       : 'checkboxfield',
                        name        : 'isdelete',
                        flex        : 1,
                        checked     : true
                    },
                    {
                        fieldLabel  : 'Precess',
                        tooltip     : 'Is Precess?',
                        xtype       : 'checkboxfield',
                        name        : 'isprocess',
                        flex        : 1,
                        checked     : true
                    }
                ],
            }
        ];
        me.buttons = [
            {
                text    : 'Save',
                iconCls : 'icon-disk',
                action  : 'save'
            }
        ];
        me.callParent(arguments);
    }  
});
