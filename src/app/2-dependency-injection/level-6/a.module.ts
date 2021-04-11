import { CommonModule } from "@angular/common";
import {
  Component,
  forwardRef,
  Inject,
  NgModule,
  Optional
} from "@angular/core";
import { TOKEN_A, TOKEN_B } from "./app.module";
import { TOKEN_C } from "./tokens";

/* 
  AppModule imports ModuleA and then declares TOKEN_A.
  It means ModuleA is declared before TOKEN_A. 

  This import having circular dependencies works thanks to 
  live/late binding feature in ES Modules (undefined at first)

   2 solutions to solve the issue:
     * use forwardRef function to delay token usage
     * define TOKEN_A in a separate file
*/
console.log("[Level 6] ModuleA, TOKEN_A=", TOKEN_A);

@Component({
  selector: "level-6-a",
  template: `
    <fieldset>
      <legend>Level 6: Circular imports</legend>
      <p>Takeaways</p>
      <ul>
        <li>
          Declare custom tokens in a separated file from Modules and Components
          to avoid circular imports.
        </li>
      </ul>
      <hr />
      <p>TOKEN_A: {{ tokenA | json }}</p>
      <p>TOKEN_B: {{ tokenB | json }}</p>
      <p>TOKEN_C: {{ tokenC | json }}</p>
    </fieldset>
  `
})
export class ComponentA {
  constructor(
    @Inject(TOKEN_A) @Optional() public tokenA,
    @Inject(TOKEN_B) public tokenB,
    @Inject(TOKEN_C) public tokenC
  ) {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [ComponentA],
  providers: [
    { provide: TOKEN_A, useValue: "tokenA" },
    { provide: forwardRef(() => TOKEN_B), useValue: "tokenB" },
    { provide: TOKEN_C, useValue: "tokenC" }
  ],
  exports: [ComponentA]
})
export class ModuleA {}
