# Snapscale-Explorer

![](https://img.shields.io/badge/version-1.0.0-brightgreen) ![](https://img.shields.io/badge/author-Miguel-blue)

## Stacks
- webpack
- react
- sass
- material ui
- echarts (Apache 2.0)

## Design Standard
- unit base  
  1rem = 20px  

- font-size  
  0.7rem+

## Before Everything
- Net
    Snapscale-explorer | Snapscale-explorer-middleware should under same network group or provide 8089/8090 ports for explorer.
    
## Build && Run
```bash
./build
```

## Configuration
- Nginx config  
/nginx/nginx.conf

## Docker build

```
docker build -t ss-explorer .
```

## Docker run

Environment variables "PLACEHOLDER_API_URL" and "PLACEHOLDER_WS_URL" are required to run docker image

```
docker run -e PLACEHOLDER_API_URL='example.com:8888' -e PLACEHOLDER_WS_URL='example.com:8889' -p 80:80 ss-explorer
```
