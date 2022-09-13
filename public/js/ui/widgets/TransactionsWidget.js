/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element) {
      this.element = element;
      this.registerEvents();
    } else {
      throw new Error('Элемент не существует');
    } 
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const createIncome = this.element.querySelector('.create-income-button');
    const createExpense = this.element.querySelector('.create-expense-button');
    createIncome.onclick = function() {
      App.getModal('newIncome').open();
    }
    createExpense.onclick = function() {
      App.getModal('newExpense').open();
    }
  }
}
