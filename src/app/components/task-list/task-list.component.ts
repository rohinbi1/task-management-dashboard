import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filterStatus: string = '';

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id);
    }
  }

  editTask(id: number): void {
    this.router.navigate(['/add-edit-task', id]);
  }

  filteredTasks(): Task[] {
    return this.filterStatus
      ? this.tasks.filter((task) => task.status === this.filterStatus)
      : this.tasks;
  }
}
