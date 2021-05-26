import { Component, OnInit } from '@angular/core';
import { HelloReply, HelloRequest } from 'src/proto/greet.pb';
import { GreeterClient } from 'src/proto/greet.pbsc';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  public greetings$: Observable<string|undefined>;

  constructor(
    private greeterClient: GreeterClient
  ) {

    this.greetings$ = this.greeterClient.sayHelloStream(new HelloRequest())
    .pipe(tap(d => console.log('received', d)),
    map(d => d.message));
  }

  ngOnInit(): void {
  }
}
