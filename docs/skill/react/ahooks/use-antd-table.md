> <font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">useAntdTable</font><font style="color:rgb(69, 77, 100);"> 基于 </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">useRequest</font><font style="color:rgb(69, 77, 100);"> 实现，封装了常用的 </font><a href="https://ant.design/components/form-cn/" target="__blank">Ant Design Form</a><font style="color:rgb(69, 77, 100);"> 与 </font><a href="https://ant.design/components/table-cn/" target="__blank">Ant Design Table</a><font style="color:rgb(69, 77, 100);"> 联动逻辑，并且同时支持 antd v3 和 v4。</font>
>
> <font style="color:rgb(69, 77, 100);">在使用之前，你需要了解它与</font><font style="color:rgb(69, 77, 100);"> </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">useRequest</font><font style="color:rgb(69, 77, 100);"> </font><font style="color:rgb(69, 77, 100);">不同的几个点：</font>
>
> 1. <font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">service</font><font style="color:rgb(69, 77, 100);"> </font><font style="color:rgb(69, 77, 100);">接收两个参数，第一个参数为分页数据</font><font style="color:rgb(69, 77, 100);"> </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">{</font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);"> </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">current, pageSize, sorter, filters</font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);"> </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">}</font><font style="color:rgb(69, 77, 100);">，第二个参数为表单数据。</font>
> 2. <font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">service</font><font style="color:rgb(69, 77, 100);"> </font><font style="color:rgb(69, 77, 100);">返回的数据结构为</font><font style="color:rgb(69, 77, 100);"> </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">{</font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);"> </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">total: number, list: Item[]</font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);"> </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">}</font><font style="color:rgb(69, 77, 100);">。</font>
> 3. <font style="color:rgb(69, 77, 100);">会额外返回</font><font style="color:rgb(69, 77, 100);"> </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">tableProps</font><font style="color:rgb(69, 77, 100);"> </font><font style="color:rgb(69, 77, 100);">和</font><font style="color:rgb(69, 77, 100);"> </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">search</font><font style="color:rgb(69, 77, 100);"> </font><font style="color:rgb(69, 77, 100);">字段，管理表格和表单。</font>
> 4. <font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">refreshDeps</font><font style="color:rgb(69, 77, 100);"> 变化，会重置 </font><font style="color:rgb(213, 97, 97);background-color:rgb(246, 247, 249);">current</font><font style="color:rgb(69, 77, 100);"> 到第一页，并重新发起请求。</font>
>

