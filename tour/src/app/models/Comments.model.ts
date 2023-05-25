export class Comments
{
  public id:number;
  public post_id:number;
  public user_id:number;
  public content:string;
  public created_at:Date;
  public updated_at:Date;

  public constructor(id:number, post_id:number, user_id:number,content:string,created_at:Date,updated_at:Date,){
    this.id = id;
    this.post_id = post_id;
    this.user_id = user_id;
    this.content = content;
    this.created_at = created_at;
    this.updated_at = updated_at;

  }
}
