<template></template>

<script lang="ts" setup>
import { Ref, ref, reactive } from "vue";

// 类
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return `Hello,${this.greeting}`;
  }
}
let greeter = new Greeter("word");
console.log(greeter.greet());

// 继承
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}
class Dog extends Animal {
  bark() {
    console.log("Woof! Woof!");
  }
}
const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();

// extends
class AnimalSecond {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}
class Snake extends AnimalSecond {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}
class Horse extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}
let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);

// 使用extends关键字创建了Animal的两个子类：Horse和Snake
// 派生类包含了一个构造函数，它必须调用super(),它会执行基类的构造函数。而且，在构造函数里访问this的属性之前，我们一定要调用super()。
// Snake类和horse类都创建了move方法，它们重写了从Animal继承来的move方法，使得move方法根据不同的类而且具有不同的功能。即时tom被声明为Animal类型，但因为它的值是Hourse，调用tom.move(34),
// 调用tom.move(34)时，它会调用House里重写的方法。

// 公共，私有与受保护的修饰符
// 默认public
// 指定public
class AnimalThird {
  public name: string;
  public constructor(theName: string) {
    this.name = theName;
  }
  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

// 指定private
// 当成员被标记成private时，它就不能在声明它的类的外部访问
class AnimalFourthly {
  private name: string;
  constructor(theName: string) {}
}
</script>

<style lang="scss" scoped></style>
