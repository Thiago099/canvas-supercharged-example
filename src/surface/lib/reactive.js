export { Reactive }



function Reactive(update, value){
    const validator = {
        get(target, key) {
            if (typeof target[key] === 'object' && target[key] !== null) 
            {
                return new Proxy(target[key], validator)
            }
            return target[key]
        },
        set (target, key, _value) {
            if(target[key] != _value)
            {
                target[key] = _value;
                update()
            }
          return true
        }
      }
      return new Proxy(value, validator);
}