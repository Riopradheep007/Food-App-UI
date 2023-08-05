export interface RestaurentInformation 
{
    restaurentName:string 
    description:string
    phoneNumber:string 
    address:string
    imagePath:string
    restaurentStatus:string
}

export interface ordersDetails
{
    orderId:number,
    name:string,
    paid:number,
    orderDetails:string,
    restaurentId:number,
    location:string,
    Date:string,
    status:number
}

export interface Dashboard
{
    customers:number
    revenue:number
    pendingOrders:number
    deliveredOrders:number 
    cancelledOrders:number
    revenues:[]
}