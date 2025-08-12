import { CommonModule } from "@angular/common";
import { NgModule, Component, ViewContainerRef, AfterViewInit, inject, viewChild } from "@angular/core";
import { ModuleLoadingService } from "../../module-loading.service";
import { LibraryModule, LibraryService } from "./library.module";

@Component({
  selector: "app-root",
  template: `
    <fieldset>
      <legend>Level 4: Provide once with forRoot</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          LibraryModule is imported in both Level1Module and ModuleA and
          config keep the same value
        </li>
        <li>
          forRoot must be called once in AppModule providing unique config
        </li>
        <li>
          forChild can be used any time providing everything except config
        </li>
      </ul>
      <hr />
      <fieldset>
        <legend>AppModule</legend>
        <p>libraryService.config: {{ libraryService.config }}</p>

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
    this.moduleLoadingService.lazyLoad(
      import("./a.module"),
      this.container()
    );
  }
}

@NgModule({
  imports: [
    CommonModule,

    // Call forRoot method instead of using the class
    LibraryModule.forRoot()
  ],
  declarations: [AppComponent]
})
export class AppModule {}
