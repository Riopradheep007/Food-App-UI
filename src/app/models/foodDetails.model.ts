export class foodDetails {
    id: number = 0;
    foodName:string = "";
    restaurentName:string = "";
    foodType:string = "";
    foodImage:any;
    price:number = 0;

}

export interface orders
{
    name:string,
    paid:number,
    orderDetails:string,
    restaurentId:number,
    location:string
}