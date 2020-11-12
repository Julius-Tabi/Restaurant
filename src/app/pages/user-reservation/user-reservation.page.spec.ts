import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserReservationPage } from './user-reservation.page';

describe('UserReservationPage', () => {
  let component: UserReservationPage;
  let fixture: ComponentFixture<UserReservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserReservationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserReservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
