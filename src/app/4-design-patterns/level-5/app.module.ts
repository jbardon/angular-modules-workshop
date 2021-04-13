import { CommonModule } from "@angular/common";
import { NgModule, Component, ViewChild, AfterViewInit } from "@angular/core";
import { zip } from "rxjs";
import { ModuleA, DirectiveA } from "./a.module";
import { ModuleB, DirectiveB } from "./b.module";
import { ModuleC, DirectiveC } from "./c.module";

@Component({
  selector: "app-root",
  template: `
    <fieldset>
      <legend>Level 5: Expose service with directive</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          HelloComponentA accessible in AppModule because ModuleA declares and
          exports HelloComponentA but is also imported in AppModule.
        </li>
      </ul>
      <hr />
      <div (directiveA)="directiveEvent($event)">DirectiveA</div>
      <div (directiveB)="directiveEvent($event)">DirectiveB</div>
      <div (directiveC)="directiveEvent($event)">DirectiveC</div>
    </fieldset>
  `
})
export class AppComponent implements AfterViewInit {
  @ViewChild(DirectiveA) directiveA;
  @ViewChild(DirectiveB) directiveB;
  @ViewChild(DirectiveC) directiveC;

  ngAfterViewInit() {
    zip(
      this.directiveA.directiveA,
      this.directiveB.directiveB,
      this.directiveC.directiveC
    ).subscribe(() => console.log("[Level5] All directives clicked"));
  }

  directiveEvent(event) {
    console.log(`[Level5] ${event.text}: ${event.count}`);
  }
}

@NgModule({
  imports: [CommonModule, ModuleA, ModuleB, ModuleC],
  declarations: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {}
