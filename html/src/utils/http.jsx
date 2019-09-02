const request = (api, text, cb) => {
  const xmlhttp = new XMLHttpRequest();

  const change = () => {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      cb(xmlhttp.responseText);
    }
  };

  xmlhttp.open('POST', `/api/${api}/`, true);
  xmlhttp.send(text);

  xmlhttp.onreadystatechange = change;
};

_x.utils.request = request;
