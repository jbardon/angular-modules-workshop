import { CommonModule } from "@angular/common";
import { NgModule, Component } from "@angular/core";
import { ModuleA } from "./a.module";
import { ModuleB } from "./b.module";
import { HelloModule } from "./hello.module";

@Component({
  selector: "level-2",
  template: `
    <fieldset>
      <legend>Level 2: Don't think about inheritence</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          Child modules don't inherit from parent module imports.
        </li>
        <li>
          Declaring a component in parent module don't make it available for
          child modules
        </li>
      </ul>
      <hr />
      <fieldset>
        <legend>AppModule</legend>
        <hello></hello><br />
        <app-hello></app-hello>

        <level-2a></level-2a>
        <level-2b></level-2b>
      </fieldset>
    </fieldset>
  `
})
export class AppComponent {}

@Component({
  selector: "app-hello",
  template: "AppHello"
})
export class AppHelloComponent {}

@NgModule({
  imports: [
    ModuleA,
    ModuleB,
    HelloModule, // Make <hello> component accessible for AppComponent
    CommonModule
  ],

  // Declaring <app-hello> don't make it available in child modules
  declarations: [AppComponent, AppHelloComponent],
  exports: [AppComponent]
})
export class AppModule {}
