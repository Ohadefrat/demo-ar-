import { Component, OnInit } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
import { AR, ARMaterial, ARPlaneTappedEventData } from "nativescript-ar";
import { Color } from "tns-core-modules/color";

registerElement("AR", () => require("nativescript-ar").AR);

@Component({
  selector: "demo-ar",
  moduleId: module.id,
  template: `
<ActionBar title="NativeScript AR"></ActionBar>

<GridLayout class="page">
  <AR *ngIf="loaded"
    debugLevel="FEATURE_POINTS"
    detectPlanes="false"
    [planeMaterial]="planeMaterial"
    (planeTapped)="onPlaneTapped($event)">
  </AR>
</GridLayout>
`
})
export class HomeComponent {
  loaded = false;
  ngOnInit() {
    setTimeout(() => { this.loaded = true; }, 1000);
  }

  planeMaterial = <ARMaterial>{
    diffuse: new Color("white"),
    transparency: 0.1

  };

  onPlaneTapped(args: ARPlaneTappedEventData): void {
    const ar: AR = args.object;
    ar.addBox({
      position: {
        x: args.position.x,
        y: args.position.y,
        z: args.position.z
      },
      dimensions: {
        x: 1.0,
        y: 0.01,
        z: 0.5
      },
      mass: 20,
      materials: [new Color("white")]
    
    });
  }
}