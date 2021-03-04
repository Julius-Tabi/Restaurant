import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RestloginPage } from './restlogin.page';

describe('RestloginPage', () => {
  let component: RestloginPage;
  let fixture: ComponentFixture<RestloginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestloginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RestloginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
