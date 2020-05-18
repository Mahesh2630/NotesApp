import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Note } from '../services/notes';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todos: Note[] = [];
  //todosChange: any;
  public searchArray: any[] = [];
  constructor(private storage: Storage) { }

  addTodos(item: Note) {
    item.createdDate = new Date();
    this.todos.push(item);
    // this.todosChange.next(this.todos);
    this.storage.set('note', this.todos);
  }

  getTodos() {
    this.storage.get('note').then((value) => {
      if(value !=null && value != undefined && value != '') {
        this.todos = value;
      }
    });
    return this.todos;
  }

  editTodos(todos) {
    this.storage.set('note', todos);
  }

  filterItems(searchTerm) {
    this.storage.get('note').then((value) => {
      this.searchArray = value;
    });
    return this.searchArray.filter(item => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ;
    });
  }
}
