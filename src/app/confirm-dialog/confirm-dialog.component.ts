import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  @Input() message: string = '';
  @Output() confirmed = new EventEmitter<boolean>();

  onConfirm(result: boolean): void {
    this.confirmed.emit(result);
  }
}
