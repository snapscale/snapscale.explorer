/**
 * Created by Xinhe on 2019-05-25.
 */
export default {
  data() {
    return {
      timers: {}
    };
  },
  beforeDestroy() {
    Object.entries(this.timers).forEach(([key, timer]) => {
      if (timer) {
        clearTimeout(timer);
        delete this.timers[key];
      }
    });
  }
};
