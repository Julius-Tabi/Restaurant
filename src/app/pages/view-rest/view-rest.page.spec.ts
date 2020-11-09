import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewRestPage } from './view-rest.page';

describe('ViewRestPage', () => {
  let component: ViewRestPage;
  let fixture: ComponentFixture<ViewRestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewRestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
