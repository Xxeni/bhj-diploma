/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
  	User.register(data, callback);
  	const formControl = Array.prototype.slice.call(document.querySelectorAll('form[id="register-form"] > .form-group > .form-control'));
  	const modalRegister = document.getElementById('modal-register');
  	function callback(err, response) {
  		if (response.success) {
  			for (let i = 0; i < formControl.length; i++) {
  				formControl[i].value = '';
  			}
  			App.setState('user-logged');
  			const modalForm = new Modal(modalRegister);
  			modalForm.close();
  		}
  	}
  }
}