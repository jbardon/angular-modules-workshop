import { Component, NgModule } from "@angular/core";

@Component({
  selector: "hello",
  template: "Hello"
})
export class HelloComponent {}

@NgModule({
  declarations: [HelloComponent],
  exports: [HelloComponent]
})
export class HelloModule {}
