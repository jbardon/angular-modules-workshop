import { CommonModule } from "@angular/common";
import { Component, NgModule, inject } from "@angular/core";

@Component({
  selector: "component-a",
  template: `
    <fieldset>
      <legend>ComponentA</legend>
      <child-component-a />
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
      <baby-component-a />
    </fieldset>
  `,
  standalone: false
})
export class ChildComponentA {
  componentA = inject(ComponentA);
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
  componentA = inject(ComponentA, { host: true, optional: true });
}

@NgModule({
  imports: [CommonModule],
  declarations: [ComponentA, ChildComponentA, BabyComponentA],
  exports: [ComponentA]
})
export class ModuleA {}
