import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenScreenComponent } from './token-screen.component';

describe('TokenScreenComponent', () => {
  let component: TokenScreenComponent;
  let fixture: ComponentFixture<TokenScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
