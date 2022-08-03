<template>
  <div class="p-[16px]">
    <div>
      <span>1、接口继承</span>
      <div>{{ squreSecond.color }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";

// 接口
interface LabelledValue {
  label: string;
}
const printLabel = (LabelledObj: LabelledValue) => {
  console.log(LabelledObj.label);
};
const myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

// 可选属性
// 带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。
interface SquareConfig {
  color?: string;
  width?: number;
}

// 只读属性
interface Point {
  readonly x: number;
  readonly y: number;
}
let p1 = { x: 20, y: 20 } as Point;
// TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// 判断该用readonly还是const的方法是看要把它做为变量使用还是作为一个属性。做为变量使用的话用const，若作为属性则使用readonly

// 额外的属性检查
// 绕开类型检查，最简单的方法是类型断言
interface SquareConfig {
  color?: string;
  width?: number;
}
const createSquare = (config: SquareConfig) => {
  console.log(config.width);
};
createSquare(<SquareConfig>{ colour: "red", width: 10 });

// 最佳方法是添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些作为特殊用途使用的额外属性。
interface SquareConfigSecond {
  color?: string;
  width?: number;
  [propName: string]: any;
}
const createSquareConfigSecond = (config: SquareConfigSecond) => {
  console.log(config.width);
};
createSquareConfigSecond({ colour: "red", width: 20 });

// 函数类型
// 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。它就像是一个只有参数列表和返回值类型的函数定义。参数列表里面的每个参数都需要名字和类型。
interface SearchFunc {
  (source: string, substring: string): boolean;
}
let mySearch: SearchFunc;
mySearch = (src: string, sub: string) => {
  const result = src.search(sub);
  return result > -1;
};

// 函数的参数名不需要与接口定义的名字相匹配

// 可索引的类型
// 可索引类型具有一个索引签名，他描述了对象索引的类型，还有相应的索引返回值类型。
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bold", "Fred"];

let myStr: string = myArray[0];
console.log(myStr); // Bold

// TypeScript支持两种索引签名：字符串和数字。
// 字符串索引签名能能够很好的描述dictionary模式，并且它们也确保所有属性与其返回值类型相匹配。
interface NumberDictionary {
  [index: string]: number;
  length: number;
}

// 可以将索签名设置为只读，这样就防止了给索引赋值。
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArr: ReadonlyStringArray = ["Alice", "Bob"];

// 类类型
// 实现接口
// TypeScript也能够用它来明确的强制一个类去符合某种契约。
// 在接口中描述一个方法，在类里实现它

interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}

// 静态部分与实例部分的区别
interface ClockConstructor {
  new (hour: number, minute: number): vaid;
}

class ClockSecond implements ClockConstructor {
  currentTime: Date;
  constructor(h: number, m: number) {}
}

// 当一个类实现了一个接口时，只对其实例部分进行检查。construct存在于类的静态部分，所以不在的检查范围内。
// 直接操作类的静态部分
interface ClockConstructorSecond {
  new (hour: number, minute: number): ClockInterfaceSecond;
}
interface ClockInterfaceSecond {
  tick();
}

const createClock = (
  ctor: ClockConstructorSecond,
  hour: number,
  minute: number
): ClockInterfaceSecond => {
  return new ctor(hour, minute);
};

class DigitalClock implements ClockInterfaceSecond {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}

class AnalogClock implements ClockInterfaceSecond {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 12, 17);

// 继承接口
// 和类一样，接口也可以相互继承。
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let squre = <Square>{};
squre.color = "red";
squre.sideLength = 10;

// 一个接口可以继承多个接口，创建出多个接口的合成接口。
interface PenStroke {
  penWidth: number;
}

interface SqureSecond extends Shape, PenStroke {
  sideLength: number;
}

let squreSecond = ref({}) as Ref<SqureSecond>;
squreSecond.value.color = "white";
squreSecond.value.penWidth = 10;
squreSecond.value.sideLength = 10;

// 混合类型
// 一个对象可以同时具有上面提到的多种类型。

interface Counter {
  (start: number): string;
  interval: number;
  reset(): volid;
}

const getCounter = (): Counter => {
  let counter = <Counter>function (start: number) {};
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
};

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// 接口继承类
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): vaid;
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}
</script>
<style lang="scss" scoped></style>
