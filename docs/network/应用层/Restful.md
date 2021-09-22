## 什么是REST，什么是RESTful

- REST，**RE**presentational **S**tate **T**ransfer，资源表现状态的转换
- **URL定位资源，用HTTP动词（GET,POST,DELETE,DETC）描述操作**
- REST 是一种基于超媒体构建分布式系统的架构风格
- REST架构中，数据和功能被视为资源，并使用统一资源标识符（URI）进行访问。通过使用一组简单，定义明确的操作（通常是http动词）来转换资源状态。客户端和服务器通过使用标准化接口和协议（通常是HTTP）来交换资源的表示

- REST架构约束，有六个方面
1. 客户端，服务器分离；用户界面和数据存储进行分离
2. 无状态，从客户端到服务器的每个请求都必须包含理解请求所需的所有信息；会话状态完全保留在客户端
3. 可缓存，服务端必须对请求的数据隐式或者显式的标记为可缓存或者不可缓存
4. 统一接口，这部分也就是RESTful api的设计约束，主要有以下四点
- [x] 使用URI标记资源
- [x] 使用http动词处理资源
- [x] 要有明确的状态描述
- [x] 超媒体展示应用程序状态
5. 分层系统，即允许中间代理服务器，客户端无法直接判断连接的代理服务器还是终端服务器
6. 按需使用代码，我管这个叫允许脚本拓展，即客户端可通过下载小程序或者脚本的形式拓展自身的功能

> REST本身没有标准，但是RESTful风格的实现使用了标准；如基于HTTP,URI,JSON等

## RESTful API

- REST 独立于任何基础协议，并且不一定绑定到 HTTP。 但是，最常见的 REST 实现使用 HTTP 作为应用程序协议，也就是常说的 RESTful API
- RESTful API是根据REST架构风格设计的web服务接口
- [RESTful API标准](https://docs.microsoft.com/zh-cn/azure/architecture/best-practices/api-design)
1. 客户端和服务端分离
2. REST API 围绕资源设计，资源是可由客户端访问的任何类型的对象、数据或服务
2. 每个资源有一个标识符，即，唯一标识该资源的 URI
3. 客户端通过交换资源的表示形式来与服务交互；包括html，xml，json等形式
4. REST API 使用统一接口，这有助于分离客户端和服务实现。 对于基于 HTTP 构建的 REST API，统一接口包括使用标准 HTTP 谓词对资源执行操作。 最常见的操作是 GET、POST、PUT、PATCH 和 DELETE
5. 接口操作要有明确的状态指示以及描述，对应http状态码和描述

- [更多详细介绍](https://restfulapi.net/)

## RESTful API设计指南

- [Microsoft REST API Guidelines](https://github.com/Microsoft/api-guidelines/blob/master/Guidelines.md#7-consistency-fundamentals)

- api命名使用名词
1. 使用`/`来划分层次
1. 不要使用下划线
1. 不要使用文件拓展名
1. 不要在URL中添加api版本号
1. 推荐使用连字符`-`来解释长名称
1. 可以在URL后面用`?`串接参数，如分页，排序等
- 使用标准HTTP协议动词来与接口交互
- 要有明确的HTTP状态码和描述信息
