import { CommonModule } from "@angular/common";
import { Component, NgModule, Host, Optional } from "@angular/core";

@Component({
  selector: "component-a",
  template: `
    <fieldset>
      <legend>ComponentA</legend>
      <child-component-a></child-component-a>
    </fieldset>
  `,
  standalone: false
})
export class ComponentA {
  name = "ComponentA";
}

@Component({
  selector: "child-component-a",
  template: `
    <fieldset>
      <legend>ChildComponentA</legend>
      <p>componentA.name: {{ componentA.name | json }}</p>
      <baby-component-a></baby-component-a>
    </fieldset>
  `,
  standalone: false
})
export class ChildComponentA {
  constructor(public componentA: ComponentA) {}
}

@Component({
  selector: "baby-component-a",
  template: `
    <fieldset>
      <legend>BabyComponentA</legend>
      <p>componentA.name: {{ componentA?.name | json }}</p>
    </fieldset>
  `,
  standalone: false
})
export class BabyComponentA {
  constructor(@Host() @Optional() public componentA: ComponentA) {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [ComponentA, ChildComponentA, BabyComponentA],
  exports: [ComponentA]
})
export class ModuleA {}
