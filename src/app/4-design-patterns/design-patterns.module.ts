import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import * as Level1 from "./level-1/app.module";

export const designPatternsModuleRoutes: Routes = [
  {
    path: "1",
    component: Level1.AppComponent
  },
  {
    path: "**",
    redirectTo: "1"
  }
];

@NgModule({
  imports: [Level1.AppModule]
})
export class DesignPatternsModule {}
