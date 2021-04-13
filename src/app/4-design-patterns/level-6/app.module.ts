import { CommonModule } from "@angular/common";
import {
  NgModule,
  Component,
  Directive,
  Injectable,
  ElementRef,
  Output,
  HostBinding
} from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import { bufferCount, mapTo, scan } from "rxjs/operators";

@Component({
  selector: "app-root",
  template: `
    <fieldset>
      <legend>Level 6: Expose service with directive</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          HelloComponentA accessible in AppModule because ModuleA declares and
          exports HelloComponentA but is also imported in AppModule.
        </li>
      </ul>
      <hr />
      <div (directiveA)="directiveAEvent()">
        Click 3 times
      </div>
    </fieldset>
  `
})
export class AppComponent {
  directiveAEvent() {
    console.log("DirectiveA event");
  }
}

// host, HostBinding, HostAttribute
// Service with DI ElementRef, ChangeDetector
// Observable- based service
// Outputs are subjects
@Injectable()
export class ServiceA extends Observable<number> {
  constructor(elementRef: ElementRef) {
    // Each click: 1 ,2, 3 then back to 1
    const cappedClick$ = fromEvent(elementRef.nativeElement, "click").pipe(
      scan(count => (count % 3) + 1, 0)
    );

    super(subscriber => cappedClick$.subscribe(subscriber));
  }
}

@Directive({
  selector: "[directiveA]",
  providers: [ServiceA],
  host: {
    "[style.userSelect]": "'none'"
  }
})
export class DirectiveA {
  @Output() directiveA = this.serviceA.pipe(
    bufferCount(3),
    mapTo(true)
  );

  @Output() click = this.serviceA;

  @HostBinding("style.fontSize.px")
  fontSize = 10;

  constructor(private serviceA: ServiceA) {
    this.click.subscribe(a => {
      console.log(a);
      this.fontSize = a * 15;
    });
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [AppComponent, DirectiveA],
  exports: [AppComponent]
})
export class AppModule {}
