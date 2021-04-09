import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Level1Component, Level1Module } from "./level-1.module/level-1.module";
import { Level2Component, Level2Module } from "./level-2.module/level-2.module";
import { Level3Component, Level3Module } from "./level-3.module/level-3.module";
import { Level4Module } from "./level-4.module/level-4.module";
import { Level4Component } from "./level-4.module/level-4.module";

/*
TODO:
- Use providers in libraries: forRoot with params, tokens, factories, app_init
- Private injector with stream (taiga)
- Injector & directive to avoid props drilling
*/
@NgModule({
  imports: [
    Level1Module,
    Level2Module,
    Level3Module,
    Level4Module,
    RouterModule.forChild([
      {
        path: "1",
        component: Level1Component
      },
      {
        path: "2",
        component: Level2Component
      },
      {
        path: "3",
        component: Level3Component
      },
      {
        path: "4",
        component: Level4Component
      },
      {
        path: "**",
        redirectTo: "1"
      }
    ])
  ]
})
export class LibraryConfigurationModule {}
