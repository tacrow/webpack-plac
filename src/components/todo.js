import { element } from './list.js'

export class App {
  Todo() {
    const inputTodo = document.querySelector('#js-input-todo')
    const addTodo = document.querySelector('#js-add-todo')
    const todoListContainer = document.querySelector('#js-todo-list-container')
    const todoListItem = document.getElementsByClassName('js-todo-list-item')
    const storageKey = 'todoList'
    let todoArray = []

    // TODOリストを生成
    const createTodoList = (text) => {
      const todoItemElement = element`<li class="list__item js-todo-list-item" data-todo="${text}">${text}<button class="delete js-delete-todo">削除</button></li>`
      todoListContainer.appendChild(todoItemElement)
    }

    const saveTodoData = (data) => {
      let obj = { todo: data }
      todoArray.push(obj)
      localStorage.setItem(storageKey, JSON.stringify(todoArray))
    }

    // TODOリストデータをLocalstrageから取得してTODOリストを生成
    const loadTodoDatas = () => {
      const todos = JSON.parse(localStorage.getItem(storageKey))
      if(todos !== null) {
        for(let todo of todos) {
          todoArray.push(todo)
          createTodoList(todo.todo)
        }
      }
    }
    loadTodoDatas();

    // TODOリストを追加
    addTodo.addEventListener('click', (e) => {
      e.preventDefault();

      // 新規TODOリストを追加
      const todo = inputTodo.value
      createTodoList(todo)

      // Localstrageに新規TODOリストを追加
      saveTodoData(todo)

      // inputを初期化
      inputTodo.value = ''
      addTodo.setAttribute('disabled', 'disabled')
    });

    // TODOリストを削除
    todoListContainer.addEventListener('click', e => {
      // DOMを削除
      if (e.target.classList.contains('js-delete-todo')){
        e.target.parentElement.remove()
      }
      // Localstrageデータを再構築
      todoArray.length = 0
      for(let i=0; i<todoListItem.length; i++) {
        let todo = todoListItem[i].getAttribute('data-todo')
        saveTodoData(todo)
      }
    });

    // inputの値を監視して、追加ボタンのdisabledを切り替え
    inputTodo.addEventListener('keyup', (e) => {
      if(inputTodo.value !== '') {
        addTodo.removeAttribute('disabled')
      } else {
        addTodo.setAttribute('disabled', 'disabled')
      }
    });
  }
}