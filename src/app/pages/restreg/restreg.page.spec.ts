import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RestregPage } from './restreg.page';

describe('RestregPage', () => {
  let component: RestregPage;
  let fixture: ComponentFixture<RestregPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestregPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RestregPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
