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

All repositories and other materials are provided subject to the terms of this [IMPORTANT](./IMPORTANT.md) notice and you must familiarize yourself with its terms.  The notice contains important information, limitations and restrictions relating to our software, publications, trademarks, third-party resources, and forward-looking statements.  By accessing any of our repositories and other materials, you accept and agree to the terms of the notice.
