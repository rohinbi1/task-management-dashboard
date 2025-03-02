import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  tasks: Task[] = this.taskService.getTasks();
  showDialog: boolean = false;
  taskIdToDelete: number | null = null;
  filterStatus: string = '';
  
  uniqueStatuses: string[] = [];

  constructor(private taskService: TaskService, private router: Router) {
    this.loadUniqueStatuses();
  }

  loadUniqueStatuses() {
    const statuses = this.tasks.map(task => task.status);
    this.uniqueStatuses = Array.from(new Set(statuses));
  }

  onEdit(task: Task) {
    this.router.navigate(['/edit-task', task.id]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id);
    }
  }

  openDeleteDialog(taskId: number): void {
    this.showDialog = true;
    this.taskIdToDelete = taskId;
  }

  closeDialog(): void {
    this.showDialog = false;
    this.taskIdToDelete = null;
  }

  onDeleteConfirmed(confirmed: boolean): void {
    if (confirmed && this.taskIdToDelete !== null) {
      this.taskService.deleteTask(this.taskIdToDelete);
      this.tasks = this.taskService.getTasks();
      this.loadUniqueStatuses(); 
    }
    this.closeDialog();
  }

  onAdd() {
    this.router.navigate(['/add-task']);
  }

  filteredTasks(): Task[] {
    return this.filterStatus
      ? this.tasks.filter((task) => task.status === this.filterStatus)
      : this.tasks;
  }
}
