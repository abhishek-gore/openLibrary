import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { Shelfdetailcomponent } from "./shelfdetailcomponent/shelfdetailcomponent";

const routes: Routes = [
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