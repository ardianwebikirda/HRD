Ext.define('HRIS.module.MasterHR.controller.JobTitle', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],
    

    init: function() {
        var me = this;
        me.getStore('HRIS.module.MasterHR.store.JobTitle').load();
        me.control({
            "gridjobtitle  button[action=delete]"          : {
                click: me.del
            }, 
            "gridjobtitle  button[action=add]"             : {
                click: me.add
            }, 
            "formjobtitle  button[action=save]"        : {
                click: me.save
            }, 
            "formjobtitle  button[action=reset]"       : {
                click: me.reset
            },
            "gridjobtitle"                             : {
               itemdblclick: me.edit
            },
            "gridjobtitle textfield[action=search]"    : {
               keypress: me.search
            },
            // "gridjobtitle button[action=print]"        : {
            //    click: me.print
            // },
            "formeditjobtitle button[action=update]"       : {
               click: me.update
            }, 
            "gridjobtitlemodul"             : {
                itemdblclick: me.addJobTitle
            },
            "formjobtitlemodul  button[action=save]"        : {
                click: me.saveJobTitle
            },  
        });
        me.callParent(arguments);
    },

    reloadStore: function(){
        var me = this;
        me.getStore('HRIS.module.MasterHR.store.JobTitle').reload();
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
                        url             : BASE_URL + 'MasterHR/c_jobtitle/delJobTitle',
                        method          : 'POST',
                        params          : {post : Ext.encode(me.CheckedDataEdit)},
                        success         : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            // console.log(data);
                            if(data.msg === 1)
                            {
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Dipakai di Modul Lain',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });                                
                            } else {
                                var storeApproval = Ext.getStore('HRIS.module.MasterHR.store.JobTitle');
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
        Ext.create('HRIS.module.MasterHR.view.form.FormJobTitle').show();
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
        var level       = form.findField('level').getValue();
        var name        = form.findField('name').getValue();
        var isactive    = form.findField('isactive').getValue();

        Ext.Ajax.request({
            url     : BASE_URL + 'MasterHR/c_jobtitle/saveJobTitle',
            method  : 'POST',
            params  : {
                level       : level,
                name        : name,
                isactive    : isactive
            },
            success : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                if(data.total === 1){
                    Ext.MessageBox.show({
                        title           : 'Informasi',
                        msg             : 'Data Telah Tersimpan',
                        icon            : Ext.MessageBox.INFO,
                        buttons         : Ext.MessageBox.OK
                    });
                    win.close();
                    me.getStore('HRIS.module.MasterHR.store.JobTitle').removeAll();
                    me.getStore('HRIS.module.MasterHR.store.JobTitle').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'JobTitle Telah Terdaftar - Silahkan Gunakan JobTitle Lain',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                } else {
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'ID has indexed, Please Contact Your Vendor..!',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });                   
                }
            }
        });   
    },
    edit: function(grid, record, item, index, e, eOpts){
        this.getStore('HRIS.module.MasterHR.store.JobLevel').load();
        var win = Ext.create('HRIS.module.MasterHR.view.form.FormEditJobTitle');
        win.show();
        win.down('form').loadRecord(record);
    },
    update: function(btn){
        // console.log('hai');
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();
        var id          = form.findField('id').getValue();
        var level       = form.findField('id_joblevel').getValue();
        var name        = form.findField('name').getValue();
        var isactive    = form.findField('isactive').getValue();

        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'MasterHR/c_jobtitle/editJobTitle',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            level       : level,
                            name        : name,
                            isactive    : isactive
                        },
                        success : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            if(data.total === 1){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Telah Dirubah',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });
                                win.close();
                                me.getStore('HRIS.module.MasterHR.store.JobTitle').removeAll();
                                me.getStore('HRIS.module.MasterHR.store.JobTitle').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'JobTitle Telah Terdaftar - Silahkan Gunakan JobTitle Lain',
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
                }
            }
        });      
    },
    search: function(field, evt, opts){
        var value       = field.getValue();
        Ext.Ajax.request({
            url     : BASE_URL + 'MasterHR/c_jobtitle/searchJobTitle',
            method  : 'POST',
            params  : {name : value},
            success : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                if(data.success){
                    var storeApproval = Ext.getStore('HRIS.module.MasterHR.store.JobTitle');
                    storeApproval.removeAll();
                    storeApproval.add(data.data);
                }
            }
        });
    },
    // print : function(){
    //     window.location = BASE_URL + 'MasterHR/c_jobtitle/printJobTitle/';
    // },

    addJobTitle: function(grid, record, item, index, e, eOpts){
        // console.log(record);
        if(record.data.idjobtitle === '' || record.data.idjobtitle === null)
        {
            Ext.MessageBox.show({
                title           : 'Error',
                msg             : 'Pilih JobTitle Terlebih Dahulu',
                icon            : Ext.MessageBox.ERROR,
                buttons         : Ext.MessageBox.OK
            });  
        } else {
            this.getStore('HRIS.module.MasterHR.store.ViewAllModul').load();      
            var win = Ext.create('HRIS.module.MasterHR.view.form.FormJobTitleModul');
            win.show();
            win.down('form').loadRecord(record);
        }
    },
    saveJobTitle: function(btn, evt, opts){
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();
        var idjobtitle      = form.findField('idjobtitle').getValue();
        var id          = form.findField('parent').getValue();
        var isactive    = form.findField('isactive').getValue();
        var iscreate    = form.findField('iscreate').getValue();
        var isupdate    = form.findField('isupdate').getValue();
        var isdelete    = form.findField('isdelete').getValue();
        var isprocess   = form.findField('isprocess').getValue();

        Ext.Ajax.request({
            url     : BASE_URL + 'MasterHR/c_jobtitle/saveJobTitleModul',
            method  : 'POST',
            params  : {
                idjobtitle      : idjobtitle,
                id          : id,
                isactive    : isactive,
                iscreate    : iscreate,
                isupdate    : isupdate,
                isdelete    : isdelete,
                isprocess   : isprocess
            },
            success : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                // console.log(data.data);
                if(data.total === 0){
                    Ext.MessageBox.show({
                        title           : 'Informasi',
                        msg             : 'Data Telah Tersimpan',
                        icon            : Ext.MessageBox.INFO,
                        buttons         : Ext.MessageBox.OK
                    });
                    win.close();
                    var storeModul = Ext.getStore('HRIS.module.MasterHR.store.JobTitleModul');
                    storeModul.removeAll();
                    storeModul.add(data.data);
                }else if (data.total === 1){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Pilih JobTitle Terlebih Dahulu',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Pilih Menu Terlebih Dahulu',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                }else if (data.total === 3){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'JobTitle Telah Terdaftar Ada',
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
})