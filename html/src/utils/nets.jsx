const nets = {};

nets.get = () => _x.utils.storage.get('net') || Object.keys(_x.config.nets)[0];
nets.set = v => _x.utils.storage.set('net', v);

_x.utils.nets = nets;
