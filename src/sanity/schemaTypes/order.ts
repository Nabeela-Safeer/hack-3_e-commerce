
export const Order = {
    name: "order",
    type: "document",
    title: "order",
    fields:[
        {
            name: "firstName",
    type: "string",
    title: "First Name",
        },
        {
            name: "lastName",
            type: "string",
            title: "Last Name",
                
        },
        {
            name: "discount",
            type: "number",
            title: "Discount"
        },
        {
            name: "address",
            type: "string",
            title: "Address",
            
        },
        {name: "city",
        type: "string",
        title: "City",
    },
    {
        name: "zipCode",
        type: "string",
        title: "Zip Code",
            
    },
    {
        name: "phone",
        type: "number",
        title: "Phone",
    },
    {
        name: "email",
        type: "string",
        title: "Email",
    },
    {
        name: "cartItem",
        title: "Cart Item",
        type: "array",
        of :[{
            type:"reference", to : {type: "product"}
        }]
    },
    {
        name:"total",
        title:"Total",
        type: "number", 
    },
    {
        name:"status",
        title:"Order Status",
        type: "string",
        options:{
            list:[
                {title: "Pending", value: "pending"},
                {title: "Success", value: "success"},
                {title: "Dispatch", value: "dispatch"}
            ],
            layout: "radio"
        },
        initialValue: "pending"
    },

]}