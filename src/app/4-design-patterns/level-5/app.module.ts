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
import { bufferCount, mapTo, scan, tap } from "rxjs/operators";

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
  providers: [ServiceA],
  host: {
    // "style.fontSize.px": "test$"
  }
})
export class DirectiveA {
  @Output() directiveA = this.serviceA;
  test$ = fromEvent(this.elementRef.nativeElement, "click").pipe(
    scan(count => {
      const next = count + 10;
      return next > 30 ? 10 : next;
    }, 10),
    tap(a => console.log("coucou", a))
  );

  constructor(private serviceA: ServiceA, private elementRef: ElementRef) {
    this.test$.subscribe(a => (this.test = a));
  }

  @HostBinding("style.fontSize.px")
  test = 10;
}

@NgModule({
  imports: [CommonModule],
  declarations: [AppComponent, DirectiveA],
  exports: [AppComponent]
})
export class AppModule {}
