import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import * as Level0 from "./level-0/app.module";
import * as Level1 from "./level-1/app.module";
import * as Level2 from "./level-2/app.module";
import * as Level3 from "./level-3/app.module";
import * as Level4 from "./level-4/app.module";
import * as Level5 from "./level-5/app.module";
import * as Level6 from "./level-6/app.module";
import * as Level7 from "./level-7/app.module";

@NgModule({
  imports: [
    Level0.AppModule,
    Level1.AppModule,
    Level2.AppModule,
    Level3.AppModule,
    Level4.AppModule,
    Level5.AppModule,
    Level6.AppModule,
    Level7.AppModule,
    RouterModule.forChild([
      {
        path: "",
        children: [
          {
            path: "0",
            component: Level0.AppComponent
          },
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
            path: "5",
            component: Level5.AppComponent
          },
          {
            path: "6",
            component: Level6.AppComponent
          },
          {
            path: "7",
            component: Level7.AppComponent
          },
          {
            path: "**",
            redirectTo: "0"
          }
        ]
      }
    ])
  ]
})
export class DependencyInjectionModule {}
