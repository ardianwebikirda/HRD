Ext.define('HRIS.module.MasterHR.view.grid.GridCompany', {
    extend      : 'Ext.grid.Panel',
    store       : 'HRIS.module.MasterHR.store.Company',  
    itle        : 'Grid Company',
    alias       : 'widget.gridcompany',
    id          : 'gridcompany',
    // bodyStyle   : 'padding: 3px',
    margins     : '0px 3px 0px 0px', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'MULTI',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : 'HRIS.module.MasterHR.store.Company',
        dock        : 'bottom',
        displayInfo : true
    }],  
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '8%'
        },
        {
            text     : 'Code',
            dataIndex: 'code',
            width    : '15%'
        },
        {
            text     : 'Nama',
            dataIndex: 'name',
            width    : '64%'
        }
    ],
    tbar: [
         // { xtype: 'button', iconCls: 'icon-add', text: 'Add', action : 'add' },
         // { xtype: 'button', iconCls: 'icon-page_white_excel', text: 'Print', action : 'print' },
        { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete' },
        '->',
        {
            fieldLabel          : 'Search',
            xtype               : 'textfield',
            emptyText           : 'Type Here for Search....',
            width               : '80%',
            caseSensitive       : false,
            enableKeyEvents     : true,
            action              : 'search'
        }
    ]
});