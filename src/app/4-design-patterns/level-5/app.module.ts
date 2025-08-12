import { CommonModule } from "@angular/common";
import { NgModule, Component, AfterViewInit, viewChild } from "@angular/core";
import { zip } from "rxjs";
import { tap } from "rxjs/operators";
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
      <div
        #directiveA="instanceA"
        directiveA
        (countChanged)="directiveEvent($event)"
      >
        DirectiveA ({{ directiveA.count }})
      </div>

      <div
        #directiveB="instanceB"
        directiveB
        (countChanged)="directiveEvent($event)"
      >
        DirectiveB ({{ directiveB.count }})
      </div>

      <div
        #directiveC="instanceC"
        directiveC
        (countChanged)="directiveEvent($event)"
      >
        DirectiveC ({{ (directiveC.countChanged | async).count }})
      </div>

      <div>allClicked: {{ allClicked }}</div>
    </fieldset>
  `,
  standalone: false
})
export class AppComponent implements AfterViewInit {
  readonly directiveA = viewChild(DirectiveA);
  readonly directiveB = viewChild(DirectiveB);
  readonly directiveC = viewChild(DirectiveC);

  allClicked = 0;

  ngAfterViewInit() {
    zip(
      this.directiveA().countChanged,
      this.directiveB().countChanged,
      this.directiveC().countChanged
    )
      .pipe(
        tap(() => {
          console.log("[Level5] All directives clicked");
          this.allClicked++;
        })
      )
      .subscribe();
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
