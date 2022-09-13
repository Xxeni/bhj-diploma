/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (element) {
      this.element = element;     
    } else {
      throw new Error('Элемент не существует');
    } 
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    let self = this;
    const accountRemove = this.element.querySelector('.remove-account');
    const transactionRemove = this.element.querySelectorAll('.transaction__remove');
    accountRemove.onclick = function() {
      self.removeAccount();
    }
    for (let i = 0; i < transactionRemove.length; i++) {
      transactionRemove[i].onclick = function(event) {
        self.removeTransaction(event.currentTarget.dataset.id);
      }
    }
    
    
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions) {
      let question = confirm("Вы действительно хотите удалить счёт?");
      if (question) {
        Account.remove({id: this.lastOptions.account_id}, callback);        
        this.clear();
        function callback(err, response) {
          if (response) {
            App.updateWidgets();
            App.updateForms();          
          }
        }
      }      
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction(id) {
    // let self = this;
    let question = confirm("Вы действительно хотите удалить эту транзакцию?");
    if (question) {
      Transaction.remove({id: id}, callback );
      function callback(err, response) {
        if (response) {
          App.update();
          // self.update(this.lastOptions);
        }
      }
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    let self = this;
    if (options) {
      this.lastOptions = options;
      Account.get(this.lastOptions.account_id, callback);
      function callback(err, response) {
        if (response) {
          self.renderTitle(response.data.name);
        }
      }
      Transaction.list(options, callback1);
      function callback1(err, response) {
        if (response) {
          self.renderTransactions(response.data);
        }
      }
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    const title = this.element.querySelector('.content-title');
    title.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    let newDate = new Date(date);
    function month(num) {
      if (num === 0) {
        return 'января';
      } else if (num === 1) {
        return 'февраля';
      } else if (num === 2) {
        return 'марта';
      } else if (num === 3) {
        return 'апреля';
      } else if (num === 4) {
        return 'мая';
      } else if (num === 5) {
        return 'июня';
      } else if (num === 6) {
        return 'июля';
      } else if (num === 7) {
        return 'августа';
      } else if (num === 8) {
        return 'сентября';
      } else if (num === 9) {
        return 'октября';
      } else if (num === 10) {
        return 'ноября';
      } else if (num === 11) {
        return 'декабря';
      }
    }
    return newDate.getDate() + ' ' + month(newDate.getMonth()) + ' ' + newDate.getFullYear() + ' г. в ' + newDate.toLocaleTimeString().substring(0, 5);
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    return`
      <div class="transaction transaction_`+ item.type +` row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
            <h4 class="transaction__title">`+ item.name +`</h4>
            <div class="transaction__date">`+ this.formatDate(item.created_at) +`</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
          `+ item.sum +`<span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="`+ item.id +`">
            <i class="fa fa-trash"></i>  
          </button>
        </div>
      </div>`;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    const content = this.element.querySelector('.content');
    let transactions = '';
    for (let a in data) {
      transactions += this.getTransactionHTML(data[a]);      
    }
    content.innerHTML = transactions;
    this.registerEvents();
  }
}