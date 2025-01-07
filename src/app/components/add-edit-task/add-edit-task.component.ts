import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss'],
})
export class AddEditTaskComponent implements OnInit {
  taskForm: FormGroup;
  taskId: number | null = null;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
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
      this.taskId = +params.get('id')!;
      if (this.taskId) {
        const task = this.taskService.getTasks().find((task) => task.id === this.taskId);
        if (task) {
          this.isEdit = true;
          this.taskForm.patchValue(task);
        }
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      if (this.isEdit) {
        this.taskService.editTask(this.taskId!, task);
      } else {
        this.taskService.addTask(task);
      }
      this.router.navigate(['/']);
    }
  }
}
