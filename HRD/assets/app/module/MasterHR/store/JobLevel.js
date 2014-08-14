Ext.define('HRIS.module.MasterHR.store.JobLevel', {
    extend      : 'Ext.data.Store',
    model       : 'HRIS.module.MasterHR.model.JobLevel',
    requires    : [
        'HRIS.module.MasterHR.model.JobLevel'
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
            read    : BASE_URL + 'MasterHR/c_joblevel/getJobLevel'
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