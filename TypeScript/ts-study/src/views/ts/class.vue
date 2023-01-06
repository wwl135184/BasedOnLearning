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

// readonly修饰符
// 使用readonly关键字将属性设置为只读的。只读属性必须在声明时或构造函数里被初始化。
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor(theName: string) {
    this.name = theName;
  }
}
let dad = new Octopus("Main with the 8 strong legs");
dad.name = "Main width the 3-piece suit"; // 错误！name是只读的

class OctopusSecond {
  readonly numberOfLegs: number = 8;
  constructor(readonly name: string) {}
}

// 存储器
// TypeScript支持通过getters/setters来截取对对象成员的访问。

class EmployeeFourthly {
  fullName: string;
}

const employeeFourthly = new EmployeeFourthly();
employeeFourthly.fullName = "Bob Smith";
if (employeeFourthly.fullName) {
  console.log(employee.fullName);
}

let passcode = "secret passcode";

class EmployeeFifth {
  private _fullName: string;
  get fullName(): string {
    return this._fullName;
  }
  set fullName(newName: string) {
    if (passcode && passcode === "secret passcode") {
      this._fullName = newName;
    } else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}

let newEmployeeFifth = new EmployeeFifth();
newEmployeeFifth.fullName = "Bob Smith";
if (newEmployeeFifth.fullName) {
  console.log(newEmployeeFifth.fullName);
}

// 静态属性
// 使用static定义origin，因为它是所有网格都会用到的属性。每个实例都要访问这个属性的时候，都要在origin前面加上类名。如同在实例属性上使用this.前缀来访问属性一样，这是我们使用Grid.来访问静态属性

class Grid {
  static origin = { x: 0, y: 0 };
  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    let xDist = point.x - Grid.origin.x;
    let yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor(public scale: number) {}
}

let grid1 = new Grid(1.0);
let grid2 = new Grid(5.0);

console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));

// 抽象类
// 抽象类做为其他派生类的基类使用。它们一版不会直接被实例化。不同于接口，抽象类可以包含成员的实现细节。abstract关键字是用于定义抽象类和抽象类内部定义抽象方法。

abstract class AnimalSixth {
  abstract maskSound: void;
  move(): void {
    console.log("roaming the earch...");
  }
}
// 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。抽象方法的语法与接口方法相似。两者都是定义方法签名但不包含方法体。然而，抽象方法必须包含abstract关键字并且可以包含访问修饰符。

{
  abstract class Department {
    constructor(public name: string) {}

    printName(): void {
      console.log("Department name：" + this.name);
    }

    abstract printMeeting(): void;
  }

  class AccountingDepartment extends Department {
    constructor() {
      super("Accounting and Auditing");
    }

    printMeeting(): void {
      console.log("The Accounting Department meets each Monday at 10am.");
    }
    generateReports(): void {
      console.log("Generating accounting reports...");
    }
  }

  let department: Department; // 允许创建一个对象抽象类型的引用
  // department = new Department(); // 错误：不能创建一个抽象类型的实例
  department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
  department.printName();
  department.printMeeting();
  // department.generateReports(); // 错误，方法在声明的抽象类中不存在

  // 高级技巧
  // 构造函数
  // 在TypeScript里声明一个类的时候，实际上声明了很多东西。首先就是类的实例的类型。

  {
    class Greeter {
      greeting: string;
      constructor(message: string) {
        this.greeting = message;
      }
      greet() {
        return "Hello," + this.greeting;
      }
    }

    let greeter: Greeter;
    greeter = new Greeter("world");
    console.log(greeter.greet());
  }
}
// let greeter: Greeter，意思是Greeter类的实例的类型是Greeter

{
  class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    constructor(greeting: string) {
      this.greeting = greeting;
    }
    greet() {
      if (this.greeting) {
        return "Hello," + this.greeting;
      } else {
        return Greeter.standardGreeting;
      }
    }
  }
  let greeter1: Greeter;
  greeter1 = new Greeter();
  console.log(greeter1.greet());

  let greeterMaker: typeof Greeter = Greeter;
  greeterMaker.standardGreeting = "Hey, there!";

  let greeter2: Greeter = new greeterMaker();
  console.log(greeter2.greet());
}

// greeter1与之前看到的一样。我们实例化Greeter类，并使用这个对象。
// 在之后，我们直接使用类。我们创建一个叫做greeterMaker的变量。这个变量保存了这个类或者说保存了类构造函数。然后我们使用typeof Greeter，意思是取Greeter类的类型，而不是实例的类型。
// 或者确切的说，“告诉我Greeter标识符的类型”，也就是构造函数的类型。这个类型包含了类的所有静态成员和构造函数。之后，就和前面一样，我们在greeterMaker上使用new，创建Greeter的实例。

// 把类当做接口使用
// 类定义会创建两个东西：类的实例类型一个构造函数。因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。

{
  class Point {
    x: number;
    y: number;
  }

  interface Point3d extends Point {
    z: number;
  }

  let point3d: Point3d = { x: 1, y: 1, z: 1 };
}
</script>

<style lang="scss" scoped></style>
