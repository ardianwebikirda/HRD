Ext.define('HRIS.module.GeneralSetup.controller.Modul', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],

    init: function() {
        var me = this;
        me.control({
            "Modul  button[action=delete]"          : {
                click: me.del
            }, 
            "Modul  button[action=add]"             : {
                click: me.add
            }, 
            "formmodul  button[action=save]"        : {
                click: me.save
            }, 
            "formmodul  button[action=reset]"        : {
                click: me.reset
            },
            "gridmodul"                             : {
               itemdblclick: me.edit
            },
            "gridmodul textfield[action=search]"    : {
               keypress: me.search
            },
            "gridmodul button[action=print]"        : {
               click: me.print
            },
            "editmodul button[action=update]"        : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },
    reloadStore: function(){
        var me = this;
        me.getStore('HRIS.module.GeneralSetup.store.Modul').reload();
    },
    del: function(gridPanel, selected){
        var me = this;
        me.CheckedDataEdit = new Array();
        var record = gridPanel.up('grid').getSelectionModel().getSelection();
        Ext.each(record, function(selected){
            me.CheckedDataEdit.push({
                id  : selected.data.id
            });
        });  
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan menghapus data yang terseleksi?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url             : BASE_URL + 'GeneralSetup/c_modul/delModul',
                        method          : 'POST',
                        params          : {post : Ext.encode(me.CheckedDataEdit)},
                        success         : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            // console.log(data);
                            if(data.msg === 1){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Dipakai di Modul Lain',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                }); 
                            } else if(data.msg === 2){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Hapus Terlebih Dahulu Child Data',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });                             
                            } else {
                                var storeApproval = Ext.getStore('HRIS.module.GeneralSetup.store.Modul');
                                storeApproval.removeAll();
                                storeApproval.add(data.data);
                            }
                        }
                    });
                }
            }
        })
    },
    add: function(){
        var me = this;
        me.getStore('HRIS.module.GeneralSetup.store.ViewModul').reload();
        Ext.create('HRIS.module.GeneralSetup.view.form.FormModul').show();
    },
    reset: function(btn) {//Reset Form
        var win         = btn.up('window');
        var form        = win.down('form');
        form.getForm().reset();
        // btn.setDisabled(true);
    },
    save: function(btn, evt, opts){
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();
        var id          = form.findField('id').getValue();
        var name        = form.findField('name').getValue();
        var parent      = form.findField('parent').getValue();
        var icon        = form.findField('icon').getValue();
        var isactive    = form.findField('isactive').getValue();
        var description = form.findField('description').getValue();

        Ext.Ajax.request({
            url     : BASE_URL + 'GeneralSetup/c_modul/saveModul',
            method  : 'POST',
            params  : {
                id          : id,
                name        : name,
                parent      : parent,
                icon        : icon,
                isactive    : isactive,
                description : description
            },
            success : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                // console.log(data.total);
                if(data.total === 0){
                    Ext.MessageBox.show({
                        title           : 'Informasi',
                        msg             : 'Data Telah Tersimpan',
                        icon            : Ext.MessageBox.INFO,
                        buttons         : Ext.MessageBox.OK
                    });
                    win.close();
                    me.getStore('HRIS.module.GeneralSetup.store.Modul').removeAll();
                    me.getStore('HRIS.module.GeneralSetup.store.Modul').reload();
                }else if (data.total === 1){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'ID Tidak Boleh Kosong',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Nama Modul Tidak Boleh Kosong',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                } else {                      
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Pengisian Data Salah',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });                   
                }
            }
        });   
    },
    edit: function(grid, record, item, index, e, eOpts){
        // var me = this;
        this.getStore('HRIS.module.GeneralSetup.store.ViewModul').reload();
        var win = Ext.create('HRIS.module.GeneralSetup.view.form.EditModul');
        win.show();
        win.down('form').loadRecord(record);
    },
    update: function(btn){
        // console.log('hai');
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();
        var id          = form.findField('id').getValue();
        var name        = form.findField('name').getValue();
        var parent      = form.findField('parent').getValue();
        var icon        = form.findField('icon').getValue();
        var isactive    = form.findField('isactive').getValue();
        var description = form.findField('description').getValue();
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'GeneralSetup/c_modul/editModul',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            name        : name,
                            parent      : parent,
                            icon        : icon,
                            description : description,
                            isactive    : isactive,
                        },
                        success : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            // console.log(data.total);
                            if(data.total === 0){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Telah Tersimpan',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });
                                win.close();
                                me.getStore('HRIS.module.GeneralSetup.store.Modul').removeAll();
                                me.getStore('HRIS.module.GeneralSetup.store.Modul').reload();
                            }else if (data.total === 1){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Nama Modul Tidak Boleh Kosong',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });
                            }else {                   
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Pengisian Data Salah',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });                   
                            }
                        }
                    });
                }
            }
        });      
    },
    search: function(field, evt, opts){
        var value       = field.getValue();
            Ext.Ajax.request({
                url     : BASE_URL + 'GeneralSetup/c_modul/searchModul',
                method  : 'POST',
                params  : {username : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('HRIS.module.GeneralSetup.store.Modul');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },
    print : function(){
        window.location = BASE_URL + 'GeneralSetup/c_modul/printModul/';
    },
})
