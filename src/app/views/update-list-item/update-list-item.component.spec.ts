import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateListItemComponent } from './update-list-item.component';

describe('UpdateListItemComponent', () => {
  let component: UpdateListItemComponent;
  let fixture: ComponentFixture<UpdateListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
