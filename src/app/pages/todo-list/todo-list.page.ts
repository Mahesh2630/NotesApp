import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {
  todos: any [];
  searchShow: boolean = false;
  constructor(
              public todoService: TodoService,
              public router: Router
  ) {
  }
  
  ngOnInit() {
  }
  
  ionViewWillEnter() {
    this.todoService.getTodos();
  }

  viewTodo(todo, index) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        todo: JSON.stringify(todo),
        index: index
      }
    }
    this.router.navigate(['/todo-view'], navigationExtras);
  }

  search(evnt) {
    console.log(evnt);
    if(evnt.detail.value == '') {
      this.searchBar(false);
    }
    this.todoService.todos = this.todoService.filterItems(evnt.detail.value);
  }

  onCancel(evnt) {
    this.searchBar(false);
    console.log(evnt);
    this.todoService.getTodos();
  }

  searchBar(value) {
    this.searchShow = value;
    console.log(value);
  }

  // todoDelete(index) {
  //   this.todoService.todos.splice(index, 1);
  //   this.todoService.editTodos(this.todoService.todos);
  // }

}
