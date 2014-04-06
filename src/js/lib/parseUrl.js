(function(window) {
window.URL = function(href) {
  this.href = href;
  this.link = document.createElement('a');
  this.link.href = href;

  this.parse(this);
};

window.URL.prototype = {
  parse: function parse() {
    var ret = {}, i;
    var attrs = [ 'href', 'origin', 'hostname', 'host'],
    reps = [
      [ 'search', /^\?/ ],
      [ 'hash', /^#/ ],
      [ 'pathname', /^\// ],
      [ 'protocol', /:$/ ]
    ];
    for (i in attrs)
      this[attrs[i]] = this.link[attrs[i]];
    for (i in reps)
      this[reps[i][0]] = this.link[reps[i][0]].replace(reps[i][1], '');
    this.port = this.link.port ? this.link.port : '80';

    params = {};
    var q_arr = this.search.split("&");
    for (i in q_arr) {
      if (q_arr[i]) {
        var t = q_arr[i].split("=");
        params[t[0]] = decodeURI(t[1]);
      }
    }
    this.query = params;
  },
  querySet: function querySet(query) {
    var q_str = [], i;
    for (i in query)
      this.query[i] = query[i];

    for (i in this.query) {
      q_str.push(i + '=' + this.query[i]);
    }
    this.link.search = q_str.join('&');
  },
  queryReSet: function queryReSet(query) {
    var q_str = [];
    for (var i in (this.query = query)) {
      q_str.push(i + '=' + this.query[i]);
    }
    this.link.search = q_str.join('&');
  },
  goto: function goto() {
    window.location.href = this.link.href;
  }
};

})(window);
