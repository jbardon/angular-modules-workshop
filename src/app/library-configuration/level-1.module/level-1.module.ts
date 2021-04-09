import { CommonModule } from "@angular/common";
import {
  NgModule,
  Component,
  ViewChild,
  ViewContainerRef,
  AfterViewInit
} from "@angular/core";
import { ModuleLoadingService } from "../../module-loading.service";
import { Level1LibraryConfig, Level1LibraryModule } from "./library-1.module";

@Component({
  selector: "level-1",
  template: `
    <fieldset>
      <legend>Level 1: Issue without forRoot/forChild</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          LibraryModule is imported in both Level1Module and Level1ModuleA
        </li>
        <li>
          Level1ModuleA don't share the same instance of the config because it's
          lazy loaded
        </li>
      </ul>
      <hr />
      <fieldset>
        <legend>Level1Module</legend>
        <lib-component></lib-component>

        <ng-container #level1a></ng-container>
      </fieldset>
    </fieldset>
  `,
  providers: [ModuleLoadingService]
})
export class Level1Component implements AfterViewInit {
  @ViewChild("level1a", { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(
    private moduleLoadingService: ModuleLoadingService,
    public libraryConfig: Level1LibraryConfig
  ) {
    this.libraryConfig.name = "Level1Module";
  }

  ngAfterViewInit() {
    this.moduleLoadingService.lazyLoad(
      import("./level-1a.module"),
      this.container
    );
  }
}

@NgModule({
  // Import library in eagerly loaded module
  imports: [CommonModule, Level1LibraryModule],
  declarations: [Level1Component]
})
export class Level1Module {}
