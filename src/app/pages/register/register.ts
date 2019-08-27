import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginService} from "../../providers/login.service";
import {WelcomePage} from "../welcome/welcome";
import {TabsPage} from "../tabs/tabs";
import {LoadingService} from "../../providers/loading.service";

@Component({
	selector: 'register',
	templateUrl: 'register.html'
})
export class RegisterPage {

	public email: string;
	public password: string;
	public role: string;
	public exceptionMessage: string;

	constructor(private navController: NavController,
				private loadingService: LoadingService,
				private loginService: LoginService) {
	}

	public backToWelcome() {
		this.navController.push(WelcomePage)
	}

	public register() {
		let loading: any = this.loadingService.createLoadingPage("Aguarde...");
		loading.present();
		const user = {
			email: this.email,
			password: this.password,
			role: this.role
		};
		this.loginService.newUser(user).subscribe(response => {
			if (response) {
				this.loginService.setUser(response.user);
				this.navController.push(TabsPage);
			} else {
				this.exceptionMessage = response.message;
			}
			loading.dismiss();
		}, () => {
			this.exceptionMessage = 'Não foi possível realizar o cadastro';
			loading.dismiss();
		});
	}
}
