import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import * as Level1 from "./level-1/app.module";
import * as Level2 from "./level-2/app.module";
import * as Level3 from "./level-3/app.module";
import * as Level4 from "./level-4/app.module";

/*
TODO:
- Use providers in libraries: forRoot with params, tokens, factories, app_init
- Private injector with stream (taiga)
- Injector & directive to avoid props drilling
*/
@NgModule({
  imports: [
    Level1.AppModule,
    Level2.AppModule,
    Level3.AppModule,
    Level4.AppModule,
    RouterModule.forChild([
      {
        path: "1",
        component: Level1.AppComponent
      },
      {
        path: "2",
        component: Level2.AppComponent
      },
      {
        path: "3",
        component: Level3.AppComponent
      },
      {
        path: "4",
        component: Level4.AppComponent
      },
      {
        path: "**",
        redirectTo: "1"
      }
    ])
  ]
})
export class LibraryConfigurationModule {}
