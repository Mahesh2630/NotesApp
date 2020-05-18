import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { NavController } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';
import { Router } from '@angular/router';
import { Note } from '../../services/notes';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.page.html',
  styleUrls: ['./todo-add.page.scss'],
})
export class TodoAddPage implements OnInit {
  title: any;
  description: any;
  public todos: Note[] = [];
  constructor(
               public todoService: TodoService,
               public navCltr: NavController,
               private toast: Toast,
               public router: Router
  ) {
  }

  ngOnInit() {
  }

  addTodo(form) {
    let todoCreatedDate = new Date();
    console.log(form.value);
    if(form.valid) {
      this.todoService.addTodos(form.value);
      this.navCltr.pop();
    } else {
      this.toast.show(`empty note discarded`, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }
  }

}
