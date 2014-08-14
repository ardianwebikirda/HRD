Ext.define('HRIS.module.MasterHR.view.grid.GridOfficeHour', {
    extend   : 'Ext.grid.Panel',
    store    : 'HRIS.module.MasterHR.store.OfficeHour',
    title    : 'Grid OfficeHour',
    alias    : 'widget.gridofficehour',
    padding  : '3',
    id       : 'gridofficehour', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'MULTI',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : 'HRIS.module.MasterHR.store.OfficeHour',
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
            text     : 'Nama',
            dataIndex: 'name',
            width    : '50%'
        },
        {
            text     : 'Jam Masuk',
            dataIndex: 'time_in',
            width    : '20%'
        },
        {
            text     : 'Jam Selesai',
            dataIndex: 'time_out',
            width    : '20%'
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