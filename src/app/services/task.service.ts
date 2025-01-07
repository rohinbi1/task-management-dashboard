import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([
    {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      priority: 'High',
      status: 'Pending',
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description 2',
      priority: 'Medium',
      status: 'In Progress',
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description 3',
      priority: 'Low',
      status: 'Completed',
    },
  ]);

  tasks$ = this.tasksSubject.asObservable();

  constructor() {}

  getTasks(): Task[] {
    return this.tasksSubject.value;
  }

  addTask(task: Task): void {
    const tasks = this.tasksSubject.value;
    task.id = tasks.length + 1;
    this.tasksSubject.next([...tasks, task]);
  }

  editTask(id: number, updatedTask: Task): void {
    const tasks = this.tasksSubject.value;
    const taskIndex = tasks.findIndex((task) => task.id === id);
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    this.tasksSubject.next([...tasks]);
  }

  deleteTask(id: number): void {
    const tasks = this.tasksSubject.value;
    this.tasksSubject.next(tasks.filter((task) => task.id !== id));
  }
}
