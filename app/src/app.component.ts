import {Component, OnInit} from '@angular/core';
import { RestService } from './shared/testData.service';
import { TestModel } from './models/test.model';
import { APIBaseConfig } from './shared/app.configurations';

@Component({
  selector: 'my-app',
  template: ``,
  providers: [RestService, APIBaseConfig]
})

export class AppComponent  implements OnInit{
  public testItems: TestModel[];

  constructor(private _testService: RestService){}

  ngOnInit(){
    this.getTestData();
  }

  private getTestData(): void{
    this._testService.getTestData().subscribe((data:TestModel[]) => this.testItems = data,
      error => console.log(error),            //error
        () => console.log(this.testItems));  //success
  }
}
