export class Posts
{
  public address_travel_id:number;
  public type_travel_id:number;
  public title:string;
  public content:string;
  public status:number;

  public constructor(address_travel_id:number, type_travel_id:number, title:string, content:string, status:number){
    this.address_travel_id = address_travel_id;
    this.type_travel_id = type_travel_id;
    this.title = title;
    this.content = content;
    this.status = status;
  }
}
