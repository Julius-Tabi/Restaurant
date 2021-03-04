import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewReservationPage } from './view-reservation.page';

describe('ViewReservationPage', () => {
  let component: ViewReservationPage;
  let fixture: ComponentFixture<ViewReservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReservationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewReservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
