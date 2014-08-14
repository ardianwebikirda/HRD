Ext.define('HRIS.module.GeneralSetup.view.Users', {
    extend   : 'Ext.panel.Panel',
    title    : 'Users',
    iconCls  : 'icon-user',
    alias    : 'widget.Users',
    id       : 'Users',
    layout   : 'fit',     
    requires : [
        'HRIS.module.GeneralSetup.view.grid.GridUsers',
    ],
    height      : 250,
    width       : 1000,
    closable    : true,
    items       : [ {xtype   : 'gridusers'} ]
});