import { NgModule, Component, InjectionToken } from "@angular/core";
import { ModuleA } from "./a.module";

// Not defined in a separate file on purpose
//
// AppModule imports ModuleA but ModuleA also imports AppModule
// to get TOKEN_A => it creates a circular import

// Not work because of circular import
export const TOKEN_A = new InjectionToken<string>("Token A");

// Works because circular import fixed with forwardRef in ModuleA
export const TOKEN_B = new InjectionToken<string>("Token B");

@Component({
  selector: "level-6",
  template: `
    <level-6-a></level-6-a>
  `
})
export class AppComponent {}

@NgModule({
  imports: [ModuleA],
  declarations: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {}
