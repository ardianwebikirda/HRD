Ext.define('HRIS.module.MasterData.view.grid.GridCountry', {
    extend   : 'Ext.grid.Panel',
    store    : 'HRIS.module.MasterData.store.Country',
    title    : 'Grid Country',
    alias    : 'widget.gridcountry',
    padding  : '3',
    id       : 'gridcountry', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'MULTI',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : 'HRIS.module.MasterData.store.Country',
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
            text     : 'Code',
            dataIndex: 'code',
            width    : '15%'
        },
        {
            text     : 'Nama',
            dataIndex: 'name',
            width    : '60%'
        },
        {
            text     : 'Phone Code',
            dataIndex: 'phone',
            width    : '20%'
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