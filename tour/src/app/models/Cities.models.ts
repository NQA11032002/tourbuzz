export class Cities
{
  public matp:string;
  public name:string;
  public type:string;
  public slug:string;

  public constructor(matp:string, name:string, type:string, slug:string){
    this.matp = matp;
    this.name = name;
    this.type = type;
    this.slug = slug;
  }
}
