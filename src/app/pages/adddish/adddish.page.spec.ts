import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdddishPage } from './adddish.page';

describe('AdddishPage', () => {
  let component: AdddishPage;
  let fixture: ComponentFixture<AdddishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddishPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdddishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
