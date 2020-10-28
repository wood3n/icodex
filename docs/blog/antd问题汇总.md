title: antd 问题汇总

---

## form

### initValues

表单的初始值**只有初始化以及重置时生效**，有时候会遇到`initValues`从外界传进来的情况，这时候`initValues`的`props`变化以后，表单是不会重新渲染的，使用`useEffect`可以解决这个问题：

```typescript
useEffect(() => {
  form.resetFields();
}, [props.initValues]);
```

`form.resetFields()`是重置表单到`initValues`，这样组件在更新后执行`useEffect`，判断`initValues`依赖项发生了变化，就可以更新表单了。
