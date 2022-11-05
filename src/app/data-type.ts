export interface Signup{
    name:string,
    password:string,
    email:string
}

export interface Login {
    email:string,
    password:string
}

export interface addProduct {
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    id:number,
    quantity:number|undefined,
    productId:undefined | number
}
export interface Cart{
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    id:number | undefined,
    quantity:number|undefined,
    userId:number,
    productId:number
}

export interface PriceSummary{
    price:number,
    discount:number,
    tax:number,
    delivary:number,
    total:number
}

export interface Order {
  email: string,
  address:string,
  mobile:string,
  totalPrice:number,
  userId:number,
  id:number|undefined
}