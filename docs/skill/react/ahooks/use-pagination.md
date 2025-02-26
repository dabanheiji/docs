> <font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">usePagination</font><font style="color:rgb(69, 77, 100);"> 基于 </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">useRequest</font><font style="color:rgb(69, 77, 100);"> 实现，封装了常见的分页逻辑。与 </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">useRequest</font><font style="color:rgb(69, 77, 100);"> 不同的点有以下几点：</font>
>
> 1. <font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">service</font><font style="color:rgb(69, 77, 100);"> </font><font style="color:rgb(69, 77, 100);">的第一个参数为</font><font style="color:rgb(69, 77, 100);"> </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">{</font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);"> </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">current: number, pageSize: number</font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);"> </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">}</font>
> 2. <font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">service</font><font style="color:rgb(69, 77, 100);"> </font><font style="color:rgb(69, 77, 100);">返回的数据结构为</font><font style="color:rgb(69, 77, 100);"> </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">{</font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);"> </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">total: number, list: Item[]</font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);"> </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">}</font>
> 3. <font style="color:rgb(69, 77, 100);">会额外返回</font><font style="color:rgb(69, 77, 100);"> </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">pagination</font><font style="color:rgb(69, 77, 100);"> </font><font style="color:rgb(69, 77, 100);">字段，包含所有分页信息，及操作分页的函数。</font>
> 4. <font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">refreshDeps</font><font style="color:rgb(69, 77, 100);"> 变化，会重置 </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">current</font><font style="color:rgb(69, 77, 100);"> 到第一页，并重新发起请求，一般你可以把 </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">pagination</font><font style="color:rgb(69, 77, 100);"> 依赖的条件放这里</font>
>

官方文档：[usePagination](https://ahooks.js.org/zh-CN/hooks/use-pagination)

由于此`hook`基于`useRequest`实现，所以查看本文前请先查看[useRequest](/docs/skill/react/ahooks/use-request)的源码分析。

这一个`hook`实现方式较为简单，仅仅是在`useRequest`的基础上添加了和分页相关的`api`，我们直接看一下源码里的实现。

```typescript
const usePagination = <TData extends Data, TParams extends Params>(
  service: Service<TData, TParams>,
  options: PaginationOptions<TData, TParams> = {},
) => {
  // 默认1页10条
  const { defaultPageSize = 10, defaultCurrent = 1, ...rest } = options;

  // 调用useRequest 
  const result = useRequest(service, {
    defaultParams: [{ current: defaultCurrent, pageSize: defaultPageSize }],
    refreshDepsAction: () => {
      // 这里自定义了 refreshDepsAction，所以使用依赖刷新的时候会执行这个方法，会以1为页码发送请求
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      changeCurrent(1);
    },
    ...rest,
  });

  // 这里是要求service第一个入参必须是 { current: number, pageSize: number } 的原因，这两项配置是从第一个参数中获取的
  const { current = 1, pageSize = defaultPageSize } = result.params[0] || {};

  // 这里是service的返回结果必须是 { total: number, list: any[] } 的原因，和分页相关的一些配置需要使用total计算
  const total = result.data?.total || 0;
  const totalPage = useMemo(() => Math.ceil(total / pageSize), [pageSize, total]);

  // 页码或每页条数变化需要执行的方法
  const onChange = (c: number, p: number) => {
    // 边界问题考虑
    let toCurrent = c <= 0 ? 1 : c;
    const toPageSize = p <= 0 ? 1 : p;
    const tempTotalPage = Math.ceil(total / toPageSize);
    if (toCurrent > tempTotalPage) {
      toCurrent = Math.max(1, tempTotalPage);
    }

    // 这里使用的params是之前最后一次请求的params，所以如果是有搜索项的列表数据，则会以最后一次查询的参数去请求，而不是当前搜索表单里的参数。
    const [oldPaginationParams = {}, ...restParams] = result.params || [];

    result.run(
      {
        ...oldPaginationParams,
        current: toCurrent,
        pageSize: toPageSize,
      },
      ...restParams,
    );
  };

  // 页码变化执行的方法，本质还是onChange
  const changeCurrent = (c: number) => {
    onChange(c, pageSize);
  };

  // 每页条数变化执行的方法，本质还是onChange
  const changePageSize = (p: number) => {
    onChange(current, p);
  };

  return {
    ...result,
    pagination: {
      current,
      pageSize,
      total,
      totalPage,
      onChange: useMemoizedFn(onChange),
      changeCurrent: useMemoizedFn(changeCurrent),
      changePageSize: useMemoizedFn(changePageSize),
    },
  } as PaginationResult<TData, TParams>;
};
```

从源码中我们可以看得出还是很简单的，这个`hook`只是在`useReqeuest`的基础上去计算了一些分页需要的信息，而计算这些信息需要使用`total`、`pageSize`、`current`等数据，因此这个`hook`对我们的`service`函数的入参和出参有着非常严格的要求，因此需要使用者在使用的时候在`service`函数中对参数进行处理，这个也勉强能算是它的一个缺陷。

