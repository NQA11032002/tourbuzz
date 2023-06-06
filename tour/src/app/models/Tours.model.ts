export class Tours
{
  public id:number = 0;
  public user_id:number = 0;
  public title:string = "";
  public description:string = "";
  public address_start:string = "";
  public address_end:string = "";
  public date_start:Date = new Date();
  public date_end:Date = new Date();
  public price_tour:number = 0.0;
  public detail_price_tour:string = "";
  public amount_customer_maximum:number = 0;
  public amount_customer_present:number = 0;
  public status:number = 0;
  public created_at:Date = new Date();
  public updated_at:Date = new Date();
}
