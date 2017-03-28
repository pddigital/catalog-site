import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrandComponent } from './brand/brand.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { CarouselModule } from 'ng2-bootstrap';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { AddCatalogComponent } from './add-catalog/add-catalog.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { MyDatePickerModule } from 'mydatepicker';
import { EditCatalogComponent } from './edit-catalog/edit-catalog.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { ModalModule } from 'ng2-bootstrap/modal';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { StoreModule } from '@ngrx/store';
import { BrandService } from './brand.service';
import { BrandReducer } from './reducers/brand.reducer';
import { LoginReducer } from './reducers/login.reducer';
import { CatalogReducer } from './reducers/catalog.reducer';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { AuthGuardService } from './auth-guard.service';

const ROUTES = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'brand/:id',
    component: BrandComponent
  },
  {
    path: 'catalog/:id',
    component: CatalogPageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    canActivate:[AuthGuardService],
    component: AdminComponent
  },
      {
    path: 'catalogs/:id',
    canActivate:[AuthGuardService],
    component: CatalogsComponent
  },
  {
    path: 'add-catalog',
    canActivate:[AuthGuardService],
    component: AddCatalogComponent
  },
  {
    path: 'add-brand',
    canActivate:[AuthGuardService],
    component: AddBrandComponent
  },
  {
    path: 'edit-brand/:id',
    canActivate:[AuthGuardService],
    component: EditBrandComponent
  },
  {
    path: 'edit-catalog/:id',
    canActivate:[AuthGuardService],
    component: EditCatalogComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    PageNotFoundComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    CatalogPageComponent,
    PdfViewerComponent,
    AddCatalogComponent,
    AddBrandComponent,
    EditCatalogComponent,
    EditBrandComponent,
    DeleteModalComponent,
    CatalogsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    HttpModule,
    MyDatePickerModule,
    StoreModule.provideStore({ brands: BrandReducer, login: LoginReducer, catalogs: CatalogReducer }),
    ModalModule.forRoot(),
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [BrandService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
