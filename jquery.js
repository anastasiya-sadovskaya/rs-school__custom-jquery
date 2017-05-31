(function(window){
    var Selector = function(arr){
        var self = this;
        this.elements = arr;

        this.addClass = function(val){
            if(typeof val ==='string'){
                this.elements.map(function(el){el.className += (' ' + val)});
            } else{
                this.elements.map(function(el, i){el.className = val(i, el.className)});
            }
       }

         this.append = function(val){
             if(typeof val === 'string'){
                this.elements.map(function(el){el.innerHTML += val});
             } else {
                this.elements.map(function(el){el.innerHTML += val.outerHTML});
             }
        }

         this.html = function(val){
            if(!val){
                return this.elements[0].innerHTML;
            } else {
                this.elements.map(function(el){el.innerHTML = val});
            }
        }
        
         this.attr = function(attr, val){
            if(!val){
                return this.elements[0].attributes[attr].value;
            } else {
                this.elements.map(function(el){el.setAttribute(attr, val)});
            }
        }

         this.children = function(val){
            if(!val){
                return this.elements[0].children;
            } else{
                var childArr = this.elements[0].children;
                var res = [];
                for( var i = 0; i < childArr.length; i++){
                    if(childArr[i].classList.contains(val.substring(1))){
                        res.push(childArr[i]);
                    };
                };
                return res;
            };
        };

         this.css = function(val){
            if(typeof val === 'string'){
                return this.elements[0].style[val];
            } else {
               this.elements.map(function(el){for(key in val){ el.style[key] = val[key]}});
            }
        }

         this.data = function(key, val){
            if(!key && !val){
                return this.elements[0].dataset;
            } else if(!val){
                if(typeof key === 'string'){
                    return this.elements[0].dataset[key];
                } else if(typeof key === 'object'){
                    this.elements.map(function(el){Object.assign(el.dataset, key)});
                }
            } else {
                this.elements.map(function(el){el.dataset[key] = val});
            }
        }

         this.on = function(event, sel, callback){
            if(!callback){
                callback = sel;
                this.elements.map(function(el){el.addEventListener(event, callback)});
                return this;
            } else{
                function handler(ev){
                    if(ev.target.className === self.elements[0].querySelector(sel).className){
                        callback.call(this, ev);
                    }
                }
                this.elements.map(function(el){el.addEventListener(event, handler)});
            }
            return this;
        }

         this.one = function(event, callback){
            function handler(ev){
                callback(ev);
                ev.target.removeEventListener(ev.type, handler);
            }

            this.elements.map(function(el){el.addEventListener(event, handler)});
        }

         this.each = function(callback){

            for(var i = 0; i < this.elements.length; i++){
                var res = callback.call(this.elements[i], i, this.elements[i] );
                 if(res === false){
                     return this;
                 }
             }
            return this;
        }
    };

    window.$ = function(selector){
        return new Selector(Array.prototype.slice.call(document.querySelectorAll(selector)));
    }
})(window);