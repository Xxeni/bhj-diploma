/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
  	User.login(data, callback);
  	const formControl = Array.prototype.slice.call(document.querySelectorAll('form[id="login-form"] > .form-group > .form-control'));
  	const modalLogin = document.getElementById('modal-login');
  	function callback(err, response) {
  		if (response.success) {
  			for (let i = 0; i < formControl.length; i++) {
  				formControl[i].value = '';
  			}
  			App.setState('user-logged');
  			const modalForm = new Modal(modalLogin);
  			modalForm.close();
  		}
  	}
  }
}