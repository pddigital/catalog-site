import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCatalogComponent } from './edit-catalog.component';

describe('EditCatalogComponent', () => {
  let component: EditCatalogComponent;
  let fixture: ComponentFixture<EditCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
