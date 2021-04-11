import { NgModule, Component } from "@angular/core";
import { ModuleA } from "./a.module";
import { ModuleB } from "./b.module";

@Component({
  selector: "level-1",
  template: `
    <fieldset>
      <legend>Level 1: Access parent instance</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          HelloComponentA accessible in AppModule because ModuleA declares and
          exports HelloComponentA but is also imported in AppModule.
        </li>
      </ul>
      <hr />
      <fieldset>
        <legend>AppModule</legend>
        <level-1-a></level-1-a>
        <level-1-b></level-1-b>
      </fieldset>
    </fieldset>
  `
})
export class AppComponent {}

@NgModule({
  imports: [ModuleA, ModuleB],
  declarations: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {}
