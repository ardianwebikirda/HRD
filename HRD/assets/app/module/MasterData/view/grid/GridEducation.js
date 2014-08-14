Ext.define('HRIS.module.MasterData.view.grid.GridEducation', {
    extend   : 'Ext.grid.Panel',
    store    : 'HRIS.module.MasterData.store.Education',
    title    : 'Grid Education',
    alias    : 'widget.grideducation',
    padding  : '3',
    id       : 'grideducation', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'MULTI',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : 'HRIS.module.MasterData.store.Education',
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
            text     : 'Level',
            dataIndex: 'level',
            width    : '10%'
        },
        {
            text     : 'Nama',
            dataIndex: 'name',
            width    : '75%'
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
            width               : '50%',
            caseSensitive       : false,
            enableKeyEvents     : true,
            action              : 'search'
        }
    ]
});