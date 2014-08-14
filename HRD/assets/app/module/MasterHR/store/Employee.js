Ext.define('HRIS.module.MasterHR.store.Employee',{
    extend      : 'Ext.data.Store',
    model       : 'HRIS.module.MasterHR.model.Employee',
    requires    : [
        'HRIS.module.MasterHR.model.Employee'
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
            read    : BASE_URL + 'MasterHR/c_employee/getEmployee'
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