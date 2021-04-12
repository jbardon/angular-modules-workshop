import { CommonModule } from "@angular/common";
import { NgModule, Component } from "@angular/core";
import { LibraryModule } from "./library.module";

@Component({
  selector: "app-root",
  template: `
    <fieldset>
      <legend>Level 2: forRoot syntax to provide configuration</legend>
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

    // Import the library and provide Config
    // The library deals with providers syntax itself
    LibraryModule.forRoot({ name: "AppModule" })
  ],
  declarations: [AppComponent]
})
export class AppModule {}
