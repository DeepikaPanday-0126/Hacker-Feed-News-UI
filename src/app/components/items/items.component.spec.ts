import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ItemsComponent } from './items.component';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/models/items.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let mockItemService: jasmine.SpyObj<ItemService>;

  const mockItems: Item[] = [
    {
      id: 1,
      type: 'story',
      by: 'user1',
      time: 1680000000,
      title: 'Story 1',
      url: 'http://example.com/1',
      score: 100,
      descendants: 5,
      deleted: false,
      text: '',
      dead: false,
      parent: '',
      poll: 0,
      kids: [],
      parts: []
    },
    {
      id: 2,
      type: 'story',
      by: 'user2',
      time: 1680000100,
      title: 'Story 2',
      url: 'http://example.com/2',
      score: 50,
      descendants: 2,
      deleted: false,
      text: '',
      dead: false,
      parent: '',
      poll: 0,
      kids: [],
      parts: []
    }
  ];


  beforeEach(async () => {
    mockItemService = jasmine.createSpyObj('ItemService', ['getTopStories']);
    mockItemService.getTopStories.and.returnValue(of(mockItems)); // ✅ Proper mock
    await TestBed.configureTestingModule({
      declarations: [ItemsComponent],
      imports: [
        MatToolbarModule,
        MatTableModule,
        BrowserAnimationsModule,
        MatInputModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ItemService, useValue: mockItemService }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignores unknown components like mat-paginator/mat-sort in template
    }).compileComponents();
   // Mock getTopStories to return an Observable of mock items


    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
    component.paginator = {} as MatPaginator;
    component.sort = {} as MatSort;
    component.ngAfterViewInit();
    expect(component.dataSource.paginator).toBe(component.paginator);

    component.dataSource.paginator = {
      firstPage: jasmine.createSpy('firstPage')
    } as any;
  
    fixture.detectChanges(); // triggers ngOnInit

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTopStories on init', () => {
    mockItemService.getTopStories.and.returnValue(of(mockItems));
    component.ngOnInit();
    expect(mockItemService.getTopStories).toHaveBeenCalled();
  });

  it('should populate items and dataSource on getTopStories', fakeAsync(() => {
    mockItemService.getTopStories.and.returnValue(of(mockItems));
    component.getTopStories();
    tick(); // simulates async time passage
    expect(component.items.length).toBe(2);
    expect(component.dataSource.data.length).toBe(2);
  }));

  it('should filter data when applyFilter is called', () => {
    const event = { target: { value: 'story 1' } } as unknown as Event;
    component.applyFilter(event);
  
    expect(component.dataSource.filter).toBe('story 1');
    expect(component.dataSource.paginator?.firstPage).toHaveBeenCalled(); // ✅ verify it was called
  });

  it('should set paginator and sort in ngAfterViewInit', () => {
    const paginator = jasmine.createSpyObj('MatPaginator', ['']);
    const sort = jasmine.createSpyObj('MatSort', ['']);

    component.paginator = paginator;
    component.sort = sort;

    component.ngAfterViewInit();

    expect(component.dataSource.paginator).toBe(paginator);
    expect(component.dataSource.sort).toBe(sort);
  });
});
