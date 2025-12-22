import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { Shelfdetailcomponent } from "./shelfdetailcomponent/shelfdetailcomponent";
import { ShelfComponent } from "./shelf.component";

const routes: Routes = [
{
    path: '',
    component: ShelfComponent
},
{
    path: ':id',
    component: Shelfdetailcomponent
},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ShelfRoutingModule {}