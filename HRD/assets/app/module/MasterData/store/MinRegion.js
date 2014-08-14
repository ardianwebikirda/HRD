Ext.define('HRIS.module.MasterData.store.MinRegion', {
    extend      : 'Ext.data.Store',
    model       : 'HRIS.module.MasterData.model.Region',
    requires    : [
        'HRIS.module.MasterData.model.Region'
    ],
    autoLoad    : true,
    autoSync    : false,
    pageSize    : 20,
    root        : {
        expanded        : false
    },
    proxy       : {
        type    : 'ajax',
        api     : {
            read    : BASE_URL + 'MasterData/c_region/chainRegion'
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