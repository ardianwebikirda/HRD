var marry = Ext.create('Ext.data.Store',{
    fields  : ['id','marry'],
    data    : [
        {'id':'Single','marry':'Single'},
        {'id':'Married','marry':'Married'},
        {'id':'Divorced','marry':'Divorced'}
    ]
});

var gender = Ext.create('Ext.data.Store',{
    fields  : ['id','gender'],
    data    : [
        {'id':'Laki-laki','gender':'Laki-laki'},
        {'id':'Perempuan','gender':'Perempuan'}
    ]
});

var blood   = Ext.create('Ext.data.Store',{
    fields  : ['id','blood'],
    data    : [
        {'id':'A','blood':'A'},
        {'id':'B','blood':'B'},
        {'id':'AB','blood':'AB'},
        {'id':'O','blood':'O'}
    ]
});

var idcard = Ext.create('Ext.data.Store',{
    fields  : ['id','name'],
    data    : [
        {'id':'KTP', 'name':'KTP/Civil Card'},
        {'id':'PASPOR', 'name':'PASPOR'},
        {'id':'SIM', 'name':'SIM/Drive Lisence'}
    ]
});

Ext.define('HRIS.module.MasterHR.view.form.FormEmploye',{
    extend      : 'Ext.form.Panel',
    alias       : 'widget.formemployee',
    id          : 'formemployee',
    title       : 'Form Employee',
    store       : 'HRIS.module.MasterHR.store.Employee',
    iconCls     : 'icon-application_form',
    autoHeight  : true,
    frame       : true,
    bodyStyle   : 'padding : 1px; background : transparent;',
    dockedItems : [
        {
            xtype   : 'toolbar',
            dock    : 'top',
            items   : [
                {xtype: 'button', text: 'Save', iconCls: 'icon-disk', action: 'save'},
                {xtype: 'button', text: 'Update', iconCls: 'icon-pencil', action: 'update', disabled: true},
                {xtype: 'button', text: 'Reset', iconCls: 'icon-page_refresh', action: 'update'}
            ]
        }
    ],
    items       : [
        {
            xtype   : 'hidden',
            name    : 'id'
        },
        {
            /* ====================== */ 
            /* Biography Fieldset Place */
            /* ====================== */
            xtype       : 'fieldset',
            title       : 'Biography',
            collapsible : true,
            collapsed   : true,
            autoHeight  : true,
            defaults    : {
                anchor  : '100%'
            },
            items       : [
                {
                    xtype   : 'container',
                    layout  : { type: 'column' },
                    items       : [
                        {
                            columnWidth : .27,
                            items       : [
                                {
                                    xtype :'box',
                                    id    : 'photo',
                                    autoEl: {
                                        tag    : 'img',
                                        cls    : 'profile'
                                    }
                                }
                            ]
                        },
                        {
                            xtype       : 'container',
                            columnWidth : .73,
                            layout      : 'anchor',
                            padding     : '7px',
                            defaults   : {
                                anchor: '100%'
                            },
                            items       : [
                                {
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    padding : '5px',
                                    items   : [
                                        {
                                            xtype       : 'textfield',
                                            fieldLabel  : 'First Name',
                                            name        : 'fname',
                                            emptyText   : 'Type First Name Here',
                                            labelWidth  : 85,
                                            margins     : '2px 2px 2px 2px',
                                            allowBlank  : false,
                                            vtype       : 'alphanum',
                                            msgTarget   : 'under',
                                            minLength   : 4,
                                            flex        : 1.7
                                        }
                                    ]
                                },
                                {
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    padding : '5px',
                                    items   : [
                                        {
                                            xtype       : 'textfield',
                                            fieldLabel  : 'Last Name',
                                            name        : 'lname',
                                            emptyText   : 'Type Last Name Here',
                                            labelWidth  : 85,
                                            margins     : '2px 2px 2px 2px',
                                            allowBlank  : false,
                                            msgTarget   : 'under',
                                            minLength   : 4,
                                            flex        : 1.7
                                        }
                                    ]
                                },
                                {
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    padding : '5px',
                                    items   : [
                                        {
                                            xtype       : 'textfield',
                                            fieldLabel  : 'Username',
                                            name        : 'username',
                                            emptyText   : 'Type Username Here',
                                            labelWidth  : 85,
                                            margins     : '2px 2px 2px 2px',
                                            allowBlank  : false,
                                            msgTarget   : 'under',
                                            flex        : 1.7
                                        }
                                    ]
                                },
                                {
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    padding : '5px',
                                    items   : [
                                        {
                                            xtype           : 'combobox',
                                            fieldLabel      : 'Gender',
                                            name            : 'gender',
                                            emptyText       : 'Select Gender',
                                            labelWidth      : 85,
                                            margins         : '2px 2px 2px 2px',
                                            flex            : 1,
                                            allowBlank      : false,
                                            msgTarget       : 'under',
                                            store           : gender,
                                            queryMode       : 'local',
                                            displayField    : 'gender',
                                            valueField      : 'id'
                                        },
                                        {
                                            xtype           : 'combobox',
                                            fieldLabel      : 'Religion',
                                            name            : 'id_religion',
                                            emptyText       : 'Select Religion',
                                            labelWidth      : 50,
                                            margins         : '2px 2px 2px 2px',
                                            flex            : 1,
                                            allowBlank      : false,
                                            msgTarget       : 'under', 
                                            store           : Ext.create('HRIS.module.MasterData.store.Religion'),
                                            queryMode       : 'local',
                                            displayField    : 'name',
                                            valueField      : 'id'
                                        }                        
                                    ]
                                },
                                {
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    padding : '5px',
                                    items   : [
                                        {
                                            xtype           : 'combobox',
                                            fieldLabel      : 'Birth Place',
                                            name            : 'bod_place',
                                            emptyText       : 'Select Birth Place',
                                            labelWidth      : 85,
                                            margins         : '2px 2px 2px 2px',
                                            flex            : 1.3,
                                            allowBlank      : false,
                                            msgTarget       : 'under',
                                            store           : Ext.create('HRIS.module.MasterData.store.AllRegion'),
                                            displayField    : 'name',
                                            valueField      : 'name',
                                            listeners       : {
                                                buffer  : 100,
                                                change  : function(){
                                                    var store = this.store;
                                                    store.clearFilter();
                                                    store.filter({
                                                        property    : 'name',
                                                        anyMatch    : true,
                                                        value       : this.getValue()
                                                    });
                                                }
                                            }
                                        },
                                        {
                                            xtype       : 'datefield',
                                            fieldLabel  : 'Date',
                                            name        : 'bod',
                                            emptyText   : 'Select Birth Date',
                                            labelWidth  : 50,
                                            margins     : '2px 2px 2px 2px',
                                            allowBlank  : false,
                                            msgTarget   : 'under',
                                            flex        : 0.8
                                        }                        
                                    ]
                                },
                                {
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    padding : '5px',
                                    items   : [
                                        {
                                            xtype           : 'combobox',
                                            fieldLabel      : 'Marital Status',
                                            name            : 'marital_status',
                                            emptyText       : 'Select Marital Status',
                                            labelWidth      : 85,
                                            margins         : '2px 2px 2px 2px',
                                            flex            : 1.3,
                                            allowBlank      : false,
                                            msgTarget       : 'under',
                                            store           : marry,
                                            queryMode       : 'local',
                                            displayField    : 'marry',
                                            valueField      : 'id'
                                        },
                                        {
                                            xtype       : 'numberfield',
                                            fieldLabel  : 'NOC',
                                            name        : 'noc',
                                            emptyText   : 'Num Of Children',
                                            labelWidth  : 50,
                                            margins     : '2px 2px 2px 2px',
                                            flex        : 0.8
                                        }                        
                                    ]
                                },
                                {
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    padding : '5px',
                                    items   : [
                                        {
                                            xtype           : 'combobox',
                                            fieldLabel      : 'Education',
                                            name            : 'id_education',
                                            emptyText       : 'Select Education Level',
                                            labelWidth      : 85,
                                            margins         : '2px 2px 2px 2px',
                                            flex            : 1.3,
                                            allowBlank      : false,
                                            msgTarget       : 'under',
                                            store           : Ext.create('HRIS.module.MasterData.store.Education'),
                                            displayField    : 'name',
                                            valueField      : 'id',
                                            listeners       : {
                                                buffer  : 100,
                                                change  : function(){
                                                    var store = this.store;
                                                    store.clearFilter();
                                                    store.filter({
                                                        property    : 'name',
                                                        anyMatch    : true,
                                                        value       : this.getValue()
                                                    });
                                                }
                                            }                                        
                                        },
                                        {
                                            xtype           : 'combobox',
                                            fieldLabel      : 'Blood',
                                            name            : 'blood',
                                            emptyText       : 'Blood Type',
                                            labelWidth      : 50,
                                            margins         : '2px 2px 2px 2px',
                                            flex            : 0.8,
                                            store           : blood,
                                            queryMode       : 'local',
                                            displayField    : 'blood',
                                            valueField      : 'id'
                                        }                        
                                    ]
                                },
                                {
                                    xtype       : 'filefield',
                                    anchor      : '95%',
                                    fieldLabel  : 'Upload Foto',
                                    name        : 'photo',
                                    emptyText   : 'Upload Photo',
                                    labelWidth  : 85,
                                    flex        : 1,
                                    buttonText  : '',
                                    buttonConfig : {
                                        iconCls : 'icon-page_portrait_shot'
                                    }
                                }
                            ]    
                        }
                    ]
                },
                {
                    fieldLabel  : 'Address',
                    emptyText   : 'Employee Address',
                    name        : 'address',
                    labelWidth  : 85,
                    tooltip     : 'Employee Address',
                    margin      : '0px 0px 5px 0px',
                    allowBlank  : false,
                    msgTarget   : 'under',
                    xtype       : 'textareafield'
                },
                {
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    defaults    : {
                        height  : '20',
                        padding : '5px',
                        flex    : 1,
                        labelWidth  : 85
                    },
                    items       : [
                        {
                            fieldLabel      : 'Country',
                            emptyText       : 'Select Country',
                            tooltip         : 'Select Country',
                            name            : 'id_country',
                            id              : 'id_country',
                            xtype           : 'combobox',
                            allowBlank      : false,
                            msgTarget       : 'under',
                            store           : Ext.create('HRIS.module.MasterData.store.MinCountry'),
                            displayField    : 'name',
                            valueField      : 'id',
                            editable        : true,
                            margins         : '0px 5px 0px 0px',
                            listeners       : {
                                buffer  : 100,
                                change  : function(){
                                    var store = this.store;
                                    store.clearFilter();
                                    store.filter({
                                        property    : 'name',
                                        anyMatch    : true,
                                        value       : this.getValue()
                                    });
                                }
                            }
                        },
                        {
                            fieldLabel      : 'Province',
                            emptyText       : 'Select Province',
                            tooltip         : 'Select Province',
                            name            : 'id_province',
                            id              : 'id_province',
                            xtype           : 'combobox',
                            store           : Ext.create('HRIS.module.MasterData.store.MinProvince'),
                            displayField    : 'name',
                            valueField      : 'id',
                            editable        : true,
                            margins         : '0px 5px 0px 0px',
                            disabled        : true,
                            allowBlank      : false,
                            msgTarget       : 'under',
                            lastQuery       : '',
                            listeners       : {
                                buffer  : 100,
                                change  : function(){
                                    var store = this.store;
                                    store.clearFilter();
                                    store.filter({
                                        property    : 'name',
                                        anyMatch    : true,
                                        value       : this.getValue()
                                    });
                                }
                            }
                        }
                    ]
                },
                {
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    defaults    : {
                        height  : '20',
                        padding : '5px',
                        flex    : 1,
                        labelWidth  : 85
                    },
                    items       : [
                        {
                            fieldLabel      : 'City / Region',
                            emptyText       : 'Select City / Region',
                            tooltip         : 'Select City / Region',
                            name            : 'id_region',
                            id              : 'id_region',
                            store           : Ext.create('HRIS.module.MasterData.store.MinRegion'),
                            displayField    : 'name',
                            valueField      : 'id',
                            xtype           : 'combobox',
                            editable        : true,
                            disabled        : true,
                            margins         : '0px 5px 0px 0px',
                            lastQuery       : '',
                            allowBlank      : false,
                            msgTarget       : 'under',
                            listeners       : {
                                buffer  : 100,
                                change  : function(){
                                    var store = this.store;
                                    store.clearFilter();
                                    store.filter({
                                        property    : 'name',
                                        anyMatch    : true,
                                        value       : this.getValue()
                                    });
                                }
                            }
                        },
                        {
                            fieldLabel  : 'ZIP',
                            emptyText   : 'Type your zip',
                            tooltip     : 'Type your zip',
                            name        : 'zip',
                            xtype       : 'textfield',
                            editable    : true,
                            margins     : '0px 5px 0px 0px'
                        }
                    ]
                }
            ]   
        },        
        {
            
            /* ====================== */ 
            /* Company Information Fieldset Place */
            /* ====================== */
            xtype       : 'fieldset',
            title       : 'Company Information',
            collapsible : true,
            collapsed   : true,
            autoHeight  : true,
            defaults    : {
                anchor  : '100%'
            },
            items       : [

            /* ====================== */ 
            /* Area For Fieldset's Item (Container, Panel, Form & etc) */
            /* ====================== */
                {
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    defaults    : {
                        height  : '50',
                        flex    : 1,
                        padding : '2px',
                        labelWidth  : 65    
                    },
                    items       : [
                        {
                            xtype           : 'textfield',
                            name            : 'code',
                            fieldLabel      : 'Code/NIK',
                            emptyText       : 'Type Employees Code',
                            allowBlank      : false,
                            msgTarget       : 'under'
                        }
                    ]
                },
                {
                    /* ====================== */ 
                    /* Container Place */
                    /* ====================== */
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    defaults    : {
                        height  : '50',
                        flex    : 1,
                        padding : '2px',
                        labelWidth  : 65    
                    },
                    items       : [
                    /* ====================== */ 
                    /* Area For Container's Item */
                    /* ====================== */
                        {
                            xtype           : 'combobox',
                            name            : 'id_company',
                            fieldLabel      : 'Company',
                            emptyText       : 'Select Company',
                            store           : Ext.create('HRIS.module.MasterHR.store.Company'),
                            displayField    : 'name',
                            valueField      : 'id',
                            allowBlank      : false,
                            msgTarget       : 'under',
                            listeners       : {
                                buffer  : 100,
                                change  : function(){
                                    var store = this.store;
                                    store.clearFilter();
                                    store.filter({
                                        property    : 'name',
                                        anyMatch    : true,
                                        value       : this.getValue()
                                    });
                                }
                            }   
                        },
                        {
                            xtype           : 'combobox',
                            name            : 'id_department',
                            fieldLabel      : 'Department',
                            emptyText       : 'Select Department',
                            store           : Ext.create('HRIS.module.MasterHR.store.Department'),
                            displayField    : 'name',
                            valueField      : 'id',
                            allowBlank      : false,
                            msgTarget       : 'under',
                            listeners       : {
                                buffer  : 100,
                                change  : function(){
                                    var store = this.store;
                                    store.clearFilter();
                                    store.filter({
                                        property    : 'name',
                                        anyMatch    : true,
                                        value       : this.getValue()
                                    });
                                }
                            },
                           listConfig      : {
                                getInnerTpl : function(){
                                    return '{code} | {name}';
                                }
                            }  
                        }
                    ]
                },
                {
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    defaults    : {
                        height  : '50',
                        flex    : 1,
                        padding : '2px',
                        labelWidth  : 65    
                    },
                    items       : [
                        {
                            xtype           : 'combobox',
                            name            : 'id_jobtitle',
                            fieldLabel      : 'Job Title',
                            emptyText       : 'Select Job Title',
                            store           : Ext.create('HRIS.module.MasterHR.store.JobTitle'),
                            displayField    : 'name',
                            valueField      : 'id',
                            allowBlank      : false,
                            msgTarget       : 'under',
                            listeners       : {
                                buffer  : 100,
                                change  : function(){
                                    var store = this.store;
                                    store.clearFilter();
                                    store.filter({
                                        property    : 'name',
                                        anyMatch    : true,
                                        value       : this.getValue()
                                    }); 
                                }
                            }
                        },
                        {
                            xtype           : 'combobox',
                            name            : 'id_jobstatus',
                            fieldLabel      : 'Job Status',
                            emptyText       : 'Select Job Status',
                            store           : Ext.create('HRIS.module.MasterHR.store.JobStatus'),
                            displayField    : 'name',
                            valueField      : 'id',
                            allowBlank      : false,
                            msgTarget       : 'under',
                            listeners       : {
                                buffer  : 100,
                                change  : function(){
                                    var store = this.store;
                                    store.clearFilter();
                                    store.filter({
                                        property    : 'name',
                                        anyMatch    : true,
                                        value       : this.getValue()
                                    });
                                }
                            }

                        }
                    ]
                },
                {
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    defaults    : {
                        height  : '50',
                        flex    : 1,
                        padding : '2px',
                        labelWidth  : 65    
                    },
                    items       : [
                        {
                            xtype       : 'datefield',
                            name        : 'hire',
                            fieldLabel  : 'Hire',
                        allowBlank      : false,
                        msgTarget       : 'under',
                            emptyText   : 'Select Hire Date'
                        },
                        {
                            xtype       : 'datefield',
                            name        : 'expired',
                            fieldLabel  : 'Expired',
                            allowBlank  : false,
                            msgTarget   : 'under',
                            emptyText   : 'Select Expired Date',
                        }
                    ]
                },
                {
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    defaults    : {
                        height  : '50',
                        flex    : 1,
                        padding : '2px',
                        labelWidth  : 65    
                    },
                    items       : [
                        {
                            xtype           : 'combobox',
                            name            : 'supervisor',
                            fieldLabel      : 'Supervisor',
                            emptyText       : 'Select Supervisor',
                            store           : Ext.create('HRIS.module.MasterHR.store.Employee'),
                            displayField    : 'fname',
                            valueField      : 'id_employee',
                            // allowBlank      : false,
                            msgTarget       : 'under',
                            listConfig      : {
                                getInnerTpl : function(){
                                    return '{code} | {fname} {lname}';
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            
            /* ====================== */ 
            /* Personal Information Fieldset Place */
            /* ====================== */
            xtype       : 'fieldset',
            title       : 'Personal Information',
            collapsible : true,
            collapsed   : true,
            autoHeight  : true,
            defaults    : {
                anchor  : '100%'             
            },
            items       : [
                {
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    defaults    : {
                        height  : '30',
                        padding : '10px',
                        flex    : 1,
                        labelWidth  : 85
                    },
                    items       : [
                        {
                            fieldLabel  : 'Home Phone',
                            emptyText   : 'First Phone Number',
                            tooltip     : 'First Phone Number',
                            name        : 'phone',
                            editable    : true,
                            xtype       : 'textfield',
                            margins     : '0px 5px 0px 0px'
                        }
                    ]
                },
                {
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    defaults    : {
                        height  : '30',
                        padding : '10px',
                        flex    : 1,
                        labelWidth  : 85
                    },
                    items       : [
                        {
                            fieldLabel  : 'Mobile 1',
                            emptyText   : 'First Mobile Number',
                            tooltip     : 'First Mobile Number',
                            name        : 'mobile1',
                            editable    : true,
                            xtype       : 'textfield',
                            allowBlank  : false,
                            msgTarget   : 'under',
                            margins     : '0px 5px 0px 0px'
                        },
                        {
                            fieldLabel  : 'Mobile 2',
                            emptyText   : 'Secondary Mobile Number',
                            tooltip     : 'Secondary Mobile Number',
                            name        : 'mobile2',
                            editable    : true,
                            xtype       : 'textfield',
                            margins     : '0px 5px 0px 0px'
                        }
                    ]
                },
                {
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    defaults    : {
                        height  : '30',
                        padding : '10px',
                        flex    : 1,
                        labelWidth  : 85
                    },
                    items       : [
                        {
                            fieldLabel  : 'Email 1',
                            emptyText   : 'First Email',
                            tooltip     : 'First Email',
                            name        : 'email1',
                            editable    : true,
                            xtype       : 'textfield',
                            allowBlank  : false,
                            msgTarget   : 'under',
                            margins     : '0px 5px 0px 0px'
                        },
                        {
                            fieldLabel  : 'Email 2',
                            emptyText   : 'Secondary Email',
                            tooltip     : 'Secondary Email',
                            name        : 'email2',
                            editable    : true,
                            xtype       : 'textfield',
                            margins     : '0px 5px 0px 0px'
                        }
                    ]
                },
                {
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    defaults    : {
                        height  : '30',
                        padding : '10px',
                        flex    : 1,
                        labelWidth  : 85
                    },
                    items       : [
                        {
                            fieldLabel      : 'ID Card',
                            emptyText       : 'Select ID Card',
                            tooltip         : 'Select ID Card',
                            name            : 'idcard_type',
                            xtype           : 'combobox',
                            store           : idcard,
                            displayField    : 'name',
                            valueField      : 'id', 
                            editable        : true,
                            flex            : 0.6,
                            margins         : '0px 5px 0px 0px'
                        },
                        {
                            fieldLabel      : 'Num Of ID Card',
                            emptyText       : 'Type ID Card Number',
                            tooltip         : 'Type ID Card Number',
                            name            : 'idcard_number',
                            xtype           : 'textfield',
                            editable        : true,
                            labelWidth      : 95,
                            flex            : 1.2,
                            margins         : '0px 5px 0px 0px'
                        }
                    ]
                },
                {
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    defaults    : {
                        height  : '30',
                        padding : '10px',
                        flex    : 1,
                        labelWidth  : 85
                    },
                    items       : [
                        {
                            fieldLabel      : 'BANK',
                            emptyText       : 'Select BANK',
                            tooltip         : 'Select BANK',
                            name            : 'id_bank',
                            xtype           : 'combobox',
                            store           : Ext.create('HRIS.module.MasterData.store.Bank'),
                            displayField    : 'name',
                            valueField      : 'id', 
                            editable        : true,
                            margins         : '0px 5px 0px 0px',
                            listeners       : {
                                buffer  : 100,
                                change  : function(){
                                    var store = this.store;
                                    store.clearFilter();
                                    store.filter({
                                        property    : 'name',
                                        anyMatch    : true,
                                        value       : this.getValue()
                                    });
                                }
                            }
                        },
                        {
                            fieldLabel  : 'Account',
                            emptyText   : 'Type Bank Account',
                            tooltip     : 'Type Bank Account',
                            name        : 'bank_account',
                            xtype       : 'textfield',
                            editable    : true,
                            margins     : '0px 5px 0px 0px'
                        }
                    ]
                },
                {
                    xtype   : 'fieldcontainer',
                    layout  : 'hbox',
                    padding : '5px',
                    items   : [
                        {
                            xtype       : 'textfield',
                            anchor      : '100%',
                            fieldLabel  : 'Tax Number',
                            name        : 'tax',
                            emptyText   : 'Tax Number',
                            labelWidth  : 85,
                            flex        : 1
                        }
                    ]
                },
                {
                    xtype           : 'fieldcontainer',
                    layout          : 'hbox',
                    defaults        : {
                        height  : '30',
                        padding : '10px',
                        flex    : 1,
                        labelWidth  : 50
                    },
                    items       : [
                        {
                            xtype       : 'checkbox',
                            name        : 'isactive',
                            dataIndex   : 'isactive',
                            fieldLabel  : 'Active',
                            anchor      : '98%',
                            inputValue  : 'isactive',
                            checked     : true
                        },
                        {
                            xtype       : 'checkbox',
                            name        : 'isovertime',
                            dataIndex   : 'isovertime',
                            fieldLabel  : 'Overtime',
                            anchor      : '98%',
                            inputValue  : 'isovertime'
                        },
                        {
                            xtype       : 'checkbox',
                            name        : 'isresign',
                            dataIndex   : 'isresign',
                            fieldLabel  : 'Resign',
                            anchor      : '98%',
                            inputValue  : 'isresign'
                        }
                    ]
                }
            ]
        }
    ]
});