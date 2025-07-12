import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent {
  noteForm: FormGroup;
  dialogRef: any;
  data: any;

  constructor(private fb: FormBuilder) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: [''],
      completed: [false]
    });
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      this.dialogRef.close({
        ...this.noteForm.value,
        id: this.data?.id
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}