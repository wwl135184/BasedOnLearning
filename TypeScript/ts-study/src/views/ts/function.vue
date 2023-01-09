<template>
  <div>
    <div class="p-[16px] font-bold">函数</div>
  </div>
</template>

<script lang="ts" setup>
import { last } from "lodash";
import { Ref, ref, reactive } from "vue";

// TypeScript函数可以创建有名字的函数和匿名函数。

// 函数类型

{
  // Named function
  function add(x: number, y: number): number {
    return x + y;
  }

  // Anonymous function
  let myadd = function (x: number, y: number) {
    return x + y;
  };
}

// 书写完整的函数类型

{
  let myAdd: (x: number, y: number) => number = function (
    x: number,
    y: number
  ): number {
    return x + y;
  };
}
("");

// 函数类型包含两部分：参数类型和返回值类型。

{
  let myAdd: (baseValue: number, increment: number) => number = function (
    x: number,
    y: number
  ): number {
    return x + y;
  };
}

// 推断类型
{
  let myAdd: (baseValue: number, increment: number) => number = function (
    x,
    y
  ) {
    return x + y;
  };
}

// 可选参数和默认参数

// TypeScript里的每个函数参数都是必须的。这不是指不能传递null或undefined作为参数，而是说编译器检查用户是否为每个参数都穿入了值。传递给一个函数的参数个数必须与函数期望的参数个数一致。

{
  function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
  }
  // let result1 = buildName("Bob");
  // let result2 = buildName("Bod", "Adams", "Sr.");
  let result3 = buildName("Bod", "Adams");
}

// 在TypeScript里我们可以在参数名旁使用?实现可选参数的功能。

{
  function buildName(firstName: string, lastName?: string) {
    if (lastName) {
      return firstName + " " + lastName;
    } else {
      return firstName;
    }
  }

  let result1 = buildName("Bod");
  // let result2 = buildName('Bod', "Adams", "Sr.");
  let result3 = buildName("Bod", "Adams");
}

// 默认初始化值参数

{
  function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
  }

  let result1 = buildName("Bob");
  let result2 = buildName("Bod", undefined);
  console.log(result2); // Bod Smith
  // let result3 = buildName("Bod", "Adams", "Sr.");
  let result4 = buildName("Bod", "Adams");
}

// 剩余参数
// 必要参数，默认参数和可选参数有个共同点：它们表示某一个参数。有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。
// 在TypeScript里，你可以把所有参数收集到一个变量里：

{
  function buildName(firstName: string, ...resetName: string[]) {
    return firstName + " " + resetName.join(" ");
  }
  let employeeName = buildName("Joseph", "Samuel", "Lucas", "Mackinzie");
  console.log(employeeName);
}

// 这个省略号也会在带有剩余参数的函数类型定义上使用到：
{
  function buildName(firstName: string, ...resetName: string[]) {
    return firstName + " " + resetName.join(" ");
  }
  let buildNameFun: (fname: string, ...reset: string[]) => string = buildName;
}

// this和箭头函数

{
  interface Card {
    suit: string;
    card: Number;
  }
  interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
  }
  let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function (this: Deck) {
      return () => {
        let pickedCard = Math.floor(Math.random() * 52);
        let pickedSuit = Math.floor(pickedCard / 13);

        return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
      };
    },
  };

  let cardPicker = deck.createCardPicker();
  let pickedCard = cardPicker();
  console.log("card：" + pickedCard.card + " of" + pickedCard.suit);
}

// 现在TypeScript知道createCardPicker期望在某个Deck对象上调用。this是Deck类型的，而非any，因此--noTmplicitThis不会报错了

// this参数在回调函数里

{
  class Handler {
    info: string;
    onClickBad = (e: Event) => {
      this.info = e.message;
    };
  }
}

// 重载
// JavaScript本省是个动态语言。JavaScript里函数根据传入不同的参数而返回不同类型的数据是很常见的。
{
  let suits = ["hearts", "spades", "clubs", "diamonds"];

  function pickCard(x: any): any {
    if (typeof x == "object") {
      let pickedCard = Math.floor(Math.random() * x.length);
      return pickedCard;
    } else if (typeof x == "number") {
      let pickedSuit = Math.floor(x / 13);
      return { suit: suits[pickedSuit], card: x % 13 };
    }
  }

  let myDeck = [
    { suit: "diamonds", card: 2 },
    { suit: "spades", card: 10 },
    { suit: "hearts", card: 4 },
  ];
  let pickedCard1 = myDeck[pickCard(myDeck)];
  console.log(pickedCard1);

  let pickedCard2 = pickCard(15);
  console.log(pickedCard2);
}

// pickCard方法根据传入参数的不同会返回两种不同的类型。
// 方法是为同一个函数提供多个函数类型定义进行函数重载。编译器会根据这个列表去处理函数的调用。

{
  let suits = ["hearts", "spades", "clubs", "diamonds"];

  function pickCard(x: { suit: string; card: number }[]): number;
  function pickCard(x: number): { suit: string; card: number };
  function pickCard(x: any): any {
    if (typeof x == "object") {
      let pickedCard = Math.floor(Math.random() * x.length);
      return pickedCard;
    } else if (typeof x == "number") {
      let pickSuit = Math.floor(x / 13);
      return { suit: suits[pickSuit], card: x % 13 };
    }
  }

  let myDeck = [
    { suit: "diamonds", card: 2 },
    { suit: "spades", card: 10 },
    { suit: "hearts", card: 4 },
  ];

  let pickedCard1 = myDeck[pickCard(myDeck)];
  console.log(pickedCard1);

  let pickCard2 = pickCard(15);
  console.log(pickCard2);
}

// 这样改变后，重载的pickCard函数在调用的时候会进行正确的类型检测。
// 为了让编译器能够选择正确的检查类型，它与JavaScript里得处理流程相似。它查找重载列表，尝试使用第一个重载定义。如果匹配的话就使用这个。因此，在定义重载的时候，一定要把最精确的定义放在最前面。
// function pickCard(x): any并不是重载列表的一部分，因此这里只有两个重载：一个是接受对象另一个是接收数字。
</script>

<style lang="scss" scoped></style>
