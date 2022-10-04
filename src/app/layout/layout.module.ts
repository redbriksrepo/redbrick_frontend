import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout.component";
import { ContentComponent } from "./component/content/content.component";
import { Routing } from "../pages/routing";
import { MaterialModule } from "../material.module";

@NgModule({
    declarations: [LayoutComponent, ContentComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: LayoutComponent,
                children: Routing
            }
        ]),
        MaterialModule
    ],
    exports: []
})

export class LoyoutModule {}