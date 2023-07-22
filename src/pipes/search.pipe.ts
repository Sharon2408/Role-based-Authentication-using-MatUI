import { Pipe, PipeTransform } from '@angular/core';
import { Registration } from 'src/Model/registration';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value:any[] , search_value: string): any {
   
    if(!value) return [];
    if(!search_value) return value;


    return value.filter( str => {//str.statrus====status
          return str.task.toLowerCase().includes(search_value.toLowerCase());
        });
   }

    
  }


