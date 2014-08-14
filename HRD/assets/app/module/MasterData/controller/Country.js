Ext.define('HRIS.module.MasterData.controller.Country', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],
    

    init: function() {
        var me = this;
        me.getStore('HRIS.module.MasterData.store.Country').load();
        me.control({
            "gridcountry  button[action=delete]"          : {
                click: me.del
            }, 
            "gridcountry  button[action=add]"             : {
                click: me.add
            }, 
            "formcountry  button[action=save]"        : {
                click: me.save
            }, 
            "formcountry  button[action=reset]"       : {
                click: me.reset
            },
            "gridcountry"                             : {
               itemdblclick: me.edit
            },
            "gridcountry textfield[action=search]"    : {
               keypress: me.search
            },
            // "gridcountry button[action=print]"        : {
            //    click: me.print
            // },
            "formeditcountry button[action=update]"       : {
               click: me.update
            }, 
            "gridcountrymodul"             : {
                itemdblclick: me.addCountry
            },
            "formcountrymodul  button[action=save]"        : {
                click: me.saveCountry
            },  
        });
        me.callParent(arguments);
    },

    reloadStore: function(){
        var me = this;
        me.getStore('HRIS.module.MasterData.store.Country').reload();
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
                        url             : BASE_URL + 'MasterData/c_country/delCountry',
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
                                var storeApproval = Ext.getStore('HRIS.module.MasterData.store.Country');
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
        Ext.create('HRIS.module.MasterData.view.form.FormCountry').show();
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
        var phone       = form.findField('phone').getValue();

        Ext.Ajax.request({
            url     : BASE_URL + 'MasterData/c_country/saveCountry',
            method  : 'POST',
            params  : {
                code    : code,
                name    : name,
                phone   : phone
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
                    me.getStore('HRIS.module.MasterData.store.Country').removeAll();
                    me.getStore('HRIS.module.MasterData.store.Country').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Country Telah Terdaftar - Silahkan Gunakan Country Lain',
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
        var win = Ext.create('HRIS.module.MasterData.view.form.FormEditCountry');
        win.show();
        win.down('form').loadRecord(record);
    },
    update: function(btn){
        // console.log('hai');
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();
        var id          = form.findField('id').getValue();
        var code        = form.findField('code').getValue();
        var name        = form.findField('name').getValue();
        var phone       = form.findField('phone').getValue();

        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'MasterData/c_country/editCountry',
                        method  : 'POST',
                        params  : {
                            id      : id,
                            code    : code,
                            name    : name,
                            phone   : phone
                        },
                        success : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            // console.log(data.total);
                            if(data.total === 1){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Telah Dirubah',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });
                                win.close();
                                me.getStore('HRIS.module.MasterData.store.Country').removeAll();
                                me.getStore('HRIS.module.MasterData.store.Country').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Country Telah Terdaftar - Silahkan Gunakan Country Lain',
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
            url     : BASE_URL + 'MasterData/c_country/searchCountry',
            method  : 'POST',
            params  : {name : value},
            success : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                if(data.success){
                    var storeApproval = Ext.getStore('HRIS.module.MasterData.store.Country');
                    storeApproval.removeAll();
                    storeApproval.add(data.data);
                }
            }
        });
    },
    // print : function(){
    //     window.location = BASE_URL + 'MasterData/c_country/printCountry/';
    // },

    addCountry: function(grid, record, item, index, e, eOpts){
        // console.log(record);
        if(record.data.idcountry === '' || record.data.idcountry === null)
        {
            Ext.MessageBox.show({
                title           : 'Error',
                msg             : 'Pilih Country Terlebih Dahulu',
                icon            : Ext.MessageBox.ERROR,
                buttons         : Ext.MessageBox.OK
            });  
        } else {
            this.getStore('HRIS.module.MasterData.store.ViewAllModul').load();      
            var win = Ext.create('HRIS.module.MasterData.view.form.FormCountryModul');
            win.show();
            win.down('form').loadRecord(record);
        }
    },
    saveCountry: function(btn, evt, opts){
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();
        var idcountry      = form.findField('idcountry').getValue();
        var id          = form.findField('parent').getValue();
        var isactive    = form.findField('isactive').getValue();
        var iscreate    = form.findField('iscreate').getValue();
        var isupdate    = form.findField('isupdate').getValue();
        var isdelete    = form.findField('isdelete').getValue();
        var isprocess   = form.findField('isprocess').getValue();

        Ext.Ajax.request({
            url     : BASE_URL + 'MasterData/c_country/saveCountryModul',
            method  : 'POST',
            params  : {
                idcountry      : idcountry,
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
                    var storeModul = Ext.getStore('HRIS.module.MasterData.store.CountryModul');
                    storeModul.removeAll();
                    storeModul.add(data.data);
                }else if (data.total === 1){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Pilih Country Terlebih Dahulu',
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
                        msg             : 'Country Telah Terdaftar Ada',
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