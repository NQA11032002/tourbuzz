export class UsersModel
{
  public id:number;
  public user_id:number;
  public name:string;
  public birth_date:Date;
  public gender:number;
  public address:string;
  public phone:string;
  public education:string;
  public created_at:Date;
  public updated_at:Date;

  public constructor(id:number, user_id:number, name:string, birth_date:Date, gender:number, address:string, phone:string, education:string, created_at:Date, updated_at:Date){
    this.id = id;
    this.user_id = user_id;
    this.name = name;
    this.birth_date = birth_date;
    this.gender = gender;
    this.address = address;
    this.phone = phone;
    this.education = education;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
