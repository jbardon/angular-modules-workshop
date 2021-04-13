import {
  Directive,
  ElementRef,
  HostBinding,
  NgModule,
  Output
} from "@angular/core";
import { fromEvent } from "rxjs";
import { map, scan, tap } from "rxjs/operators";

@Directive({
  selector: "[directiveC]"
})
export class DirectiveC {
  private count$ = fromEvent(this.elementRef.nativeElement, "click").pipe(
    scan(count => count + 1, 1)
  );

  @Output() directiveC = this.count$.pipe(
    map(count => ({ text: this.elementRef.nativeElement.textContent, count }))
  );

  @HostBinding("style.fontSize.px")
  fontSize = 10;

  @HostBinding("style.userSelect")
  userSelect = "none";

  constructor(private elementRef: ElementRef) {
    this.count$.pipe(tap(count => (this.fontSize = count * 10))).subscribe();
  }
}

@NgModule({
  declarations: [DirectiveC],
  exports: [DirectiveC]
})
export class ModuleC {}
