import { Component, OnInit } from '@angular/core';
import { HelloRequest } from 'src/proto/greet.pb';
import { GreeterClient } from 'src/proto/greet.pbsc';
import { map, } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  public greetings$: Observable<string|undefined>;
  public name = '';

  constructor(
    private greeterClient: GreeterClient
  ) {

    this.greetings$ = this.greeterClient.sayHelloStream(new HelloRequest ({name: this.name}))
    .pipe(map(d => d.message));
  }

  ngOnInit(): void {
  }
}
