import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubcription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubcription = this.debouncer
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubcription?.unsubscribe();
  }

  public emitValue = (txtInput: string): void => {
    this.onValue.emit(txtInput);
  };

  public onKeyPress = (searchTerm: string): void => {
    this.debouncer.next(searchTerm);
  };
}
