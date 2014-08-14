Ext.define('HRIS.module.GeneralSetup.view.grid.GridUsers', {
    extend   : 'Ext.grid.Panel',
    store    : 'HRIS.module.GeneralSetup.store.Users',
    title    : 'Grid Users',
    alias    : 'widget.gridusers',
    id       : 'gridusers', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'MULTI',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : 'HRIS.module.GeneralSetup.store.Users',
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
            width    : '15%'
        },
        {
            text     : 'Username',
            dataIndex: 'username',
            width    : '10%'
        },
        {
            text     : 'Role',
            dataIndex: 'role',
            width    : '10%'
        },
        {
            text     : 'First Name',
            dataIndex: 'firstname',
            width    : '8%'
        },
        {
            text     : 'Last Name',
            dataIndex: 'lastname',
            width    : '8%'
        },
        {
            text     : 'Description',
            dataIndex: 'description',
            width    : '10%'
        },
        {
            text     : 'Email',
            dataIndex: 'email',
            width    : '7%'
        },
        {
            text     : 'Phone',
            dataIndex: 'phone',
            width    : '7%'
        },
        {
            text     : 'Mobile Phone',
            dataIndex: 'mobile',
            width    : '8%'
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
            caseSensitive       : false,
            enableKeyEvents     : true,
            action              : 'search'
        }
    ]
});