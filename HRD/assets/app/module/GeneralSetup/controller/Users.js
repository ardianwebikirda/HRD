Ext.define('HRIS.module.GeneralSetup.controller.Users', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],

    init: function() {
        var me = this;
        me.getStore('HRIS.module.GeneralSetup.store.Users').load();
        me.control({
            "Users  button[action=delete]"          : {
                click: me.del
            }, 
            "Users  button[action=add]"             : {
                click: me.add
            }, 
            "formusers  button[action=save]"        : {
                click: me.save
            }, 
            "formusers  button[action=reset]"        : {
                click: me.reset
            },
            "gridusers"                             : {
               itemdblclick: me.edit
            },
            "gridusers textfield[action=search]"    : {
               keypress: me.search
            },
            "gridusers button[action=print]"        : {
               click: me.print
            },
            "editusers button[action=update]"        : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },
    reloadStore: function(){
        var me = this;
        me.getStore('HRIS.module.GeneralSetup.store.Users').reload();
    },
    del: function(gridPanel, selected){
        var me = this;
        me.CheckedDataEdit = new Array();
        var record = gridPanel.up('grid').getSelectionModel().getSelection();
        Ext.each(record, function(selected){
            me.CheckedDataEdit.push({
                id : selected.data.id
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
                        url             : BASE_URL + 'GeneralSetup/c_users/delUsers',
                        method          : 'POST',
                        params          : {post : Ext.encode(me.CheckedDataEdit)},
                        success         : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            var storeApproval = Ext.getStore('HRIS.module.GeneralSetup.store.Users');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);

                        }
                    });
                }
            }
        })
    },
    add: function(){
        this.getStore('HRIS.module.GeneralSetup.store.ViewRole').load();
        Ext.create('HRIS.module.GeneralSetup.view.form.FormUsers').show();
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
        var role        = form.findField('role').getValue();
        var username    = form.findField('username').getValue();
        var password    = form.findField('password').getValue();
        var email       = form.findField('email').getValue();
        var isactive    = form.findField('isactive').getValue();
        var description = form.findField('description').getValue();

        Ext.Ajax.request({
            url     : BASE_URL + 'GeneralSetup/c_users/saveUsers',
            method  : 'POST',
            params  : {
                name        : name,
                role        : role,
                username    : username,
                password    : password,
                email       : email,
                isactive    : isactive,
                description : description
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
                    me.getStore('HRIS.module.GeneralSetup.store.Users').removeAll();
                    me.getStore('HRIS.module.GeneralSetup.store.Users').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Username Telah Terdaftar - Silahkan Gunakan Username Lain',
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
        this.getStore('HRIS.module.GeneralSetup.store.ViewRole').load();
        var win = Ext.create('HRIS.module.GeneralSetup.view.form.EditUsers');
        win.show();
        win.down('form').loadRecord(record);
    },
    update: function(btn){
        // console.log('hai');
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();
        var id          = form.findField('id').getValue();
        var username    = form.findField('username').getValue();
        var name        = form.findField('name').getValue();
        var role        = form.findField('role').getValue();
        var description = form.findField('description').getValue();
        var email       = form.findField('email').getValue();
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
                        url     : BASE_URL + 'GeneralSetup/c_users/editUsers',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            username    : username,
                            name        : name,
                            role        : role,
                            description : description,
                            email       : email,
                            isactive    : isactive
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
                                me.getStore('HRIS.module.GeneralSetup.store.Users').removeAll();
                                me.getStore('HRIS.module.GeneralSetup.store.Users').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Username Telah Terdaftar - Silahkan Gunakan Username Lain',
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
                url     : BASE_URL + 'GeneralSetup/c_users/searchUsers',
                method  : 'POST',
                params  : {username : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('HRIS.module.GeneralSetup.store.Users');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },
    print : function(){
        window.location = BASE_URL + 'GeneralSetup/c_users/printUsers/';
    },
})
