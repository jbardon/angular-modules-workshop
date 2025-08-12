import { CommonModule } from "@angular/common";
import {
  NgModule,
  Component,
  Inject,
  AfterViewInit,
  ViewContainerRef,
  ViewChild,
  Optional
} from "@angular/core";
import { ModuleLoadingService } from "../../module-loading.service";
import { TOKEN_A, TOKEN_B, TOKEN_C } from "./tokens";

@Component({
    selector: "level-5",
    template: `
    <fieldset>
      <legend>Level 5: Lazy loaded modules</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          Lazy loaded module have contrary behavior compared to imported modules
          on two points.
        </li>
        <li>
          ModuleA can redefine locally a value for TOKEN_B (already defined in
          AppModule)
        </li>
        <li>
          AppModule can't access to TOKEN_C only defined in ModuleA
        </li>
        <li>
          BUT ModuleA can access to TOKEN_A defined in AppModule (inheritence)
        </li>
        <blockquote>
          The reason for different behavior is each lazy loaded modules have its
          own ModuleInjector unlike eagerly loaded modules (AppModule with
          imports) which have only one ModuleInjector at AppModule level.
        </blockquote>
      </ul>
      <hr />
      <fieldset>
        <legend>AppModule</legend>
        <p>TOKEN_A: {{ tokenA | json }}</p>
        <p>TOKEN_B: {{ tokenB | json }}</p>
        <p>TOKEN_C: {{ tokenC | json }}</p>

        <ng-container #componentA></ng-container>
      </fieldset>
    </fieldset>
  `,
    providers: [ModuleLoadingService],
    standalone: false
})
export class AppComponent implements AfterViewInit {
  @ViewChild("componentA", { read: ViewContainerRef })
  container: ViewContainerRef;

  constructor(
    @Inject(TOKEN_A) public tokenA,
    @Inject(TOKEN_B) public tokenB,
    // Optional avoid the app to crash if TOKEN_C value
    // isn't provided by element or module injector
    @Inject(TOKEN_C) @Optional() public tokenC,
    private moduleLoaderService: ModuleLoadingService
  ) {}

  ngAfterViewInit() {
    this.moduleLoaderService.lazyLoad(import("./a.module"), this.container);
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [AppComponent],
  providers: [
    // Not redefined in ModuleA, so ModuleA use this value
    { provide: TOKEN_A, useValue: "AppModule" },

    // Redefined in ModuleA. ModuleA is lazy loaded so it has its own ModuleInjector.
    // It means it can overrides AppModule providers
    { provide: TOKEN_B, useValue: "AppModule" }
  ],
  exports: [AppComponent]
})
export class AppModule {}
