export interface RestaurentInformation 
{
    restaurentName:string 
    description:string
    phoneNumber:string 
    address:string
    imagePath:string
    restaurentStatus:string
}

export interface orderDetails
{
    name:string,
    paid:number,
    orderDetails:[string],
    status:number,
    restaurentId:number,
    location:string
}