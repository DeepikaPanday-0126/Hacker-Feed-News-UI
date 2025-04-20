import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/items.model';
import { ItemService } from 'src/app/services/item.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items: Item[] = [];
  newItem: any =  {
    id: 0,
    deleted: false,
    type: '',
    by: '',
    time: Date.now(),
    text: '',
    dead: false,
    parent: '',
    poll: 0,
    kids: [],
    parts: [],
    url: '',
    score: 0,
    title: '',
    descendants: 0,
    // Temporary string inputs for the UI
    kidsString: '',
    partsString: ''
  };
  editRowId: number | null = null;
  editCache: any = {};
  showAddRow: boolean = false;

  itemDisplayedColumns: string[] = ['id', 'title', 'type', 'text', 'time', 'score', 'poll', 'kids', 'url', 'parent', 'parts', 'descendants', 'actions'];

  typeOptions: string[] = ['job', 'story', 'comment', 'poll', 'pollopt'];


  constructor(private itemService: ItemService) { this.resetNewItem()}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems().subscribe((data: Item[]) => {
      this.items = data;
    });
  }

  addItem() {
    this.newItem.kids = this.newItem.kidsString
      ? this.newItem.kidsString.split(',').map((s: string) => parseInt(s.trim(), 10))
      : [];
    this.newItem.parts = this.newItem.partsString
      ? this.newItem.partsString.split(',').map((s: string) => parseInt(s.trim(), 10))
      : [];
  
    // Remove temporary fields
    delete this.newItem.kidsString;
    delete this.newItem.partsString;
  
    this.itemService.createItem(this.newItem).subscribe(res => {
      this.getItems();
      this.cancelAdd();
    });
  }
  
  deleteItem(itemId: number): void {
    this.itemService.deleteItem(itemId).subscribe(() => {
      this.items = this.items.filter(item => item.id !== itemId);
    });
  }

  startEdit(item: Item): void {
    this.editRowId = item.id;
    this.editCache = { ...item };
  }

  saveEdit(): void {
    this.itemService.updateItem(this.editCache.id,this.editCache).subscribe((response: any) => {
      if(response){
      const index = this.items.findIndex(item => item.id === response.id);
      this.items[index] = response;
      }
      this.getItems();
      this.cancelEdit();
     
    },error=>{
      console.log(error);
      this.editRowId=null;
    });
  }

  cancelEdit(): void {
    this.editRowId = null;
  }

  cancelAdd(): void {
    this.showAddRow = false;

    this. resetNewItem();
  }
  resetNewItem() {
    this.newItem = {
      id: 0,
      deleted: false,
      type: '',
      by: '',
      time: Date.now(),
      text: '',
      dead: false,
      parent: '',
      poll: 0,
      kids: [],
      parts: [],
      url: '',
      score: 0,
      title: '',
      descendants: 0,
      // Temporary string inputs for the UI
      kidsString: '',
      partsString: ''
    };
    
  }
}
