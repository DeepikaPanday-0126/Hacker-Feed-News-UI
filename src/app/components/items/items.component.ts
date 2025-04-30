import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/models/items.model';
import { ItemService } from 'src/app/services/item.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit,AfterViewInit {

  items!: Item[];
  isLoading: boolean = false;
  itemDisplayedColumns: string[] = [ 'title','url'];

  typeOptions: string[] = ['job', 'story', 'comment', 'poll', 'pollopt'];


  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getTopStories();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>([]); 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  


  getTopStories(): void {
    this.itemService.getTopStories().subscribe(result => {
      console.log(result);
      this.items =result;
      this.dataSource.data = this.items;
    });
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
