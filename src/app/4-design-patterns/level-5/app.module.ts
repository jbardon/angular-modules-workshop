import { CommonModule } from "@angular/common";
import {
  NgModule,
  Component,
  Directive,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  Injectable,
  ElementRef,
  Output
} from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import { bufferCount, mapTo, windowCount } from "rxjs/operators";

@Component({
  selector: "app-root",
  template: `
    <fieldset>
      <legend>Level 5: Expose service with directive</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          HelloComponentA accessible in AppModule because ModuleA declares and
          exports HelloComponentA but is also imported in AppModule.
        </li>
      </ul>
      <hr />
      <div (directiveA)="directiveAEvent()">Click 3 times</div>
    </fieldset>
  `
})
export class AppComponent {
  directiveAEvent() {
    console.log("DirectiveA event");
  }
}

@Injectable()
export class ServiceA extends Observable<boolean> {
  constructor(elementRef: ElementRef) {
    const tripleClick$ = fromEvent(elementRef.nativeElement, "click").pipe(
      bufferCount(3),
      mapTo(true)
    );

    super(subscriber => tripleClick$.subscribe(subscriber));
  }
}

@Directive({
  selector: "[directiveA]",
  providers: [ServiceA]
})
export class DirectiveA {
  @Output() directiveA = this.serviceA;
  constructor(private serviceA: ServiceA) {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [AppComponent, DirectiveA],
  exports: [AppComponent]
})
export class AppModule {}
