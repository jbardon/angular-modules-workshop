import { CommonModule } from "@angular/common";
import { NgModule, Component, Inject } from "@angular/core";
import { TOKEN_A, TOKEN_B, TOKEN_C } from "./tokens";

@Component({
  selector: "level-3",
  template: `
    <fieldset>
      <legend>Level 3: Providers at component level (ElementInjector)</legend>
      <p>Takeaways</p>
      <ul>
        <li>AppComponent providers overrides AppModule providers</li>
        <li>ChildComponent provider overrides AppComponent providers</li>
        <li>AppModule has one injector so each token have only one value</li>
        <li>
          AppComponent and ChildComponent has its own injector (called
          ElementInjector) which have priority over AppModule injector
        </li>
      </ul>
      <hr />
      <fieldset>
        <legend>AppComponent</legend>
        <p>TOKEN_A: {{ tokenA | json }}</p>
        <p>TOKEN_B: {{ tokenB | json }}</p>
        <p>TOKEN_C: {{ tokenC | json }}</p>

        <level-3-a></level-3-a>
      </fieldset>
    </fieldset>
  `,
  providers: [
    // Component level provider (ElementInjector) overrides module providers (ModuleInjector)
    { provide: TOKEN_B, useValue: "AppComponent" },
    { provide: TOKEN_C, useValue: "AppComponent" }
  ]
})
export class AppComponent {
  constructor(
    @Inject(TOKEN_A) public tokenA,
    @Inject(TOKEN_B) public tokenB,
    @Inject(TOKEN_C) public tokenC
  ) {}
}

@Component({
  selector: "level-3-a",
  template: `
    <fieldset>
      <legend>ChildComponent</legend>
      <p>TOKEN_A: {{ level3A | json }}</p>
      <p>TOKEN_B: {{ level3B | json }}</p>
      <p>TOKEN_C: {{ level3C | json }}</p>
    </fieldset>
  `,
  // Child component ElementInjector overrides it's parent component injector
  providers: [{ provide: TOKEN_C, useValue: "ChildComponent" }]
})
export class ChildComponent {
  constructor(
    @Inject(TOKEN_A) public level3A,
    @Inject(TOKEN_B) public level3B,
    @Inject(TOKEN_C) public level3C
  ) {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [AppComponent, ChildComponent],
  providers: [
    // Not redefined at component level, keep this value in the component
    { provide: TOKEN_A, useValue: "AppModule" },
    { provide: TOKEN_B, useValue: "AppModule" },
    { provide: TOKEN_C, useValue: "AppModule" }
  ],
  exports: [AppComponent, ChildComponent]
})
export class AppModule {}
