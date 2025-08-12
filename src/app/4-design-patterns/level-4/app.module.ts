import { CommonModule } from "@angular/common";
import { NgModule, Component, Directive, TemplateRef, ViewContainerRef, OnInit, inject } from "@angular/core";

@Component({
  selector: "app-root",
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
  `,
  standalone: false
})
export class AppComponent {}

@Component({
  selector: "componentA",
  template: "<ng-content />",
  standalone: false
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
  selector: "[directiveA]",
  standalone: false
})
export class DirectiveA implements OnInit {
  private templateRef = inject<TemplateRef<any>>(TemplateRef);
  private viewContainer = inject(ViewContainerRef);

  private context: any;

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
