import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
	displayedColumns = [];
  dataSource: any[] | null;
	
	@Input() data: Observable<any>;
	@Output() rowClicked = new EventEmitter<any>();

	meta: any = {
    attributes: []
  };

  constructor() { }

  ngOnInit() {
		this.data.subscribe((data) => {
			if(data.length > 0 && typeof data[0] !== 'undefined') {
				this.displayedColumns = this.prepareColumns(Object.keys(data[0]));
				this.dataSource = this.prepareData(data);
			}
		});
	}

	prepareColumns(columns: string[]) {
		return columns.filter((column) => {
			return column !== '__v'
				&& column !== 'id'
		});
	}

	prepareData(data: any[]) {
		const keys = Object.keys(data[0]);

		return data.map((model: any) => {
			const clone = { ...model };
			if (typeof clone['_id'] !== 'undefined') {
				clone._id = clone._id.slice(0, 6);
			}
			
			for (let i = 0; i < keys.length; i++) {
				if (Array.isArray(clone[keys[i]])) {
					clone[keys[i]] = JSON.stringify(this.prepareData(clone[keys[i]]), null, 2);
				}
			}
			
			return { model, clone };
		});
	}
	
	rowClick(model) {
		this.rowClicked.emit(model);
	}
}
