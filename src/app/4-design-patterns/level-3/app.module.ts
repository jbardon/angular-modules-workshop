import { CommonModule } from "@angular/common";
import { NgModule, Component, Directive, ElementRef, Renderer2, AfterViewInit, OnDestroy, inject } from "@angular/core";

@Component({
  selector: "app-root",
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
  `,
  standalone: false
})
export class AppComponent {}

@Directive({
  selector: `[directiveA]`,
  standalone: false
})
export class DirectiveA implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  private citeElement: HTMLElement;

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
  `,
  standalone: false
})
export class ComponentA {}

@NgModule({
  imports: [CommonModule],
  declarations: [AppComponent, DirectiveA, ComponentA],
  exports: [AppComponent]
})
export class AppModule {}
