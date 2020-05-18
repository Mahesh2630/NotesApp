import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'todo-list',
    loadChildren: () => import('./pages/todo-list/todo-list.module').then( m => m.TodoListPageModule)
  },
  {
    path: '',
    redirectTo: 'todo-list',
    pathMatch: 'full'
  },
  // {
  //   path: 'todo-list',
  //   loadChildren: () => import('./pages/todo-list/todo-list.module').then( m => m.TodoListPageModule)
  // },
  {
    path: 'todo-add',
    loadChildren: () => import('./pages/todo-add/todo-add.module').then( m => m.TodoAddPageModule)
  },
  {
    path: 'todo-view',
    loadChildren: () => import('./pages/todo-view/todo-view.module').then( m => m.TodoViewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
