Ext.define('HRIS.module.MasterHR.store.OfficeHour', {
    extend      : 'Ext.data.Store',
    model       : 'HRIS.module.MasterHR.model.OfficeHour',
    requires    : [
        'HRIS.module.MasterHR.model.OfficeHour'
    ],
    autoLoad    : true,
    autoSync    : false,
    pageSize    : 20,
    root        : {
        expanded        : false
    },
    proxy       : {
        type            : 'ajax',
        api             : {
            read    : BASE_URL + 'MasterHR/c_officehour/getOfficeHour'
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