import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import * as Level0 from "./level-0/app.module";
import * as Level1 from "./level-1/app.module";
import * as Level2 from "./level-2/level-2.module";

@NgModule({
  imports: [
    Level0.AppModule,
    Level1.AppModule,
    Level2.AppModule,
    RouterModule.forChild([
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
        path: "**",
        redirectTo: "0"
      }
    ])
  ]
})
export class ComponentDeclarationModule {}
