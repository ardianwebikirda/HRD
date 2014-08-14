Ext.define('HRIS.module.MasterHR.controller.OfficeHour', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],
    

    init: function() {
        var me = this;
        me.getStore('HRIS.module.MasterHR.store.OfficeHour').load();
        me.control({
            "gridofficehour  button[action=delete]"          : {
                click: me.del
            }, 
            "gridofficehour  button[action=add]"             : {
                click: me.add
            }, 
            "formofficehour  button[action=save]"        : {
                click: me.save
            }, 
            "formofficehour  button[action=reset]"       : {
                click: me.reset
            },
            "gridofficehour"                             : {
               itemdblclick: me.edit
            },
            "gridofficehour textfield[action=search]"    : {
               keypress: me.search
            },
            // "gridofficehour button[action=print]"        : {
            //    click: me.print
            // },
            "formeditofficehour button[action=update]"       : {
               click: me.update
            }, 
            "gridofficehourmodul"             : {
                itemdblclick: me.addOfficeHour
            },
            "formofficehourmodul  button[action=save]"        : {
                click: me.saveOfficeHour
            },  
        });
        me.callParent(arguments);
    },

    reloadStore: function(){
        var me = this;
        me.getStore('HRIS.module.MasterHR.store.OfficeHour').reload();
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
                        url             : BASE_URL + 'MasterHR/c_officehour/delOfficeHour',
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
                                var storeApproval = Ext.getStore('HRIS.module.MasterHR.store.OfficeHour');
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
        Ext.create('HRIS.module.MasterHR.view.form.FormOfficeHour').show();
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
        var name        = form.findField('name').getValue();
        var time_in     = Ext.Date.format(form.findField('time_in').getValue(), 'H:i:s');
        var time_out    = Ext.Date.format(form.findField('time_out').getValue(), 'H:i:s');
        var isactive    = form.findField('isactive').getValue();
        console.log(time_in, time_out);

        Ext.Ajax.request({
            url     : BASE_URL + 'MasterHR/c_officehour/saveOfficeHour',
            method  : 'POST',
            params  : {
                name        : name,
                time_in     : time_in,
                time_out    : time_out,
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
                    me.getStore('HRIS.module.MasterHR.store.OfficeHour').removeAll();
                    me.getStore('HRIS.module.MasterHR.store.OfficeHour').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'OfficeHour Telah Terdaftar - Silahkan Gunakan OfficeHour Lain',
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
        this.getStore('HRIS.module.MasterHR.store.OfficeHour').load();
        var win = Ext.create('HRIS.module.MasterHR.view.form.FormEditOfficeHour');
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
        var time_in     = Ext.Date.format(form.findField('time_in').getValue(), 'H:i:s');
        var time_out    = Ext.Date.format(form.findField('time_out').getValue(), 'H:i:s');
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
                        url     : BASE_URL + 'MasterHR/c_officehour/editOfficeHour',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            name        : name,
                            time_in     : time_in,
                            time_out    : time_out,
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
                                me.getStore('HRIS.module.MasterHR.store.OfficeHour').removeAll();
                                me.getStore('HRIS.module.MasterHR.store.OfficeHour').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'OfficeHour Telah Terdaftar - Silahkan Gunakan OfficeHour Lain',
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
            url     : BASE_URL + 'MasterHR/c_officehour/searchOfficeHour',
            method  : 'POST',
            params  : {name : value},
            success : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                if(data.success){
                    var storeApproval = Ext.getStore('HRIS.module.MasterHR.store.OfficeHour');
                    storeApproval.removeAll();
                    storeApproval.add(data.data);
                }
            }
        });
    },
    // print : function(){
    //     window.location = BASE_URL + 'MasterHR/c_officehour/printOfficeHour/';
    // },

    addOfficeHour: function(grid, record, item, index, e, eOpts){
        // console.log(record);
        if(record.data.idofficehour === '' || record.data.idofficehour === null)
        {
            Ext.MessageBox.show({
                title           : 'Error',
                msg             : 'Pilih OfficeHour Terlebih Dahulu',
                icon            : Ext.MessageBox.ERROR,
                buttons         : Ext.MessageBox.OK
            });  
        } else {
            this.getStore('HRIS.module.MasterHR.store.ViewAllModul').load();      
            var win = Ext.create('HRIS.module.MasterHR.view.form.FormOfficeHourModul');
            win.show();
            win.down('form').loadRecord(record);
        }
    },
    saveOfficeHour: function(btn, evt, opts){
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();
        var idofficehour      = form.findField('idofficehour').getValue();
        var id          = form.findField('parent').getValue();
        var isactive    = form.findField('isactive').getValue();
        var iscreate    = form.findField('iscreate').getValue();
        var isupdate    = form.findField('isupdate').getValue();
        var isdelete    = form.findField('isdelete').getValue();
        var isprocess   = form.findField('isprocess').getValue();

        Ext.Ajax.request({
            url     : BASE_URL + 'MasterHR/c_officehour/saveOfficeHourModul',
            method  : 'POST',
            params  : {
                idofficehour      : idofficehour,
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
                    var storeModul = Ext.getStore('HRIS.module.MasterHR.store.OfficeHourModul');
                    storeModul.removeAll();
                    storeModul.add(data.data);
                }else if (data.total === 1){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Pilih OfficeHour Terlebih Dahulu',
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
                        msg             : 'OfficeHour Telah Terdaftar Ada',
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