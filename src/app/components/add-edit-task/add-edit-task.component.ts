import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss'],
})
export class AddEditTaskComponent implements OnInit {
  taskForm: FormGroup;
  taskId: number | null = null;
  task: Task | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['Low', Validators.required],
      status: ['Pending', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.taskId = +id;
        this.task =
          this.taskService.getTasks().find((task) => task.id === this.taskId) ||
          null;
        if (this.task) {
          this.taskForm.patchValue(this.task);
        }
      }
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      return;
    }

    const taskData = this.taskForm.value;

    if (this.taskId) {
      this.taskService.editTask(this.taskId, taskData);
    } else {
      this.taskService.addTask(taskData);
    }

    this.router.navigate(['/']);
  }
}
