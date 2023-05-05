export class UsersModel
{
  public id:number;
  public role_id:number;
  public email:string;
  public email_verify:string;
  public status:number;
  public created_at:Date;
  public updated_at:Date;

  public constructor(id:number, role_id:number, email:string, email_verify:string, status:number, created_at:Date, updated_at:Date){
    this.id = id;
    this.role_id = role_id;
    this.email = email;
    this.email_verify = email_verify;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
