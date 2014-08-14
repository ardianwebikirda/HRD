Ext.define('HRIS.module.MasterData.controller.Education', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],
    

    init: function() {
        var me = this;
        me.getStore('HRIS.module.MasterData.store.Education').load();
        me.control({
            "grideducation  button[action=delete]"          : {
                click: me.del
            }, 
            "grideducation  button[action=add]"             : {
                click: me.add
            }, 
            "formeducation  button[action=save]"        : {
                click: me.save
            }, 
            "formeducation  button[action=reset]"       : {
                click: me.reset
            },
            "grideducation"                             : {
               itemdblclick: me.edit
            },
            "grideducation textfield[action=search]"    : {
               keypress: me.search
            },
            "formediteducation button[action=update]"       : {
               click: me.update
            }, 
            "grideducationmodul"             : {
                itemdblclick: me.addEducation
            },
            "formeducationmodul  button[action=save]"        : {
                click: me.saveEducation
            },  
        });
        me.callParent(arguments);
    },

    reloadStore: function(){
        var me = this;
        me.getStore('HRIS.module.MasterData.store.Education').reload();
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
                        url             : BASE_URL + 'MasterData/c_education/delEducation',
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
                                var storeApproval = Ext.getStore('HRIS.module.MasterData.store.Education');
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
        Ext.create('HRIS.module.MasterData.view.form.FormEducation').show();
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

        Ext.Ajax.request({
            url     : BASE_URL + 'MasterData/c_education/saveEducation',
            method  : 'POST',
            params  : {
                name    : name,
                level   : level
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
                    me.getStore('HRIS.module.MasterData.store.Education').removeAll();
                    me.getStore('HRIS.module.MasterData.store.Education').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Education Telah Terdaftar - Silahkan Gunakan Education Lain',
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
        var win = Ext.create('HRIS.module.MasterData.view.form.FormEditEducation');
        win.show();
        win.down('form').loadRecord(record);
    },
    update: function(btn){
        // console.log('hai');
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();
        var id          = form.findField('id').getValue();
        var level       = form.findField('level').getValue();
        var name        = form.findField('name').getValue();

        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'MasterData/c_education/editEducation',
                        method  : 'POST',
                        params  : {
                            id      : id,
                            level   : level,
                            name    : name
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
                                me.getStore('HRIS.module.MasterData.store.Education').removeAll();
                                me.getStore('HRIS.module.MasterData.store.Education').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Education Telah Terdaftar - Silahkan Gunakan Education Lain',
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
            url     : BASE_URL + 'MasterData/c_education/searchEducation',
            method  : 'POST',
            params  : {name : value},
            success : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                if(data.success){
                    var storeApproval = Ext.getStore('HRIS.module.MasterData.store.Education');
                    storeApproval.removeAll();
                    storeApproval.add(data.data);
                }
            }
        });
    },
    // print : function(){
    //     window.location = BASE_URL + 'MasterData/c_education/printEducation/';
    // },

    addEducation: function(grid, record, item, index, e, eOpts){
        // console.log(record);
        if(record.data.ideducation === '' || record.data.ideducation === null)
        {
            Ext.MessageBox.show({
                title           : 'Error',
                msg             : 'Pilih Education Terlebih Dahulu',
                icon            : Ext.MessageBox.ERROR,
                buttons         : Ext.MessageBox.OK
            });  
        } else {
            this.getStore('HRIS.module.MasterData.store.ViewAllModul').load();      
            var win = Ext.create('HRIS.module.MasterData.view.form.FormEducationModul');
            win.show();
            win.down('form').loadRecord(record);
        }
    },
    saveEducation: function(btn, evt, opts){
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();
        var ideducation      = form.findField('ideducation').getValue();
        var id          = form.findField('parent').getValue();
        var isactive    = form.findField('isactive').getValue();
        var iscreate    = form.findField('iscreate').getValue();
        var isupdate    = form.findField('isupdate').getValue();
        var isdelete    = form.findField('isdelete').getValue();
        var isprocess   = form.findField('isprocess').getValue();

        Ext.Ajax.request({
            url     : BASE_URL + 'MasterData/c_education/saveEducationModul',
            method  : 'POST',
            params  : {
                ideducation      : ideducation,
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
                    var storeModul = Ext.getStore('HRIS.module.MasterData.store.EducationModul');
                    storeModul.removeAll();
                    storeModul.add(data.data);
                }else if (data.total === 1){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Pilih Education Terlebih Dahulu',
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
                        msg             : 'Education Telah Terdaftar Ada',
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