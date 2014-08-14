Ext.define('HRIS.module.GeneralSetup.view.grid.GridRoleModul', {
    extend   : 'Ext.grid.Panel',
    store    : 'HRIS.module.GeneralSetup.store.RoleModul',
    title    : 'Grid Role Modul',
    alias    : 'widget.gridrolemodul',
    padding  : '3',
    id       : 'gridrolemodul', 
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '5%'
        },
        {
            text     : 'ID',
            dataIndex: 'id',
            hidden   : true
        },
        {
            text     : 'Role',
            dataIndex: 'idrole',
            hidden   : true
        },
        {
            text     : 'Kode',
            dataIndex: 'menu',
            width    : '7%'
        },
        {
            text     : 'Nama',
            dataIndex: 'name',
            width    : '40%'
        },
        {
            text     : 'Iscreate',
            dataIndex: 'iscreate',
            width    : '10%'
        },
        {
            text     : 'Isupdate',
            dataIndex: 'isupdate',
            width    : '10%'
        },
        {
            text     : 'Isdelete',
            dataIndex: 'isdelete',
            width    : '10%'
        },
        {
            text     : 'Isprocess',
            dataIndex: 'isprocess',
            width    : '10%'
        },
        {
            text     : 'Delete',
            xtype    :'actioncolumn',
            width    :'8%',
            items    : [{              
                            iconCls: 'icon-delete',
                            tooltip: 'Delete',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                var id = rec.get('id');
                                var idrole = rec.get('idrole');
                                Ext.MessageBox.show({
                                    title           : 'Konfirmasi',
                                    msg             : 'Anda yakin akan menghapus data yang terseleksi?',
                                    buttons         : Ext.Msg.YESNO,
                                    icon            : Ext.MessageBox.WARNING,
                                    width           : 450,
                                    fn              : function(btn, evtObj){
                                        if (btn == 'yes') {
                                            Ext.Ajax.request({
                                                url             : BASE_URL + 'GeneralSetup/c_role/delRoleModul',
                                                method          : 'POST',
                                                params          : { id : id, idrole : idrole },   
                                                success         : function(response){
                                                    var data    = Ext.JSON.decode(response.responseText);
                                                    var storeModul = Ext.getStore('HRIS.module.GeneralSetup.store.RoleModul');
                                                    storeModul.removeAll();
                                                    storeModul.add(data.data);

                                                }
                                            });
                                        }
                                    }
                                })

                            }
                        }]
        }
    ],
});