import { Directive, ElementRef, NgModule, Output, inject } from "@angular/core";
import { fromEvent } from "rxjs";
import { map, scan, startWith, tap } from "rxjs/operators";

@Directive({
  selector: "[directiveC]",
  exportAs: "instanceC",
  host: {
    "[style.fontSize.px]": "fontSize",
    "[style.userSelect]": "'none'"
  },
  standalone: false
})
export class DirectiveC {
  private elementRef = inject(ElementRef);

  private count$ = fromEvent(this.elementRef.nativeElement, "click").pipe(
    scan(count => count + 1, 1),
    startWith(1)
  );

  @Output() countChanged = this.count$.pipe(
    map(count => ({ text: this.elementRef.nativeElement.textContent, count }))
  );

  fontSize = 10;

  constructor() {
    this.count$.pipe(tap(count => (this.fontSize = count * 10))).subscribe();
  }
}

@NgModule({
  declarations: [DirectiveC],
  exports: [DirectiveC]
})
export class ModuleC {}
