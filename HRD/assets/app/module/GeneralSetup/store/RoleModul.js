Ext.define('HRIS.module.GeneralSetup.store.RoleModul', {
    extend      : 'Ext.data.Store',
    model       : 'HRIS.module.GeneralSetup.model.RoleModul',
    requires    : [
        'HRIS.module.GeneralSetup.model.RoleModul'
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
            read    : BASE_URL + 'GeneralSetup/c_role/getModul'
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