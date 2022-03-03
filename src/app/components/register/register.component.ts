import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
	public page_title: string;
  public user: User;
  public status: string;

  constructor(
    private _userService: UserService,
    ){
  	this.page_title = "Registrate";
    this.user = new User(1,'','','ROLE_USER','','','','');
   }

  ngOnInit() {
  	console.log('Componente de registro lanzado!');
    console.log(this._userService.test);
  }

  onSubmit(Form){
      this._userService.register(this.user).subscribe(
        response => {
          if(response.status == 'success'){
            this.status = response.status;

          Form.reset();

          }else{
            this.status = 'error';

          }
          Form.reset();
        },
        error => {
          this.status = 'error';
          console.log(<any>error);
        }
      );
      
  }

}
