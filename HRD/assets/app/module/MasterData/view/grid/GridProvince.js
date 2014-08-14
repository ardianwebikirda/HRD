Ext.define('HRIS.module.MasterData.view.grid.GridProvince', {
    extend   : 'Ext.grid.Panel',
    store    : 'HRIS.module.MasterData.store.Province',
    title    : 'Grid Province',
    alias    : 'widget.gridprovince',
    padding  : '3',
    id       : 'gridprovince', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'MULTI',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : 'HRIS.module.MasterData.store.Province',
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
            text     : 'Country',
            dataIndex: 'country',
            width    : '40%'
        },
        {
            text     : 'Code',
            dataIndex: 'code',
            width    : '15%'
        },
        {
            text     : 'Nama',
            dataIndex: 'name',
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
            width               : '50%',
            caseSensitive       : false,
            enableKeyEvents     : true,
            action              : 'search'
        }
    ]
});