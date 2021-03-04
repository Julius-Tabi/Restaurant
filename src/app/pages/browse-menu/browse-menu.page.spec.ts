import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BrowseMenuPage } from './browse-menu.page';

describe('BrowseMenuPage', () => {
  let component: BrowseMenuPage;
  let fixture: ComponentFixture<BrowseMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BrowseMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
