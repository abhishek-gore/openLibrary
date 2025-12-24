import { RouterModule, Routes } from "@angular/router";
import { Bookdetailcomponent } from "./bookdetailcomponent/bookdetailcomponent";
import { NgModule } from "@angular/core";

const routes: Routes = [
{
    path: ':id',
    component: Bookdetailcomponent
},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class BookRoutingModule {}