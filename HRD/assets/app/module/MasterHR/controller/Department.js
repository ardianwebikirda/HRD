Ext.define('HRIS.module.MasterHR.controller.Department', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],
    

    init: function() {
        var me = this;
        me.getStore('HRIS.module.MasterHR.store.Department').load();
        me.control({
            "griddepartment  button[action=delete]"          : {
                click: me.del
            }, 
            "griddepartment  button[action=add]"             : {
                click: me.add
            }, 
            "formdepartment  button[action=save]"        : {
                click: me.save
            }, 
            "formdepartment  button[action=reset]"       : {
                click: me.reset
            },
            "griddepartment"                             : {
               itemdblclick: me.edit
            },
            "griddepartment textfield[action=search]"    : {
               keypress: me.search
            },
            // "griddepartment button[action=print]"        : {
            //    click: me.print
            // },
            "formeditdepartment button[action=update]"       : {
               click: me.update
            }, 
            "griddepartmentmodul"             : {
                itemdblclick: me.addDepartment
            },
            "formdepartmentmodul  button[action=save]"        : {
                click: me.saveDepartment
            },  
        });
        me.callParent(arguments);
    },

    reloadStore: function(){
        var me = this;
        me.getStore('HRIS.module.MasterHR.store.Department').reload();
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
                        url             : BASE_URL + 'MasterHR/c_department/delDepartment',
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
                                var storeApproval = Ext.getStore('HRIS.module.MasterHR.store.Department');
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
        Ext.create('HRIS.module.MasterHR.view.form.FormDepartment').show();
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
        var code        = form.findField('code').getValue();
        var name        = form.findField('name').getValue();
        var isactive    = form.findField('isactive').getValue();

        Ext.Ajax.request({
            url     : BASE_URL + 'MasterHR/c_department/saveDepartment',
            method  : 'POST',
            params  : {
                code       : code,
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
                    me.getStore('HRIS.module.MasterHR.store.Department').removeAll();
                    me.getStore('HRIS.module.MasterHR.store.Department').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Department Telah Terdaftar - Silahkan Gunakan Department Lain',
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
        console.log(record);
        var win = Ext.create('HRIS.module.MasterHR.view.form.FormEditDepartment');
        win.show();
        win.down('form').loadRecord(record);
    },
    update: function(btn){
        // console.log('hai');
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();
        var id          = form.findField('id').getValue();
        var code       = form.findField('code').getValue();
        var name        = form.findField('name').getValue();
        var isactive    = form.findField('isactive').getValue();

        console.log(isactive);

        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'MasterHR/c_department/editDepartment',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            code       : code,
                            name        : name,
                            isactive    : isactive
                        },
                        success : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            console.log(data.total);
                            if(data.total === 1){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Telah Dirubah',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });
                                win.close();
                                me.getStore('HRIS.module.MasterHR.store.Department').removeAll();
                                me.getStore('HRIS.module.MasterHR.store.Department').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Department Telah Terdaftar - Silahkan Gunakan Department Lain',
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
            url     : BASE_URL + 'MasterHR/c_department/searchDepartment',
            method  : 'POST',
            params  : {name : value},
            success : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                if(data.success){
                    var storeApproval = Ext.getStore('HRIS.module.MasterHR.store.Department');
                    storeApproval.removeAll();
                    storeApproval.add(data.data);
                }
            }
        });
    },
    // print : function(){
    //     window.location = BASE_URL + 'MasterHR/c_department/printDepartment/';
    // },

    addDepartment: function(grid, record, item, index, e, eOpts){
        // console.log(record);
        if(record.data.iddepartment === '' || record.data.iddepartment === null)
        {
            Ext.MessageBox.show({
                title           : 'Error',
                msg             : 'Pilih Department Terlebih Dahulu',
                icon            : Ext.MessageBox.ERROR,
                buttons         : Ext.MessageBox.OK
            });  
        } else {
            this.getStore('HRIS.module.MasterHR.store.ViewAllModul').load();      
            var win = Ext.create('HRIS.module.MasterHR.view.form.FormDepartmentModul');
            win.show();
            win.down('form').loadRecord(record);
        }
    },
    saveDepartment: function(btn, evt, opts){
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();
        var iddepartment      = form.findField('iddepartment').getValue();
        var id          = form.findField('parent').getValue();
        var isactive    = form.findField('isactive').getValue();
        var iscreate    = form.findField('iscreate').getValue();
        var isupdate    = form.findField('isupdate').getValue();
        var isdelete    = form.findField('isdelete').getValue();
        var isprocess   = form.findField('isprocess').getValue();

        Ext.Ajax.request({
            url     : BASE_URL + 'MasterHR/c_department/saveDepartmentModul',
            method  : 'POST',
            params  : {
                iddepartment      : iddepartment,
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
                    var storeModul = Ext.getStore('HRIS.module.MasterHR.store.DepartmentModul');
                    storeModul.removeAll();
                    storeModul.add(data.data);
                }else if (data.total === 1){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Pilih Department Terlebih Dahulu',
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
                        msg             : 'Department Telah Terdaftar Ada',
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