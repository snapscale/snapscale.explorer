const storage = {};
storage.set = (k, v) => {
  localStorage.setItem(k, v);
};

storage.get = k => localStorage.getItem(k);

storage.clean = () => localStorage.clear();

_x.utils.storage = storage;
