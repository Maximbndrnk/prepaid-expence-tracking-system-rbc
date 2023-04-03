import { Component, OnDestroy } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Component({
  template: "",
})
export abstract class BaseComponent implements OnDestroy {
  protected destroy$: ReplaySubject<boolean> = new ReplaySubject();

  protected completeSubject() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnDestroy(): void {
    this.completeSubject();
  }
}
