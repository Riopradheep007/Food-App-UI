
export const coreApiURL = "https://localhost:7234/api";

const controllerName = {
   COMMON:'/Common',
   AUTHENTICATE:'/Authenticate',
   RESTAURENT:'/Restaurent',
   SIGNUP:'/signup',
   CUSTOMER:'/customer'
};

export const api_url = {
    //common
    GET_SIDEBAR_MENUS: `${controllerName.COMMON}/menus`,
    //Authenticate
    LOGIN:`${controllerName.AUTHENTICATE}/login`,

    //Signup
    RESTAURENT_SIGNUP:`${controllerName.SIGNUP}/restaurent-signup`,
    //RESTAURENT
    RESTAURENT_INFORMATION:`${controllerName.RESTAURENT}/restaurent-information`,
    ADD_FOOD:`${controllerName.RESTAURENT}/food`,
    RESTAURENT_GET_ALL_FOODS:`${controllerName.RESTAURENT}/foods`,
    RESTAURENT:`${controllerName.RESTAURENT}`,
    UPDATE_FOOD:`${controllerName.RESTAURENT}/foods`,
    GET_ALL_FOODS:`${controllerName.RESTAURENT}/foods`,
    GET_ORDERS:`${controllerName.RESTAURENT}/orders`,
    UPDATE_ORDER_STATUS:`${controllerName.RESTAURENT}/orders`,

    //Customer
    GET_ALL_RESTAURENT_FOODS:`${controllerName.CUSTOMER}/foods`,
    ORDERS:`${controllerName.CUSTOMER}/orders`,

};