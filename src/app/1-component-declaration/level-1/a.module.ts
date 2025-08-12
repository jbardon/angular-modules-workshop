import { Component, NgModule } from "@angular/core";

@Component({
    selector: "hello-a",
    template: "HelloA",
    standalone: false
})
export class HelloComponentA {}

@Component({
  selector: "component-a",
  template: `
    <fieldset>
      <legend>ModuleA</legend>
      <hello-a></hello-a>
    </fieldset>
  `,
    standalone: false
})
export class ComponentA {}

@NgModule({
  // HelloComponentA is declared and exported
  // AppModule can use it by importing ModuleA
  declarations: [ComponentA, HelloComponentA],
  exports: [ComponentA, HelloComponentA]
})
export class ModuleA {}
