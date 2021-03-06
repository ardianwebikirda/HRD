Ext.define('HRIS.module.MasterHR.view.grid.GridJobLevel', {
    extend   : 'Ext.grid.Panel',
    store    : 'HRIS.module.MasterHR.store.JobLevel',
    title    : 'Grid JobLevel',
    alias    : 'widget.gridjoblevel',
    padding  : '3',
    id       : 'gridjoblevel', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'MULTI',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : 'HRIS.module.MasterHR.store.JobLevel',
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
            width    : '15%'
        },
        {
            text     : 'Nama',
            dataIndex: 'name',
            width    : '60%'
        }
    ],
    tbar: [
         { xtype: 'button', iconCls: 'icon-add', text: 'Add', action : 'add' },
         { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete' },
         // { xtype: 'button', iconCls: 'icon-page_white_excel', text: 'Print', action : 'print' },
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