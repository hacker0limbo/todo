# 个人对前端 mvc 的理解

个人想法:
- 数据请求和操作放在 `Model` 中
- 视图操作和改变放在 `View` 中
- 事件绑定放在 `Controller` 中, 还是需要根据用户的响应(事件触发等)操作的 `DOM` 来更新视图

## 视图 View

前端的视图即为 `HTML`, 但是一般需要将数据与 `HTML` 混合起来, 因此创造了**模板引擎**, 用来在模板里面插入数据. 这些数据来源于 `Model`, 但不能能对 `Model` 进行修改, 这些数据拿来就可以使用

## 数据 Model

保存事物的信息, 描述事物的行为特征(`property`)和可以对他进行的操作(`method`), 即对数据相关的操作, 比如删除一个数据, 增加一个数据, 更新一个数据.

## Controller

响应用户请求, 决定根据什么数据, 渲染更新什么视图, 常见功能如下:

- 绑定事件
- 更新数据, 调用 `Model` 的 类方法(存疑?), 更新 `Model`
- 更新`DOM`, 调用 View 里面的渲染函数, 更新 `View`, 响应用户的请求

总结 `Controller` 作用:
- `Controller` 监听 Model 变化，Model 一变，`Controller` 就会去更新 View
- `Controller` 监听用户交互，用户点了提交或修改按钮，`Controller` 就要去更新 Model

> 一个页面可以有多个 Controller，每个 Controller 负责一个大 div 即可

## Reference

- http://web.jobbole.com/84945/
- https://zhuanlan.zhihu.com/p/22943208
- https://zhuanlan.zhihu.com/p/38157081
