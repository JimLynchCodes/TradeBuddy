import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get('p')
  getP(): Promise<string> {
    return Promise.resolve('foo')
  }
  
  @Get('ob')
  getOb(): Observable<string> {
    return of('foo')
  }
  
  
  @Get('beh-sub')
  getBehSub(): BehaviorSubject<string> {
    return new BehaviorSubject('foo')
  }
  
  @Get('nums')
  getNums(): BehaviorSubject<number> {

    const ob$ = new BehaviorSubject<number>(Math.random() * 100000)
    
    ob$.next(Math.random() * 100000)

    // this.startInterval(ob$)

    return ob$;

    // return this.appService.getHello();
  }

  private startInterval(ob$: BehaviorSubject<number>) {
    
    setInterval(() => {
      ob$.next(Math.random() * 100000)
    }, 1000)

  }

}
