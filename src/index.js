/* ДЗ 2 - работа с массивами и объеектами */
import { randomValue as random, randomNumberArray } from '../helper';
/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
  return array;
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
  let copy = [];
  for (let i = 0; i < array.length; i++) {
    copy[i] = fn(array[i], i, array);
  }
  return copy;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
 function reduce(array, fn, initial) {
 let previousValue = (!initial) ? array[0] : initial;
 let begin = (!initial) ? 1 : 0;
   for (let i = begin; i < array.length; i++) {
     previousValue = fn(previousValue, array[i], i, array);
   }
   return previousValue;
 }

// let array = randomNumberArray();
// console.log(array.reduce((prev, el) => prev + el));
// console.log(reduce(array, (prev, el) => prev + el));

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  let array = [];
  for (let key in obj) {
    array.push(key.toUpperCase());
  }
  return array;
}
/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
 function slice(array, from = 0, to = array.length) {
   let copy = [];
   if(to > array.length){ to = array.length;}
   if(from < 0 && Math.abs(from) > array.length){from = 0};
   if(Math.abs(from) > array.length){return [];}

   if(from < 0 && to < 0){
     from = Math.abs(from) - 1;
   }else if (from < 0) {
     from = array.length + from;
   }
   if((from < 0 && to < 0) || (from > 0 && to < 0) || (to < 0)){
     to = array.length + to;
   }
   for (var i = from; i < to; i++) {
     copy.push(array[i]);
   }
   return copy;
 }
 let array = [1, 2, 3, 4, 5, 6, 7];
 console.log(array.slice(array));
 console.log(slice(array));
// function slice(array, from = 0, to = array.length) {
//   let copy = [];
//   if (to > array.length){to = array.length};
//   if(from < 0 && Math.abs(from) > array.length){from = 0};
//   if(Math.abs(from) > array.length || Math.abs(from) > array.length){
//     return [];
//   }
//   else if(from < 0 && to < 0){
//     for (var i = Math.abs(from) - 1; i < array.length + to; i++) {
//       copy.push(array[i]);
//     }
//     return copy;
//   }
//   else if(from > 0 && to < 0){
//     for (var i = from; i < array.length + to; i++) {
//       copy.push(array[i]);
//     }
//     return copy
//   }
//   else if(from < 0){
//     for (var i = array.length + from; i < to; i++) {
//       copy.push(array[i]);
//     }
//     return copy;
//   }
//     else if(to < 0) {
//       for (var i = from; i < array.length + to; i++) {
//         copy.push(array[i]);
//       }
//       return copy;
//     }
//     else {
//       for (var i = from; i < to; i++) {
//         copy.push(array[i]);
//       }
//     }
//     return copy;
// }


/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
  let proxy = new Proxy(obj, {
    set(target, prop, value) {
      target[prop] = value * value;
      return true;
    }
  });
  return proxy;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
