import { CommonModule } from "@angular/common";
import {
  NgModule,
  Component,
  Directive,
  ElementRef,
  ContentChild
} from "@angular/core";

@Component({
  selector: "level-2",
  template: `
    <fieldset>
      <legend>Level 2: Directive as selector</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          HelloComponentA accessible in AppModule because ModuleA declares and
          exports HelloComponentA but is also imported in AppModule.
        </li>
      </ul>
      <hr />
      <fieldset>
        <legend>AppModule</legend>

        <level-2-a>
          <!-- Can't use template reference variable here -->
          <span directiveA>ComponentA content</span>
        </level-2-a>
      </fieldset>
    </fieldset>
  `
})
export class AppComponent {}

@Directive({
  selector: `[directiveA]`
})
export class DirectiveA {
  constructor(private elementRef: ElementRef) {}

  get contentText() {
    return this.elementRef.nativeElement.textContent;
  }
}

@Component({
  selector: "level-2-a",
  template: `
    <fieldset>
      <legend>ComponentA</legend>
      <p>directiveA.contentText: {{ directiveA.contentText | json }}</p>
    </fieldset>
  `
})
export class ComponentA {
  @ContentChild(DirectiveA) directiveA: DirectiveA;
}

@NgModule({
  imports: [CommonModule],
  declarations: [AppComponent, ComponentA, DirectiveA],
  exports: [AppComponent]
})
export class AppModule {}
