Ext.define('HRIS.module.GeneralSetup.store.Users', {
    extend      : 'Ext.data.Store',
    model       : 'HRIS.module.GeneralSetup.model.Users',
    requires    : [
        'HRIS.module.GeneralSetup.model.Users'
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
            read    : BASE_URL + 'GeneralSetup/c_users/getUsers'
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