import { Component, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { HelloModule } from "./hello.module";

@Component({
  selector: "component-b",
  template: `
    <fieldset>
      <legend>ModuleB</legend>

      <!-- ModuleB imports HelloModule so it can use the component -->
      <hello></hello>

      <!-- 
        Not accessible because neither declared not imported
        in this component module
       -->
      <app-hello></app-hello>
    </fieldset>
  `,
    standalone: false
})
export class ComponentB {}

@NgModule({
  imports: [HelloModule],
  declarations: [ComponentB],
  exports: [ComponentB],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ModuleB {}
