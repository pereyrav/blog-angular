import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

	public page_title: string;
	public user: User;
	public identity;
	public token;
	public status;
	public url;

	public afuConfig = {
		multiple: false,
		formatsAllowed: ".jpg, .png, .gif, .jpeg",
		maxSize: "50",
		uploadAPI: {
			url:"global.url+'user/upload",
			headers: {
				"Authorization": this._userService.getToken()
			}
		},
		theme: "attachPin",
		hideProgressBar: false,
		hideResetBtn: true,
		hideSelectBtn: false,
		attachPinText: 'Sube tu avatar de usuario'
	};

  constructor(
  	private _userService: UserService
  	) {
  		this.page_title = 'Ajustes de usuario';
  		this.user = new User(1,'','','ROLE_USER','','','','');
  		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
  		this.url = global.url;
  		//Rellenar objeto user

  		this.user = this.identity;
  		//this.user.sub = null;
  }

  ngOnInit(): void {

  }

  onSubmit(Form){
  	this._userService.update(this.token, this.user).subscribe(
  		response => {
  			if(response){
  				this.status = 'success';

  				this.identity = this.user;
  				localStorage.setItem('identity', JSON.stringify(this.identity));
  			}else{
  				this.status = 'error';
  			};
  		},
  		error => {
  			this.status = 'error';
  			console.log(<any>error);
  		}
  		);
  }

  avatarUpload(datos){
  	let data = (JSON.parse(datos.response));
  	this.user.image = data.image;
  }

}
