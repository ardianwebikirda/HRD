Ext.define('HRIS.module.GeneralSetup.view.Modul', {
    extend   :  'Ext.panel.Panel',
    title    : 'Modul',
    alias    : 'widget.Modul',
    iconCls  : 'icon-application_osx_terminal',
    id       : 'Modul',
    layout   : 'fit',     
    requires : [
        'HRIS.module.GeneralSetup.view.grid.GridModul',
    ],
    height      : 250,
    width       : 1000,
    layout      : 'fit',
    closable    : true,
    items       : [ {xtype   : 'gridmodul'} ]
});