import { Component, NgModule } from "@angular/core";

@Component({
    selector: "hello-b",
    template: "HelloB",
    standalone: false
})
export class HelloComponentB {}

@Component({
  selector: "component-b",
  template: `
    <fieldset>
      <legend>ModuleB</legend>
      <hello-b />
    </fieldset>
  `,
    standalone: false
})
export class ComponentB {}

@NgModule({
  // HelloComponentB won't be accessible outside of ModuleA because it isn't exported.
  // Importing ModuleB in AppModule isn't enough to use HelloComponentB.
  declarations: [ComponentB, HelloComponentB],
  exports: [ComponentB]
})
export class ModuleB {}
