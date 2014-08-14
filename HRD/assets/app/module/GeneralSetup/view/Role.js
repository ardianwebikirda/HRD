Ext.define('HRIS.module.GeneralSetup.view.Role', {
    extend   :  'Ext.panel.Panel',
    title    : 'Role',
    alias    : 'widget.Role',
    iconCls  : 'icon-group',
    id       : 'Role',
    layout   : 'fit',     
    requires : [
        'HRIS.module.GeneralSetup.view.grid.GridRole',
        'HRIS.module.GeneralSetup.view.grid.GridRoleModul'
    ],
    height      : 250,
    width       : 1000,
    layout      : {
        type    :'hbox',
        padding :'3',
        align   :'stretch'
    },
    defaults    : {
        flex    : 1
    },
    closable    : true,
    items       : [ {xtype   : 'gridrole'},
                    {xtype   : 'gridrolemodul'} 
    ]
});