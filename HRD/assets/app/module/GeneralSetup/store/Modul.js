Ext.define('HRIS.module.GeneralSetup.store.Modul', {
    extend      : 'Ext.data.Store',
    model       : 'HRIS.module.GeneralSetup.model.Modul',
    requires    : [
        'HRIS.module.GeneralSetup.model.Modul'
    ],
    autoLoad    : true,
    autoSync    : false,
    pageSize    : 20,
    root        : {
        expanded    : false
    },
    proxy       : {
        type            : 'ajax',
        api             : {
            read    : BASE_URL + 'GeneralSetup/c_modul/getModul'
        },
        actionMethods   : {
            read    : 'POST'
        },
        reader          : {
            type            : 'json',
            root            : 'data',
            successProperty : 'success',
            totalProperty   : 'total'
        },
        writer          : {
            type            : 'json',
            writeAllFields  : true,
            root            : 'data',
            encode          : true
        }
    }
});