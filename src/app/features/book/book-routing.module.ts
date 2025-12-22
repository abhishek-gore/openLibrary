import { RouterModule, Routes } from "@angular/router";
import { Bookdetailcomponent } from "./bookdetailcomponent/bookdetailcomponent";
import { NgModule } from "@angular/core";
import { BookComponent } from "./book.component";

const routes: Routes = [
{
    path: '',
    component: BookComponent
},
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