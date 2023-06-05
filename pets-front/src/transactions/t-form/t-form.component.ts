import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Transaction } from '../../shared/models/transactions.models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-t-form',
  templateUrl: './t-form.component.html',
  styleUrls: ['./t-form.component.scss']
})
export class TFormComponent implements OnInit {

  @Output() submitRecord = new EventEmitter<Transaction>();
  form?: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  addTransaction(): void {
    if (this.form?.valid) {
      this.submitRecord.emit(this.form.getRawValue());
    }
  }

  private initForm(): void {
    this.form = this.fb.group({});
  }
}
