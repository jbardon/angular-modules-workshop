import { CommonModule } from "@angular/common";
import { NgModule, Component, AfterViewInit, ViewContainerRef, ViewChild, inject } from "@angular/core";
import { ModuleLoadingService } from "../../module-loading.service";
import { TOKEN_A, TOKEN_B, TOKEN_C } from "./tokens";

@Component({
  selector: "app-root",
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
  tokenA = inject(TOKEN_A);
  tokenB = inject(TOKEN_B);
  tokenC = inject(TOKEN_C, { optional: true });
  private moduleLoaderService = inject(ModuleLoadingService);

  @ViewChild("componentA", { read: ViewContainerRef })
  container: ViewContainerRef;

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
