import { Directive, EventEmitter, NgModule, Output } from "@angular/core";

@Directive({
  selector: "[directiveB]",
  exportAs: "instanceB",
  host: {
    "[style.fontSize.px]": "fontSize",
    "[style.userSelect]": "'none'",
    "(click)": "click($event.target)"
  }
})
export class DirectiveB {
  @Output() countChanged = new EventEmitter<any>();

  fontSize = 10;
  count = 1;

  click(target: HTMLElement) {
    this.count++;
    this.fontSize = this.count * 10;

    this.countChanged.emit({ text: target.textContent, count: this.count });
  }
}

@NgModule({
  declarations: [DirectiveB],
  exports: [DirectiveB]
})
export class ModuleB {}
