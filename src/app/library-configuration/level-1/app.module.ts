import { CommonModule } from "@angular/common";
import {
  NgModule,
  Component,
  ViewChild,
  ViewContainerRef,
  AfterViewInit
} from "@angular/core";
import { ModuleLoadingService } from "../../module-loading.service";
import { LIB_CONFIG, LibraryModule } from "./library.module";

@Component({
  selector: "level-1",
  template: `
    <fieldset>
      <legend>Level 1: Issue without forRoot/forChild</legend>
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
        <lib-component></lib-component>

        <ng-container #componentA></ng-container>
      </fieldset>
    </fieldset>
  `,
  providers: [ModuleLoadingService]
})
export class AppComponent implements AfterViewInit {
  @ViewChild("componentA", { read: ViewContainerRef })
  container: ViewContainerRef;

  constructor(private moduleLoadingService: ModuleLoadingService) {}

  ngAfterViewInit() {
    this.moduleLoadingService.lazyLoad(import("./a.module"), this.container);
  }
}

@NgModule({
  // Import library in eagerly loaded module
  imports: [CommonModule, LibraryModule],
  providers: [{ provide: LIB_CONFIG, useValue: "AppModule" }],
  declarations: [AppComponent]
})
export class AppModule {}
