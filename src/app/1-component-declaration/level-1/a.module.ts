import { Component, NgModule } from "@angular/core";

@Component({
  selector: "hello-a",
  template: "HelloA"
})
export class HelloComponentA {}

@Component({
  selector: "level-1a",
  template: `
    <fieldset>
      <legend>ModuleA</legend>
      <hello-a></hello-a>
    </fieldset>
  `
})
export class ComponentA {}

@NgModule({
  // HelloComponentA is declared and exported
  // AppModule can use it by importing ModuleA
  declarations: [ComponentA, HelloComponentA],
  exports: [ComponentA, HelloComponentA]
})
export class ModuleA {}
