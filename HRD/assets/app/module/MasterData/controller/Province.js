Ext.define('HRIS.module.MasterData.controller.Province', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],
    

    init: function() {
        var me = this;
        me.getStore('HRIS.module.MasterData.store.Province').load();
        me.control({
            "gridprovince  button[action=delete]"          : {
                click: me.del
            }, 
            "gridprovince  button[action=add]"             : {
                click: me.add
            }, 
            "formprovince  button[action=save]"        : {
                click: me.save
            }, 
            "formprovince  button[action=reset]"       : {
                click: me.reset
            },
            "gridprovince"                             : {
               itemdblclick: me.edit
            },
            "gridprovince textfield[action=search]"    : {
               keypress: me.search
            },
            // "gridprovince button[action=print]"        : {
            //    click: me.print
            // },
            "formeditprovince button[action=update]"       : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },

    reloadStore: function(){
        var me = this;
        me.getStore('HRIS.module.MasterData.store.Province').reload();
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
                        url             : BASE_URL + 'MasterData/c_province/delProvince',
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
                                var storeApproval = Ext.getStore('HRIS.module.MasterData.store.Province');
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
        // console.log('hai');
        var me = this;
        me.getStore('HRIS.module.MasterData.store.Country').reload();
        Ext.create('HRIS.module.MasterData.view.form.FormProvince').show();
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
        var country     = form.findField('id_country').getValue();

        console.log(country);

        Ext.Ajax.request({
            url     : BASE_URL + 'MasterData/c_province/saveProvince',
            method  : 'POST',
            params  : {
                code    : code,
                name    : name,
                country : country
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
                    me.getStore('HRIS.module.MasterData.store.Province').removeAll();
                    me.getStore('HRIS.module.MasterData.store.Province').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Province Telah Terdaftar - Silahkan Gunakan Province Lain',
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
        this.getStore('HRIS.module.MasterData.store.MinCountry').load();
        var win = Ext.create('HRIS.module.MasterData.view.form.FormEditProvince');
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
        var country     = form.findField('id_country').getValue();

        console.log(country);

        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'MasterData/c_province/editProvince',
                        method  : 'POST',
                        params  : {
                            id      : id,
                            code    : code,
                            name    : name,
                            country : country
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
                                me.getStore('HRIS.module.MasterData.store.Province').removeAll();
                                me.getStore('HRIS.module.MasterData.store.Province').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Province Telah Terdaftar - Silahkan Gunakan Province Lain',
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
                url     : BASE_URL + 'MasterData/c_province/searchProvince',
                method  : 'POST',
                params  : {name : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                        var storeApproval = Ext.getStore('HRIS.module.MasterData.store.Province');
                        storeApproval.removeAll();
                        storeApproval.add(data.data);
                    }
                }
            });
    }
});