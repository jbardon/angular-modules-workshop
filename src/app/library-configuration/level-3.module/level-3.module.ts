import { CommonModule } from "@angular/common";
import { NgModule, Component } from "@angular/core";
import { Level3LibraryConfig } from "./library-3.module";
import { Level3LibraryModule } from "./library-3.module";

@Component({
  selector: "level-3",
  template: `
    <fieldset>
      <legend>Level 3: Provide config from app</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          LibraryComponent needs a configuration to work
        </li>
        <li>
          It's the app job to provide a configuration in its module
        </li>
      </ul>
      <hr />
      <fieldset>
        <legend>Level3Module</legend>
        <lib-component></lib-component>
      </fieldset>
    </fieldset>
  `
})
export class Level3Component {}

@NgModule({
  imports: [
    CommonModule,

    // Import the libray module here
    Level3LibraryModule
  ],
  providers: [
    // Provide config value for the library
    { provide: Level3LibraryConfig, useValue: { name: "Level3Module" } }
  ],
  declarations: [Level3Component]
})
export class Level3Module {}
