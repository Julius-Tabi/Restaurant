import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDrinkPage } from './add-drink.page';

describe('AddDrinkPage', () => {
  let component: AddDrinkPage;
  let fixture: ComponentFixture<AddDrinkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDrinkPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDrinkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
