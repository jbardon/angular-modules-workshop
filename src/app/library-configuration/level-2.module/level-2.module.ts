import { CommonModule } from "@angular/common";
import {
  NgModule,
  Component,
  ViewChild,
  ViewContainerRef,
  AfterViewInit
} from "@angular/core";
import { ModuleLoadingService } from "../../module-loading.service";
import { Level2LibraryConfig, Level2LibraryModule } from "./library-2.module";

@Component({
  selector: "level-2",
  template: `
    <fieldset>
      <legend>Level 2: Provide once with forRoot</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          LibraryModule is imported in both Level1Module and Level1ModuleA and
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
        <legend>Level2Module</legend>
        <lib-component></lib-component>

        <ng-container #level2a></ng-container>
      </fieldset>
    </fieldset>
  `,
  providers: [ModuleLoadingService]
})
export class Level2Component implements AfterViewInit {
  @ViewChild("level2a", { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(
    private moduleLoadingService: ModuleLoadingService,
    public libraryConfig: Level2LibraryConfig
  ) {
    this.libraryConfig.name = "Level2Module";
  }

  ngAfterViewInit() {
    this.moduleLoadingService.lazyLoad(
      import("./level-2a.module"),
      this.container
    );
  }
}

@NgModule({
  imports: [
    CommonModule,

    // Call forRoot method instead of using the class
    Level2LibraryModule.forRoot()
  ],
  declarations: [Level2Component]
})
export class Level2Module {}
