import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value:any[] , search_value: string): any {
   
   
    if(!value) return [];
    if(!search_value) return value;


    return value.filter( str => {
          return str.firstname.toLowerCase().includes(search_value.toLowerCase());
        });
    
  }

}
