import { Injectable } from "@angular/core";

// Provide this service for the whole app (AppModule)
@Injectable({ providedIn: "root" })
export class ServiceA {
  name = "ServiceA";
}

export class ServiceB {
  name = "ServiceB";
}

export class ServiceC {
  name = "ServiceC";
}

export class ServiceD {
  name = "ServiceD";
}

export class ServiceE {
  name = "ServiceE";
}
