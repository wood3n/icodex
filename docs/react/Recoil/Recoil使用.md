## 概念

### Atoms

`Atoms`表示在 Recoil 中的最小状态单元，通过`atom`函数创建以后，可以使用`useRecoilState`全局共享和修改。

### Selectors

`Selector`是一个入参为`Atom`或者其他`Selector`的纯函数，当`Atom`或者`Selector`更新以后，`Selector`也会重新计算，当它更新时，订阅它的组件将会重新渲染。

`Selector`通过`selector`函数创建，`Selector` 通常用于计算一些基于原始状态的派生数据，因为 Seletor 和 Atom 给组件提供相同的方法，所以它们可以相互替代。



