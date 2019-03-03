import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoaderState } from 'src/app/shared/models/loader-state';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
	show = false;
	
	private subscription: Subscription;

  constructor(private loader: LoaderService) { }

  ngOnInit() {
		this.subscription = this.loader.loaderState
			.subscribe((state: LoaderState) => {
				this.show = state.show;
			});
  }

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
