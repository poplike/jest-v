import Vue from 'vue';
export const createVue = function(Compo, mounted = false) {
  if (Object.prototype.toString.call(Compo) === '[object String]') {
    Compo = { template: Compo };
  }
  return new Vue(Compo).$mount(mounted === false ? null : createElm());

  const createElm = function() {
    const elm = document.createElement('div');

    elm.id = 'app' + ++id;
    document.body.appendChild(elm);

    return elm;
  };
};
