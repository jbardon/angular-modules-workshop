import { CommonModule } from "@angular/common";
import { NgModule, Component } from "@angular/core";
import { LibraryConfig, LibraryModule } from "./library.module";

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
        <legend>AppModule</legend>
        <lib-component></lib-component>
      </fieldset>
    </fieldset>
  `
})
export class AppComponent {}

@NgModule({
  imports: [
    CommonModule,

    // Import the library module here
    LibraryModule
  ],
  providers: [
    // Provide config value for the library
    { provide: LibraryConfig, useValue: { name: "AppModule" } }
  ],
  declarations: [AppComponent]
})
export class AppModule {}
