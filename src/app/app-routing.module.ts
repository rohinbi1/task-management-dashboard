import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AddEditTaskComponent } from './components/add-edit-task/add-edit-task.component';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'add-task', component: AddEditTaskComponent },
  { path: 'edit-task/:id', component: AddEditTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