官方文档：[useAntdTable](https://ahooks.js.org/zh-CN/hooks/use-antd-table)

从官网的描述我们可以看出这个`hook`和`usePagination`的使用方法很像，其实在源码中`useAntdTable`就是基于`usePagination`实现的，关于`usePagination`的源码分析可以看这里[usePagination](https://www.yuque.com/changpengyuan/bfx5pg/odetlr)。

从`usePagination`的源码中我们知道了其只是在`useRequest`的基础上额外实现了分页的功能，而`useAntdTable`则是在这些基础之上又实现了于`antd`的表单联动的功能。

`useAntdTable`除了会返回`usePagination`中的`api`之外，还会返回`tableProps`与`search`两个属性，其中`tableProps`是我们赋予`ant-design`中的`Table`组件的配置，而`search`中是查询表单相关的一些操作。

## 源码实现
### 兼容v3与v4
首先就是调用`usePagination`获取分页相关的操作方法，以及声明需要使用的状态（看注释）。

```tsx
const result = usePagination<TData, TParams>(service, {
  manual: true,
  ...rest,
});

const { params = [], run } = result;

// 最后一次请求中表单的数据
const cacheFormTableData = params[2] || ({} as any);

// 此状态用于判断当前显示的是否是高级搜索
const [type, setType] = useState(cacheFormTableData?.type || defaultType);

// 提交表单的表单数据
const allFormDataRef = useRef<Record<string, any>>({});
// 默认的dataSource
const defaultDataSourceRef = useRef([]);
// 是否是antd v4版本
const isAntdV4 = !!form?.getInternalHooks;

...
```

因`ant-design`的3版本与4版本部分`api`使用方式有所不同，所以这里重写了几个方法来同时兼容`v3`与`v4`

```tsx
// 获取表单的字段数据，兼容v3和v4
const getActivetFieldValues = () => {
  if (!form) {
    return {};
  }

  // antd 4
  if (isAntdV4) {
    return form.getFieldsValue(null, () => true);
  }

  // antd 3
  const allFieldsValue = form.getFieldsValue();
  const activeFieldsValue = {};
  Object.keys(allFieldsValue).forEach((key: string) => {
    if (form.getFieldInstance ? form.getFieldInstance(key) : true) {
      activeFieldsValue[key] = allFieldsValue[key];
    }
  });

  return activeFieldsValue;
};

// 校验表单，兼容v3和v4
const validateFields = (): Promise<Record<string, any>> => {
  if (!form) {
    return Promise.resolve({});
  }
  const activeFieldsValue = getActivetFieldValues();
  const fields = Object.keys(activeFieldsValue);

  // antd 4
  if (isAntdV4) {
    return (form.validateFields as Antd4ValidateFields)(fields);
  }
  // antd 3
  return new Promise((resolve, reject) => {
    form.validateFields(fields, (errors, values) => {
      if (errors) {
        reject(errors);
      } else {
        resolve(values);
      }
    });
  });
};

// 恢复表单的数据，兼容v3和v4
const restoreForm = () => {
  if (!form) {
    return;
  }

  // antd v4
  if (isAntdV4) {
    return form.setFieldsValue(allFormDataRef.current);
  }

  // antd v3
  const activeFieldsValue = {};
  Object.keys(allFormDataRef.current).forEach((key) => {
    if (form.getFieldInstance ? form.getFieldInstance(key) : true) {
      activeFieldsValue[key] = allFormDataRef.current[key];
    }
  });
  form.setFieldsValue(activeFieldsValue);
};
```

### 高级搜索场景
```tsx
...

// 储存表单状态，用于高级搜索场景
  const changeType = () => {
  // 获取表单信息，储存，并修改type
  const activeFieldsValue = getActivetFieldValues();
  allFormDataRef.current = {
    ...allFormDataRef.current,
    ...activeFieldsValue,
  };
  setType((t) => (t === 'simple' ? 'advance' : 'simple'));
};

...

useUpdateEffect(() => {
  if (!ready) {
    return;
  }
  // type发生修改时将储存的表单值赋值给表单
  restoreForm();
}, [type]);
```

### 提交、重置表单
```tsx
// 提交表单逻辑
const _submit = (initPagination?: TParams[0]) => {
  if (!ready) {
    return;
  }
  setTimeout(() => {
    validateFields()
      .then((values = {}) => {
        // 如果没有传入分页信息，则默认10页，重新查询页码固定为第一页
        const pagination = initPagination || {
          pageSize: options.defaultPageSize || 10,
          ...(params?.[0] || {}),
          current: 1,
        };
        if (!form) {
          // @ts-ignore
          // 没有绑定表单，只传分页信息
          run(pagination);
          return;
        }

        // record all form data
        // 储存表单信息
        allFormDataRef.current = {
          ...allFormDataRef.current,
          ...values,
        };

        // @ts-ignore
        run(pagination, values, {
          allFormData: allFormDataRef.current,
          type,
        });
      })
      .catch((err) => err);
  });
};

// 重置表单并发送请求
const reset = () => {
  if (form) {
    form.resetFields();
  }
  _submit();
};

// 提交方法
const submit = (e?: any) => {
  e?.preventDefault?.();
  _submit();
};
```

### 表格翻页方法
```tsx
// antd Table的onChange方法
const onTableChange = (pagination: any, filters: any, sorter: any) => {
  const [oldPaginationParams, ...restParams] = params || [];
  run(
    // @ts-ignore
    {
      ...oldPaginationParams,
      current: pagination.current,
      pageSize: pagination.pageSize,
      filters,
      sorter,
    },
    ...restParams,
  );
};
```

### 初始化
```tsx
// init
useEffect(() => {
  // if has cache, use cached params. ignore manual and ready.
  if (params.length > 0) {
    // 如果存在缓存数据，将缓存数据赋值给表单然后请求
    allFormDataRef.current = cacheFormTableData?.allFormData || {};
    restoreForm();
    // @ts-ignore
    run(...params);
    return;
  }
  if (!manual && ready) {
    // 如果设置了默认参数，将默认的参数赋值到表单上
    allFormDataRef.current = defaultParams?.[1] || {};
    restoreForm();
    _submit(defaultParams?.[0]);
  }
}, []);
```

### ready变化自动提交表单
```tsx
// refresh & ready change on the same time
const hasAutoRun = useRef(false);
hasAutoRun.current = false;

// ready变为true的时候重新发送请求
useUpdateEffect(() => {
  if (!manual && ready) {
    hasAutoRun.current = true;
    if (form) {
      form.resetFields();
    }
    allFormDataRef.current = defaultParams?.[1] || {};
    restoreForm();
    _submit(defaultParams?.[0]);
  }
}, [ready]);
```

### 依赖发生变化发送请求
```tsx
// 依赖项发生变化后自动请求
useUpdateEffect(() => {
  if (hasAutoRun.current) {
    return;
  }
  if (!ready) {
    return;
  }
  if (!manual) {
    hasAutoRun.current = true;
    result.pagination.changeCurrent(1);
  }
}, [...refreshDeps]);
```

最终返回`api`

```tsx
return {
  ...result,
  tableProps: {
    dataSource: result.data?.list || defaultDataSourceRef.current,
    loading: result.loading,
    onChange: useMemoizedFn(onTableChange),
    pagination: {
      current: result.pagination.current,
      pageSize: result.pagination.pageSize,
      total: result.pagination.total,
    },
  },
  search: {
    submit: useMemoizedFn(submit),
    type,
    changeType: useMemoizedFn(changeType),
    reset: useMemoizedFn(reset),
  },
} as AntdTableResult<TData, TParams>;
```

