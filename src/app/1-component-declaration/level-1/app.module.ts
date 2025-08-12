import { CommonModule } from "@angular/common";
import { NgModule, Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { ModuleA } from "./a.module";
import { ModuleB } from "./b.module";

@Component({
  selector: "app-root",
  template: `
    <fieldset>
      <legend>Level 1: Export and import a component</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          HelloComponentA accessible in AppModule because ModuleA declares and
          exports HelloComponentA but is also imported in AppModule.
        </li>
        <li>
          HelloComponentB not accessible in AppModule because ModuleB doesn't
          export HelloComponentB.
        </li>
        <li>
          Other modules can use the component by importing the component module.
        </li>
      </ul>
      <hr />
      <fieldset>
        <legend>AppModule</legend>

        <hello-a />
        <hello-b />

        <component-a />
        <component-b />
      </fieldset>
    </fieldset>
  `,
    standalone: false
})
export class AppComponent {}

@NgModule({
  imports: [
    ModuleA, // HelloComponentA is imported here
    ModuleB,
    CommonModule
  ],
  declarations: [AppComponent],
  exports: [AppComponent],

  // Avoid app to crash because component not found
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
