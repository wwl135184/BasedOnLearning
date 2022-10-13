<template>
  <div>
    <div class="p-[16px] font-bold">类</div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref, reactive } from "vue";

// 类
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return `Hello, ${this.greeting}!`;
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

// 理解private
// 当成员被标记成private时，它就不能在声明它的类的外部访问
class AnimalFourthly {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

new AnimalFourthly("Cat").name; // 错误：'name'是私有的

// TypeScript使用的是结构类型系统。当我们比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。

// 然而，当我们比较带有private或protected成员类型的时候，情况就不同了。如果其中一个类型包含一个private成员，那么只有当另外一个类型中也存在这样一个private成员，
// 并且它们都来自同一处声明时，我们认为这两个类型是兼容的。对于protected成员也使用这个规则。

class AnimalFifth {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

class Rhino extends AnimalFifth {
  constructor() {
    super("Rhino");
  }
}

class Employee {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

let animalFifth = new AnimalFifth("Goat"),
  rhino = new Rhino(),
  employee = new Employee("Bob");

animalFifth = rhino;
animalFifth = employee; // 错误：animalFifth与employee不兼容

// 理解protected

// protected修饰符与private修饰符的行为很相似，但有一点不同，protected成员在派生类中仍然可以访问。

class Preson {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class EmployeeSecond extends Preson {
  private department: string;
  constructor(name: string, deparment: string) {
    super(name);
    this.department = deparment;
  }
  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}`;
  }
}

let howord = new EmployeeSecond("Hello", "Sales");

console.log(howord.getElevatorPitch());
console.log(howord.name);

// 注意，我们不能在Person类外使用name，但我们仍然可以通过Employee类的实例方法访问，因为Employee是由Person派生而来的。

// 构造函数也可以被标记为protected。这意味着这个类不能包含它的类外被实例化，但是能被继承。

class PresonSecond {
  protected name: string;
  protected constructor(theName: string) {
    this.name = theName;
  }
}

class EmployeeThird extends PresonSecond {
  private department: string;
  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}`;
  }
}

let howordSecond = new EmployeeThird("Howard", "Sales");
let john = new Preson("John"); // 错误：'Person'的构造函数是被保护的

// readOnly修饰符
</script>

<style lang="scss" scoped></style>
