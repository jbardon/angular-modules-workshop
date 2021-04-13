import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  NgModule,
  Output
} from "@angular/core";

@Directive({
  selector: "[directiveA]"
})
export class DirectiveA {
  @Output() directiveA = new EventEmitter<any>();

  @HostBinding("style.fontSize.px") fontSize = 10;
  @HostBinding("style.userSelect") userSelect = "none";

  count = 1;

  @HostListener("click", ["$event.target"])
  click(target: HTMLElement) {
    this.count++;
    this.fontSize = this.count * 10;

    this.directiveA.emit({ text: target.textContent, count: this.count });
  }
}

@NgModule({
  declarations: [DirectiveA],
  exports: [DirectiveA]
})
export class ModuleA {}
