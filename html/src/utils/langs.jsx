const langs = {};

langs.get = () => _x.utils.storage.get('lang') || Object.keys(_x.config.langs)[0];
langs.set = (v) => {
  _x.utils.storage.set('lang', v);
  window.location.reload();
};

_x.utils.langs = langs;
