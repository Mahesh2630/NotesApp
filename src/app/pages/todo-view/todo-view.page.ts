import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { NavController } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.page.html',
  styleUrls: ['./todo-view.page.scss'],
})
export class TodoViewPage implements OnInit {
  title: any;
  description: any;
  todoCreatedDate: any;
  todoEditedDate: any;
  todoItem: any [];
  item: any;
  index: any;
  constructor(
              private route: ActivatedRoute,
              public todoService: TodoService,
              public navCltr: NavController,
              private toast: Toast
  ) {
    this.todoItem = this.todoService.getTodos();
    console.log(this.todoItem);
   }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.item = params;
      let todo = JSON.parse(this.item.params.todo);
      console.log(todo);
      this.index = this.item.params.index;
      this.title = todo.title;
      this.description = todo.description;
      this.todoCreatedDate = todo.createdDate;
      this.todoEditedDate = todo.editedDate;
    });
  }

  saveTodo(form) {
    let todoEditedDate = new Date();
    form.value.createdDate = this.todoCreatedDate;
    form.value.editedDate = todoEditedDate;
    if(form.valid) {
      this.todoItem[this.index] = form.value;
      this.todoService.editTodos(this.todoItem);
      console.log(form.value);
      this.navCltr.pop();
    } else {
      this.toast.show(`empty note discarded`, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }
  }

  todoDelete() {
    this.todoService.todos.splice(this.index, 1);
    this.todoService.editTodos(this.todoService.todos);
    this.navCltr.pop();    
  }
}
