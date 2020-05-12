
<a href="#chinese">点击此处直达中文版 </a>


# SnapScale Explorer

SnapScale Explorer provides an interface to monitor SnapScale status and activity.

## Disclaimer

This release refers only to version 1.0 of our open source software. We caution those who wish to use SnapScale forks to carefully vet the companies and organizations launching blockchains based on SnapScale before disclosing any private keys to their derivative software.

## Requirement

[<font color='red'>snapscale-explorer-middleware</font>](https://github.com/snapscale/snapscale.explorer.middleware/)

## Building the source

In order to build the source, customize nginx config at nginx/nginx.conf.

```sh
./build build
```

## Getting Started

```sh
docker run -e API_URL='example.com:8888' -e WS_URL='example.com:8889' -p 80:80 snapscale-explorer
```

## License

SnapScale Explorer is released under the Apache 2.0 license and is offered “AS IS” without warranty of any kind, express or implied. Any security provided by the SnapScale software depends in part on how it is used, configured, and deployed. SnapScale is built upon many third-party libraries such as WABT (Apache License) and WAVM (BSD 3-clause) which are also provided “AS IS” without warranty of any kind. 

## Important

See [LICENSE](./LICENSE) for copyright and license terms.

All repositories and other materials are provided subject to the terms of this [IMPORTANT](./IMPORTANT.md) notice and you must familiarize yourself with its terms.  The notice contains important information, limitations and restrictions relating to our software, publications, trademarks, third-party resources, and forward-looking statements.  By accessing any of our repositories and other materials, you accept and agree to the terms of the notice. <br>

<br>

---

<a id="chinese"></a><br>
# SnapScale 浏览器

SnapScale 浏览器用于查询区块链交易记录和运行状态。

## 免责声明

此版本仅引用我们开源软件的1.0版。在此，我们告诫那些希望使用基于SnapScale 构建的区块链的企业和机构在向其衍生软件披露任何私钥之前，请仔细审查基于SnapScale 进行区块链开发的公司和组织。
## 需求

[<font color='red'>snapscale-explorer-middleware</font>](https://github.com/snapscale/snapscale.explorer.middleware/)

## 构建源码

为了构建源代码，请在 nginx / nginx.conf 中自定义 nginx 配置。

```sh
./build build
```

## 快速部署

```sh
docker run -e API_URL='example.com:8888' -e WS_URL='example.com:8889' -p 80:80 snapscale-explorer
```
## 许可协议

SnapScale 遵循Apache 2.0 开源协议发布，按“原样”提供，没有任何明示或暗示的担保。SnapScale 软件提供的任何安全性部分取决于它的使用，配置和部署方式。 SnapScale 建立在许多第三方库上，如Binaryen（Apache许可证）和WAVM（BSD 3-clause），它们也是“按现状”提供的，没有任何形式的保证。


## 重要事项

有关版权和许可条款，请参考[许可协议](./LICENSE) 。

我们提供的所有信息都受限于本[重要通知](./IMPORTANT.md) 您必须熟悉其中的条款。该通知包含了关于我们的软件、发布、商标、第三方资源和前瞻性声明的重要信息、条件和限制。您获取任何材料的时候就意味着您接受并同意该通知的条款。
