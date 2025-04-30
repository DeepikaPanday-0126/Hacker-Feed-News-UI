import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [    MatDialogModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,MatFormFieldModule,MatSelectModule,MatCheckboxModule,MatToolbarModule,
        MatListModule,MatPaginatorModule,MatSortModule,MatProgressSpinnerModule,RouterTestingModule],
    declarations: [AppComponent]
  }).compileComponents();

  fixture = TestBed.createComponent(AppComponent);
  component = fixture.componentInstance;
  fixture.detectChanges(); // Ensure change detection happens
});

it('should contain the app running message', () => {
  const compiled = fixture.nativeElement; // Access DOM
  expect(compiled.querySelector('h1').textContent).toContain('HackerNewsApp app is running!');
});
});