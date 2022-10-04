import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LocationPreviewComponent } from "./location-preview.component";

@NgModule({
    declarations: [LocationPreviewComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: LocationPreviewComponent
            }
        ])
    ],
    exports: []
})
export class LocationPreviewModule {}