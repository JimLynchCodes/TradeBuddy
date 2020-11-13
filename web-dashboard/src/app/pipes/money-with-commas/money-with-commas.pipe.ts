import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyWithCommas'
})
export class MoneyWithCommasPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    if (typeof value !== 'string')
      value = '$' + JSON.stringify(value)
    else
      value = '$' + value

    const dotIndex = value.indexOf('.')

    const decimalPiece = dotIndex > 0 ? value.substr(dotIndex + 1) : ''

    const withoutDecimal =  dotIndex > 0 ? value.substring(1, dotIndex) :  value.substring(1, value.length)

    const integerPiece = withoutDecimal
      .split('')
      .reverse()
      .map((letter, index) => {

        console.log('index! ', index)

        if (index === 0)
          return letter

        return (index + 0) % 3 === 0 ? letter + ',' : letter

      })
      .reverse()
      .join('');

    return integerPiece + (decimalPiece.length > 0 ? '.' : '') + decimalPiece

  }
}
