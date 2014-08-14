Ext.define('HRIS.module.GeneralSetup.view.grid.GridModul', {
    extend   : 'Ext.grid.Panel',
    store    : 'HRIS.module.GeneralSetup.store.Modul',
    title    : 'Grid Modul',
    alias    : 'widget.gridmodul',
    id       : 'gridmodul', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'MULTI',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : 'HRIS.module.GeneralSetup.store.Modul',
        dock        : 'bottom',
        displayInfo : true
    }],  
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '5%'
        },
        {
            text     : 'ID',
            dataIndex: 'id',
            width    : '5%'
        },
        {
            text     : 'Nama',
            dataIndex: 'name',
            width    : '20%'
        },
        {
            text     : 'Parent',
            dataIndex: 'parent',
            width    : '5%'
        },
        {
            text     : 'Icon',
            dataIndex: 'icon',
            width    : '10%'
        },
        {
            text     : 'Description',
            dataIndex: 'description',
            width    : '40%'
        }
    ],
    tbar: [
         { xtype: 'button', iconCls: 'icon-add', text: 'Add', action : 'add' },
         { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete' },
         { xtype: 'button', iconCls: 'icon-page_white_excel', text: 'Print', action : 'print' },
         '->',
         {
            fieldLabel          : 'Search',
            xtype               : 'textfield',
            emptyText           : 'Type a keyword and press enter',
            width               : '35%',
            enableKeyEvents     : true,
            action              : 'search'
        }
    ]
});