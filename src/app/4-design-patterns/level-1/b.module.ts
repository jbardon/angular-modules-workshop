import { CommonModule } from "@angular/common";
import { Component, forwardRef, InjectionToken, NgModule, inject } from "@angular/core";

export const COMPONENT_B_REF = new InjectionToken<ComponentB>(
  "Closest Component B"
);

@Component({
  selector: "component-b",
  template: `
    <fieldset>
      <legend>ComponentB</legend>
      <child-component-b />
    </fieldset>
  `,
  standalone: false,
  providers: [
    {
      provide: COMPONENT_B_REF,
      useExisting: forwardRef(() => ComponentB)
    }
  ]
})
export class ComponentB {
  name = "ComponentB";
}

@Component({
  selector: "child-component-b",
  template: `
    <fieldset>
      <legend>ChildComponentB</legend>
      <p>componentB.name: {{ componentB.name | json }}</p>
    </fieldset>
  `,
  standalone: false
})
export class ChildComponentB {
  componentB = inject<ComponentB>(COMPONENT_B_REF);
}

@NgModule({
  imports: [CommonModule],
  declarations: [ComponentB, ChildComponentB],
  exports: [ComponentB]
})
export class ModuleB {}
