let ws = new WebSocket(`ws://${document.location.host}/ws`);

const reconn = () => {
  ws = new WebSocket(`ws://${document.location.host}/ws`);
};

const handles = (j) => {
  const { action, data } = j;
  if (handles[action]) {
    handles[action](data);
  }
};

handles.dashboard = (data) => {
  Object.keys(handles.dashboard.list).forEach((k) => {
    handles.dashboard.list[k](data);
  });
};

handles.dashboard.list = {};

ws.onopen = (_evt) => {
  // open
};

ws.onclose = (_evt) => {
  ws = null;
  reconn();
};

ws.onmessage = (_evt) => {
  try {
    const dt = JSON.parse(_evt.data);
    handles(dt);
  } catch (e) {
    // console.error(e);
  }
};

_x.utils.handles = handles;
