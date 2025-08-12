import { Component, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

@Component({
  selector: "component-a",
  template: `
    <fieldset>
      <legend>ModuleA</legend>

      <!-- 
        AppModule can use <hello> but ComponentA cannot,
        there is no inheritence for component module imports between modules
      -->
      <hello />

      <!-- 
        Not accessible because neither declared not imported
        in this component module
       -->
      <app-hello />
    </fieldset>
  `,
    standalone: false
})
export class ComponentA {}

@NgModule({
  declarations: [ComponentA],
  exports: [ComponentA],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ModuleA {}
