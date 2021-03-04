import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewDishesPage } from './view-dishes.page';

describe('ViewDishesPage', () => {
  let component: ViewDishesPage;
  let fixture: ComponentFixture<ViewDishesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDishesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDishesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
