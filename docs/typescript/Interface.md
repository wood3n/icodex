---
title: Interface
---

## 声明类型

`interface`的基本用法还是用来声明类型

### 定义对象

`interface`通常用于定义对象的类型，语法格式如下，属性之间定义的类型通过英文分号间隔`;`

```typescript
interface <interface name> {
	property1: <type name>;
  property2: <type name>;
  ...
}
```

从 TypeScript 官网的介绍：

> One of TypeScript’s core principles is that type checking focuses on the _shape_ that values have. This is sometimes called “duck typing” or “structural subtyping”.
>
> TypeScript 的核心之一就是根据值的形状进行类型检查，称为鸭式辩型

所以`interface`就是根据对象的“形状”去判断其类型，使用`interface`声明的对象类型，TypeScript 只会检查是否**至少存在所需的属性并与所需的类型所匹配，并且不需要保证顺序**

```typescript
interface LabeledValue {
  label: string;
}

function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

// 可以设置额外的属性，但是要保证在interface中声明的必须属性要存在
let myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);
```

#### 可选属性

如果一个属性可有可无，这在 React 的 Props 中十分常见，那么可以**在属性名称后面紧跟一个 `?`**来标识：

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}
```

#### 只读属性

如果禁止其它地方在使用对象属性的时候去修改它，可以在属性名前面添加`readonly`属性

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}
```

`readonly`只用于对象属性，如果要求变量值不发生改变，使用`const`

### 定义函数

`interface`同样可以用于单独指定函数的参数和返回值类型，在`interface`中定义的函数参数名称和实际使用的函数参数名称并不要求相同；常见的写法是先使用`interface`声明函数的参数和返回值类型，然后定义函数的时候指定其类型为`interface`声明的类型。

```typescript
interface Func {
  (name: string, age: number): string;
}

// 这里声明的函数的参数名和上面interface内指定的参数名并不需要相同
const func: Func = (name, age) => {
  return `I am ${name}, ${age} years old.`;
};

func('oxygen', 23);
```

#### 对象方法

如果一个函数定义在对象属性中，那么这个函数可以被称为这个对象的方法。也就是对象的属性如果是一个函数，那么就需要指定其为函数类型

```typescript
interface Person {
  age: number;
  getName: (name: string) => string; //定义对象内部的方法
}

const person: Person = {
  age: 20,
  getName: name => {
    return name;
  },
};

person.getName('oxygen');
```

### 定义数组

在`interface`通过方括号`[]`和`index`指定索引的类型可以声明一个数组类型；指定给`index`的类型只能是`number`或者`string`，我个人感觉这种方法比较麻烦

```typescript
interface Person {
  [index: number]: string;
}

const persons: Person = ['a', 'b', 'c', 'd'];
console.log(persons[1]);
```

### 定义 class

`interface`可以用于定义`class`中的属性，方法等类型；在定义类的时候，通过`implements`（实现）实现定义的`interface`即可

```typescript
interface IPerson {
  name: string;
  getAge: (age: number) => number;
}

class Person implements IPerson {
  name = 'oxygen';

  getAge = (age: number) => {
    return age;
  };
}

const person = new Person();
console.log(person.name);
```

## 继承

通过`extends`关键字可以将几个声明的`interface`组合起来，也可称为继承。

## 实现

通过`implements`关键字可以通过`class`实现`interface`内部定义的属性，方法等，这在 OOP 语言中表现为多态性：同一个接口下的不同表现形式。
