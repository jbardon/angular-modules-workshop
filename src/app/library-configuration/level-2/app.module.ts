import { CommonModule } from "@angular/common";
import {
  NgModule,
  Component,
  ViewChild,
  ViewContainerRef,
  AfterViewInit
} from "@angular/core";
import { ModuleLoadingService } from "../../module-loading.service";
import { LibraryModule, LibraryService } from "./library.module";

@Component({
  selector: "level-2",
  template: `
    <fieldset>
      <legend>Level 2: Provide once with forRoot</legend>
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

        <ng-container #componentA></ng-container>
      </fieldset>
    </fieldset>
  `,
  providers: [ModuleLoadingService]
})
export class AppComponent implements AfterViewInit {
  @ViewChild("componentA", { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(
    public libraryService: LibraryService, 
    private moduleLoadingService: ModuleLoadingService
  ) {}

  ngAfterViewInit() {
    this.moduleLoadingService.lazyLoad(
      import("./a.module"),
      this.container
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
