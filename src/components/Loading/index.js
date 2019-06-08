import Vue from "vue";
import { addClass, getStyle, removeClass } from "./dom";
import Loading from "./index.vue";

const LoadingConstructor = Vue.extend(Loading);

const togglePosition = (el, binding) => {
  if (binding.value) {
    const originalPosition = getStyle(el, "position");
    if (originalPosition !== "absolute" && originalPosition !== "fixed") {
      addClass(el, "loading-parent--relative");
    }
  } else {
    setTimeout(() => {
      if (el && el.instance && el.instance.visible) return;
      removeClass(el, "loading-parent--relative");
    }, 400);
  }
};

const loadingDirective = {
  bind(el, binding) {
    const instance = new LoadingConstructor({});
    instance.$mount();
    el.instance = instance;
    el.mask = instance.$el;
    el.appendChild(el.mask);
    binding.value && (el.instance.visible = binding.value);
    togglePosition(el, binding);
  },
  update(el, binding) {
    if (binding.oldValue !== binding.value) {
      el.instance.visible = binding.value;
      togglePosition(el, binding);
    }
  },
  unbind(el) {
    if (el.domInserted) {
      el.mask && el.mask.parentNode && el.mask.parentNode.removeChild(el.mask);
      togglePosition(el, { value: false });
    }
  }
};

export default loadingDirective;
