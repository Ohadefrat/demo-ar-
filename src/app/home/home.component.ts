import {Component,OnInit} from "@angular/core";
import {registerElement} from "nativescript-angular/element-registry";
import {AR,ARMaterial,ARPlaneTappedEventData, ARPosition, ARScale} from "nativescript-ar";
import {Color} from "tns-core-modules/color";
import {ARNodeInteraction} from "nativescript-ar";
import {isIOS} from "tns-core-modules/platform";
import {TouchGestureEventData} from "tns-core-modules/ui/gestures";

registerElement("AR", () => require("nativescript-ar").AR);

@Component({
    selector: "demo-ar",
    moduleId: module.id,
    template: `
<ActionBar title="Ohad & Bar - AR"></ActionBar>

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
        setTimeout(() => {
            this.loaded = true;
        }, 1000);
    }

    planeMaterial = < ARMaterial > {
        diffuse: new Color("white"),
        transparency: 0.1

    };
    constructor() {
        console.log("AR supported? " + AR.isSupported());
      }

    onPlaneTapped(args: ARPlaneTappedEventData): void {
        console.log(`Plane tapped at ${args.position.x} y ${args.position.y} z ${args.position.z}`);
        const ar: AR = args.object;

        ar.addModel({
            name: isIOS ? "Models.scnassets/Car.dae" : "hockeyrink.glb",
                        position: {
                x: args.position.x,
                y: args.position.y+0.224,
                z: args.position.z
            },
            scale: 2.3,
            mass: 0.2,
            materials: [new Color("#50DEEF")],
            rotation: {
                x: -90,
                y: 0,
                z: 0
            },
            onTap: (interaction: ARNodeInteraction) => {
                console.log("Model was tapped at coordinates " + interaction.touchPosition.x + " x " + interaction.touchPosition.y);
                // let's rotate the box 5 degrees to the right
                /*interaction.node.rotateBy({
                    x: 0,
                    y: -5,
                    z: 0
                });*/

                ar.addModel({
                    name: isIOS ? "Models.scnassets/Car.dae" : "puck.glb",
                                position: {
                        x: args.position.x,
                        y: args.position.y+0.41,
                        z: args.position.z-0.35
                    },
                    scale: 0.005,
                    mass: 0.2,
                    materials: [new Color("#000000")],
                    rotation: {
                        x: 0,
                        y: -180,
                        z: 0
                    },

                    onTap: (interaction: ARNodeInteraction) => {
                        console.log("Model was tapped at coordinates " + interaction.touchPosition.x + " x " + interaction.touchPosition.y);
                        // let's rotate the box 5 degrees to the right
                        /*interaction.node.rotateBy({
                            x: 0,
                            y: -5,
                            z: 0
                        });*/
                        
                    },
                    onLongPress: ((interaction: ARNodeInteraction) => {
                        console.log("Model was longpressed, removing it just for show.");
                        interaction.node.remove();
                    })
                    
                });
                ar.addModel({
                    name: isIOS ? "Models.scnassets/Car.dae" : "PlayerBlue.glb",
                                position: {
                        x: args.position.x+0.45,
                        y: args.position.y+0.43,
                        z: args.position.z-0.325
                    },
                    
                    scale: 0.05,
                    mass: 0.2,
                    
                    materials: [new Color("blue")],
                    rotation: {
                        x: -90,
                        y: 0,
                        z: 0
                    },
                    

                    onTap: (interaction: ARNodeInteraction) => {
                        console.log("Model was tapped at coordinates " + interaction.touchPosition.x + " x " + interaction.touchPosition.y);
                        interaction.node.getPositionOnScreen

                    },
                    onLongPress: ((interaction: ARNodeInteraction) => {
                        console.log("Model was longpressed, removing it just for show.");

                    }),
                    
                    

                  
                    
                });
                ar.addModel({
                    name: isIOS ? "Models.scnassets/Car.dae" : "PlayerBlue.glb",
                                position: {
                        x: args.position.x-0.45,
                        y: args.position.y+0.43,
                        z: args.position.z-0.325
                    },
                    scale: 0.05,
                    mass: 0.2,
                    materials: [new Color("red")],
                    rotation: {
                        x: -90,
                        y: 0,
                        z: 0
                    },

                    onTap: (interaction: ARNodeInteraction) => {
                        console.log("Model was tapped at coordinates " + interaction.touchPosition.x + " x " + interaction.touchPosition.y);
                        // let's rotate the box 5 degrees to the right
                        /*interaction.node.rotateBy({
                            x: 0,
                            y: -5,
                            z: 0
                        });*/
                        
                    },
                    onLongPress: ((interaction: ARNodeInteraction) => {
                        console.log("Model was longpressed, removing it just for show.");
                        interaction.node.remove();
                    })
                    
                });

            },
            onLongPress: ((interaction: ARNodeInteraction) => {
                console.log("Model was longpressed, removing it just for show.");
                
            })
            
        });
    }

}

