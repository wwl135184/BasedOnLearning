<template>
  <div>
    <div class="p-[16px] font-bold">泛型</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
// 泛型

// 泛型之Hello World

// identity函数
// 不使用泛型
{
  function identity(arg: number): number {
    return arg;
  }
}
// 使用any类型来定义函数
{
  function identity(arg: any): any {
    return arg;
  }
}
// 使用any类型会导致这个函数就可以接收任何类型的arg参数，这样就丢失了一些信息：传入的类型与返回的类型应该是相同的。
// 如果我们传入一个数字，我们只知道任何类型的值都有可能被返回
// 因此，我们需要一种方法是返回值的类型与传入参数的类型是相同的。这里，我们使用类型变量，它是一种特殊的变量，只用于表示类型而不是值。
{
  function identity<T>(arg: T): T {
    return arg;
  }
}
// 这个版本的identity函数叫做泛型，因为它可以适用于多个类型。不同于any，它不会丢失信息，传入数值类型并返回数值类型。
// 传入所有参数，包含类型参数
{
  let output = function identity<string>(arg: string): string {
    return arg;
  };
  console.log(output("myString"));
}
// 类型推论
{
  let output = function identity(arg = "myString") {
    return arg;
  };
  console.log(output());
}

// 使用泛型变量
// 操作T类型的数组而不直接是T。由于我们操作的是数组，所以 .length属性应该是存在的
{
  function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);
    return arg;
  }
}
// 泛型函数loggingIdentity，接受类型参数T和参数arg，它的元素类型是T的数组，它返回元素类型是T的数组。
{
  function loggingIdentity<T>(arg: Array<T>): Array<T> {
    return arg;
  }
}

// 泛型类型
// 泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样
{
  function identity<T>(arg: T): T {
    return arg;
  }
  let myIdentity: <T>(arg: T) => T = identity;
}
// 还可以使用带有调用签名的对象字面量来定义泛型函数
{
  function identity<T>(arg: T): T {
    return arg;
  }
  let myIdentity: { <T>(arg: T): T } = identity;
}
// 泛型接口
{
  interface CenericIdentityFn {
    <T>(arg: T): T;
  }
  function identity<T>(arg: T): T {
    return arg;
  }
  let myIdentity: CenericIdentityFn = identity;
}
// 把泛型参数当作整个接口的一个参数
{
  interface GenericIdentity<T> {
    (arg: T): T;
  }
  function identity<T>(arg: T): T {
    return arg;
  }
  let myIdentity: GenericIdentity<number> = identity;
}
// 除了泛型接口，还可以创建泛型类。注意，无法创建泛型枚举和泛型命名空间

// 泛型类
// 泛型类使用(<>)括起泛型类型，跟在类名后面

{
  class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
  }
  let myGenericNumber = new GenericNumber<number>();
  myGenericNumber.zeroValue = 0;
  myGenericNumber.add = function (x, y) {
    return x + y;
  };
  console.log(myGenericNumber.add(1, 2)); // 3
}
// 与接口一样，直接把泛型类放在类后面，可以帮助我们确认类的所有属性都在使用相同的类型

// 泛型约束
// 使用接口和extends关键字来实现约束
{
  interface Lengthwise {
    length: number;
  }
  function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
  }
  console.log(loggingIdentity("name"));
}
// 在泛型约束中使用类型参数
{
  function getProperty(obj: T, key: K) {
    return obj[key];
  }
  let x = { a: 1, b: 2, c: 3 };
  console.log(getProperty(x, "a"));
  console.log(getProperty(x, "m"));
}
// 在泛型里使用类类型
{
  function create<T>(c: { new (): T }): T {
    return new c();
  }
}

{
  class Beekeeper {
    hasMask: boolean;
  }
  class ZooKeeper {
    nametog: string;
  }
  class Animal {
    numLegs: number;
  }
  class Bee extends Animal {
    keeper: Beekeeper;
  }
  class Lion extends Animal {
    keeper: ZooKeeper;
  }
  function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
  }
}
</script>

<style lang="scss" scoped></style>
