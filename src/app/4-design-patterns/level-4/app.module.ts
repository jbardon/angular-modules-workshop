import { CommonModule } from "@angular/common";
import {
  NgModule,
  Component,
  Directive,
  TemplateRef,
  ViewContainerRef,
  OnInit
} from "@angular/core";

@Component({
  selector: "level-4",
  template: `
    <fieldset>
      <legend>Level 4: Renderless components</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          HelloComponentA accessible in AppModule because ModuleA declares and
          exports HelloComponentA but is also imported in AppModule.
        </li>
      </ul>
      <hr />
      <componentA #counter>
        <span
          >Counter: {{ counter.count }}
          <button (click)="counter.increment()">Add</button></span
        > </componentA
      ><br />

      <span *directiveA="let counter"
        >Counter: {{ counter.count }}
        <button (click)="counter.increment()">Add</button></span
      >
    </fieldset>
  `
})
export class AppComponent {}

@Component({
  selector: "componentA",
  template: "<ng-content></ng-content>"
})
export class ComponentA {
  private counter = 0;

  get count() {
    return this.counter;
  }

  increment() {
    this.counter++;
  }
}

@Directive({
  selector: "[directiveA]"
})
export class DirectiveA implements OnInit {
  private context: any;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.context = {
      $implicit: {
        count: 0,
        increment: () => this.increment()
      }
    };
    this.viewContainer.createEmbeddedView(this.templateRef, this.context);
  }

  increment() {
    this.context.$implicit.count++;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [AppComponent, ComponentA, DirectiveA],
  exports: [AppComponent]
})
export class AppModule {}
