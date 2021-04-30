/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { addStudentComponent } from './addStudent.component';

describe('addStudentComponent', () => {
  let component: addStudentComponent;
  let fixture: ComponentFixture<addStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ addStudentComponent ],
      imports: [ReactiveFormsModule, FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(addStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
