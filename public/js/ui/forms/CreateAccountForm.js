/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
  	Account.create(data, callback);
  	const formControl = document.querySelectorAll('form[id="new-account-form"] > .form-group > .form-control')[0];
  	const newAccountModal = document.getElementById('modal-new-account');
  	function callback(err, response) {
  		if (response) {
  			formControl.value = '';
  			const modalForm = new Modal(newAccountModal);
  			modalForm.close();
  			App.update();
  		}  	
  	}
  }
}