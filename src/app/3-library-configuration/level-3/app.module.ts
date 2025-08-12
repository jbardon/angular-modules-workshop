import { CommonModule } from "@angular/common";
import { NgModule, Component, ViewContainerRef, AfterViewInit, inject, viewChild } from "@angular/core";
import { ModuleLoadingService } from "../../module-loading.service";
import { LIB_CONFIG, LibraryModule, LibraryService } from "./library.module";

@Component({
  selector: "app-root",
  template: `
    <fieldset>
      <legend>Level 3: Issue without forRoot/forChild</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          LibraryModule is imported in both AppModule and ModuleA
        </li>
        <li>
          ModuleA don't share the same instance of the config because it's lazy
          loaded
        </li>
      </ul>
      <hr />
      <fieldset>
        <legend>AppModule</legend>

        <p>libraryService.config: {{ libraryService.config | json }}</p>
        <lib-component />

        <ng-container #componentA />
      </fieldset>
    </fieldset>
  `,
    providers: [ModuleLoadingService],
    standalone: false
})
export class AppComponent implements AfterViewInit {
  libraryService = inject(LibraryService);
  private moduleLoadingService = inject(ModuleLoadingService);

  readonly container = viewChild("componentA", { read: ViewContainerRef });

  ngAfterViewInit() {
    this.moduleLoadingService.lazyLoad(import("./a.module"), this.container());
  }
}

@NgModule({
  // Import library in eagerly loaded module
  imports: [CommonModule, LibraryModule],
  providers: [{ provide: LIB_CONFIG, useValue: "AppModule" }],
  declarations: [AppComponent]
})
export class AppModule {}
