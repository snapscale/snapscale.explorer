/**
 * Created by Xinhe on 2019-05-25.
 */
export const BLOCK_UPDATE_TIME = 900;
export const TPS_UPDATE_TIME = 1000;

function getSleepTime(reqStartTime, updateTime) {
  let time = new Date().getTime();
  let timeForRequest = time - reqStartTime;
  let sleep = 3000;

  if (updateTime - timeForRequest > 0) {
    sleep = updateTime - timeForRequest;
  } else {
    sleep = 0;
  }
  return sleep;
}

export function interval(data, updateTime) {
  return function decorator(t, n, descriptor) {
    const fn = descriptor.value;
    descriptor.value = async function(...args) {
      const key = `${data}_timer`;
      this.timers[key] = 0;
      const timeout = async () => {
        let reqStartTime = new Date().getTime();
        try {
          this[data] = await fn.apply(this, args);
        } catch (e) {
          console.log("\nCaught exception: " + e);
        } finally {
          if (this.timers.hasOwnProperty(key)) {
            this.timers[`${data}_timer`] = setTimeout(
              timeout,
              getSleepTime(reqStartTime, updateTime)
            );
          }
        }
      };
      timeout();
    };
    return descriptor;
  };
}

export function loading(loading_var) {
  return function decorator(t, n, descriptor) {
    const fn = descriptor.value;
    descriptor.value = async function(...args) {
      this[loading_var] = true;
      try {
        return await fn.apply(this, args);
      } finally {
        this[loading_var] = false;
      }
    };
    return descriptor;
  };
}
