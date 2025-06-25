import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAmigoComponent } from './registro-amigo.component';

describe('RegistroAmigoComponent', () => {
  let component: RegistroAmigoComponent;
  let fixture: ComponentFixture<RegistroAmigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroAmigoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroAmigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
