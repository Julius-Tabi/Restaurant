import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RestOwnerPage } from './rest-owner.page';

describe('RestOwnerPage', () => {
  let component: RestOwnerPage;
  let fixture: ComponentFixture<RestOwnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestOwnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RestOwnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
