import { Component, OnInit } from '@angular/core';
import { Transaction } from '../shared/models/transactions.models';
import { TransactionsService } from '../shared/services/transactions.service';
import { BaseComponent } from '../shared/base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent extends BaseComponent implements OnInit {

  constructor(
    private transactionsService: TransactionsService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  saveTransaction(transaction: Transaction) {
    this.transactionsService.addTransaction(transaction)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(resp => {

      },
      error => console.log(error),
    )
  }
}
