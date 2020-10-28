import { Component, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';


interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.component.scss']
})
export class AppComponent {
  customColumn = 'name';
  defaultColumns = [ 'size', 'kind', 'items' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];
  showAdd = false;
  dataSource: NbTreeGridDataSource<FSEntry>;

  custName: string = '';
  custSize: string = '';
  custKind: string = '';
  custItem: number = 0;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  // tslint:disable-next-line:member-ordering
  public data: TreeNode<FSEntry>[] = [
    {
      data: { name: 'ביוקום', size: 'דוגמה', items: 5, kind: 'לקוח עסקי' },
      children: [
        { data: { name: 'project-1.doc', kind: 'doc', size: '240 KB' } },
        { data: { name: 'project-2.doc', kind: 'doc', size: '290 KB' } },
        {
          data: { name: 'project-3', kind: 'dir', size: '466 KB', items: 3 },
          children: [
            { data: { name: 'project-3A.doc', kind: 'doc', size: '200 KB' } },
            { data: { name: 'project-3B.doc', kind: 'doc', size: '266 KB' } },
            { data: { name: 'project-3C.doc', kind: 'doc', size: '0' } },
          ],
        },
        { data: { name: 'project-4.docx', kind: 'docx', size: '900 KB' } },
      ],
    },
  ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  addEmp(){

    this.showAdd = !this.showAdd;
    if(!this.showAdd)
      this.addRow();
  }



  addRow()
  {

    if(this.custName=='' && this.custSize == ''){

      alert("שדות חובה ריקים נא למלא!!");

      return;
    }
    const newRow: TreeNode<FSEntry> =
    {
      data: {
        name: this.custName, size: this.custSize, items: this.custItem, kind: this.custKind
      }
    };
    this.data.push(newRow);
    this.dataSource = this.dataSourceBuilder.create(this.data);
    this.custKind = '';
    this.custSize = '';
    this.custName = '';
    this.custItem = 0;
  }
}


