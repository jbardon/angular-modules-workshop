import { CommonModule } from "@angular/common";
import { NgModule, Component } from "@angular/core";

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
      </fieldset>
    </fieldset>
  `
})
export class AppComponent {}

@NgModule({
  imports: [CommonModule],
  declarations: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {}
