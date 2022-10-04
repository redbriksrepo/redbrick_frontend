import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router"
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CitiesComponent } from "./cities/cities.component";
import { LocationInCityComponent } from "./location-in-city/location-in-city.component";

@NgModule({
    declarations: [DashboardComponent, CitiesComponent, LocationInCityComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'cities',
                component: CitiesComponent
            },
            {
                path: 'locations-in-city/:city',
                component: LocationInCityComponent
            }
        ])
    ],
    exports: []
})

export class DashboardModule { }