/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(null, callback);
    const accountListIncome = this.element.querySelector('#income-accounts-list');
    const accountListExpense = this.element.querySelector('#expense-accounts-list');
    let accounts = '';
    function callback(err, response) {
      for (let a in response.data) {
        if (accountListIncome) {
          accounts += `<option value="`+ response.data[a].id +`">`+ response.data[a].name +`</option>`;
          accountListIncome.innerHTML = accounts;
        } else if (accountListExpense) {
          accounts += `<option value="`+ response.data[a].id +`">`+ response.data[a].name +`</option>`;
          accountListExpense.innerHTML = accounts;
        }        
      }      
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, callback);
    let formControl = this.element.querySelectorAll('.form-control');
    const newIncome = document.getElementById('modal-new-income');
    const newExpense = document.getElementById('modal-new-expense');
    function callback(err, response) {
      if (response) {
        for (let i = 0; i < formControl.length; i++) {
          formControl[i].value = '';
        }
        if (data.type === 'income') {
          const modalForm = new Modal(newIncome);
          modalForm.close();
        } else if (data.type === 'expense') {
          const modalForm = new Modal(newExpense);
          modalForm.close();
        }        
        App.update();
      } 
    }
  }
}