import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyNumber]'
})
export class OnlyNumberDirective {

  @Input() maxDigits: number = 10; // Change this value as needed

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any) {
    const initialValue = this.el.nativeElement.value;

    // Remove non-numeric characters
    const newValue = initialValue.replace(/[^0-9]/g, '');

    // Limit the number of digits
    const limitedValue = newValue.substring(0, this.maxDigits);

    // Update the input value
    this.el.nativeElement.value = limitedValue;
  }
}
