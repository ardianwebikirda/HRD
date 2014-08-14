Ext.define('HRIS.module.GeneralSetup.store.ViewModul', {
    extend      : 'Ext.data.Store',
    model       : 'HRIS.module.GeneralSetup.model.ViewModul',
    requires    : [
        'HRIS.module.GeneralSetup.model.ViewModul'
    ],
    autoLoad    : true,
    autoSync    : false,
    root        : {
        expanded    : false
    },
    proxy       : {
        type            : 'ajax',
        api             : {
            read    : BASE_URL + 'GeneralSetup/c_modul/viewModul'
        },
        actionMethods   : {
            read    : 'POST'
        },
        reader          : {
            type            : 'json',
            root            : 'data',
            successProperty : 'success'
        },
        writer          : {
            type            : 'json',
            writeAllFields  : true,
            root            : 'data',
            encode          : true
        }
    }
});