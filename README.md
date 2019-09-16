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
docker build -t snapscale-explorer .
```

## Docker run

Environment variables "API_URL" and "WS_URL" are required to run docker image

```
docker run -e API_URL='example.com:8888' -e WS_URL='example.com:8889' -p 80:80 snapscale-explorer
```
