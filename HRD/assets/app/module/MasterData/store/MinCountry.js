Ext.define('HRIS.module.MasterData.store.MinCountry', {
    extend      : 'Ext.data.Store',
    model       : 'HRIS.module.MasterData.model.Country',
    requires    : [
        'HRIS.module.MasterData.model.Country'
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
            read    : BASE_URL + 'MasterData/c_country/searchCountry'
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