import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // Initialize tasks with a BehaviorSubject
  private tasksSubject = new BehaviorSubject<Task[]>([
    { id: 1, title: 'Task 1', description: 'Description 1', priority: 'High', status: 'Pending' },
    { id: 2, title: 'Task 2', description: 'Description 2', priority: 'Medium', status: 'In Progress' },
    { id: 3, title: 'Task 3', description: 'Description 3', priority: 'Low', status: 'Completed' },
  ]);

  // Public observable to get task list
  tasks$ = this.tasksSubject.asObservable();

  constructor() {}

  // Method to get the current value of tasks
  getTasks(): Task[] {
    return this.tasksSubject.value;  // Access the value directly from BehaviorSubject
  }

  // Method to add a new task
  addTask(task: Task): void {
    const tasks = this.tasksSubject.value;  // Get current task list
    task.id = tasks.length + 1;  // Generate new id
    this.tasksSubject.next([...tasks, task]);  // Update task list
  }

  // Method to edit an existing task
  editTask(id: number, updatedTask: Task): void {
    const tasks = this.tasksSubject.value;
    const taskIndex = tasks.findIndex((task) => task.id === id);
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    this.tasksSubject.next([...tasks]);  // Update task list
  }

  // Method to delete a task
  deleteTask(id: number): void {
    const tasks = this.tasksSubject.value;
    this.tasksSubject.next(tasks.filter((task) => task.id !== id));  // Update task list
  }
}
