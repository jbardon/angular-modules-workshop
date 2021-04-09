import { CommonModule } from "@angular/common";
import { NgModule, Component } from "@angular/core";
import { Level4LibraryModule } from "./library-4.module";

@Component({
  selector: "level-4",
  template: `
    <fieldset>
      <legend>Level 4: forRoot syntax to provide configuration</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          Hide providers syntax into the library with forRoot
        </li>
        <li>
          forRoot syntax is shorter than importing the module and providing
          config in the app
        </li>
        <li>
          It's always possible to not use forRoot method and do import + provide
          like in level 3.
        </li>
        <li>
          This example is simplified and don't support forChild (see level 2)
        </li>
      </ul>
      <hr />
      <fieldset>
        <legend>Level4Module</legend>
        <lib-component></lib-component>
      </fieldset>
    </fieldset>
  `
})
export class Level4Component {}

@NgModule({
  imports: [
    CommonModule,

    // Import the library and provide Config
    // The library deals with providers syntax itself
    Level4LibraryModule.forRoot({ name: "Level4Module" })
  ],
  declarations: [Level4Component]
})
export class Level4Module {}
