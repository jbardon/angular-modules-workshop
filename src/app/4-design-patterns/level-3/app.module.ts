import { CommonModule } from "@angular/common";
import {
  NgModule,
  Component,
  Directive,
  ElementRef,
  ContentChild,
  Renderer2,
  AfterViewInit,
  OnDestroy,
  HostListener
} from "@angular/core";

@Component({
  selector: "level-2",
  template: `
    <fieldset>
      <legend>Level 3: Replace directive with component</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          HelloComponentA accessible in AppModule because ModuleA declares and
          exports HelloComponentA but is also imported in AppModule.
        </li>
      </ul>
      <hr />
      <div directiveA>Hello</div>
      <div componentA>Hello</div>
    </fieldset>
  `
})
export class AppComponent {}

@Directive({
  selector: `[directiveA]`
})
export class DirectiveA implements AfterViewInit, OnDestroy {
  private citeElement: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.citeElement = this.renderer.createElement("cite");
    const citeTextElement = this.renderer.createText("jbardon");

    this.renderer.appendChild(this.citeElement, citeTextElement);
    this.renderer.appendChild(this.elementRef.nativeElement, this.citeElement);
  }



  ngOnDestroy() {
    this.renderer.removeChild(this.elementRef.nativeElement, this.citeElement);
  }
}

@Component({
  selector: "[componentA]",
  template: `
    <ng-content></ng-content>
    <cite>jbardon</cite>
  `
})
export class ComponentA {}

@NgModule({
  imports: [CommonModule],
  declarations: [AppComponent, DirectiveA, ComponentA],
  exports: [AppComponent]
})
export class AppModule {}
