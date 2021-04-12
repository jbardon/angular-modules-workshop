import { CommonModule } from "@angular/common";
import { NgModule, Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <fieldset>
      <legend>Level 0: Declare and use a component</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          HelloComponent is declared in AppModule using declarations property.
        </li>
        <li>
          HelloComponent can't be declared in another module. A single component
          can't ba declared in many modules.
        </li>
        <li>
          HomeComponent is accessible in any other AppModule component
        </li>
      </ul>
      <hr />
      <fieldset>
        <legend>AppModule</legend>
        <hello></hello>
      </fieldset>
    </fieldset>
  `
})
export class AppComponent {}

@Component({
  selector: "hello",
  template: "Hello"
})
export class HelloComponent {}

@NgModule({
  imports: [CommonModule],
  declarations: [AppComponent, HelloComponent]
})
export class AppModule {}
