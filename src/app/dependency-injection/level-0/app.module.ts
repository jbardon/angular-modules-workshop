import { CommonModule } from "@angular/common";
import {
  NgModule,
  Component,
  InjectionToken,
  OnInit,
  Injector
} from "@angular/core";

@Component({
    selector: "level-0",
    template: `
    <fieldset>
      <legend>Level 0: Informations about DI</legend>
      <p>Takeaways</p>
      <ul>
        <li>Remember what token, providers and injector means</li>
        <li>An injector provides a value for TOKEN</li>
      </ul>
      <hr />
      <p>
        DI is like having a a map/dictionnary to store global variables. The
        keys (called <b>tokens</b>) can be a class name or an InjectionToken.
        Values can be defined in various ways: provide the actual value, through
        a factory which returns the value or class the DI will instanciate.
      </p>
      <p>
        This map of tokens and values is called <b>providers</b> in Angular and
        is generally declared in NgModule. We access this map through an
        <b>injector</b> capable of returning the value for a given token.
      </p>

      <p>tokenValue: {{ tokenValue | json }}</p>
    </fieldset>
  `,
    standalone: false
})
export class AppComponent implements OnInit {
  tokenValue = "";

  ngOnInit() {
    const TOKEN = new InjectionToken<string>("token");

    const injector = Injector.create({
      providers: [{ provide: TOKEN, useValue: "token value" }]
    });

    this.tokenValue = injector.get(TOKEN);
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {}
