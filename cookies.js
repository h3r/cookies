let cookies = {
    set: function (cName, cValue, expDays) {

        let value = cValue;
        try{
            switch(cValue.constructor){
                case String: value = cValue; break;
                case Object: value = JSON.stringify(cValue);
            }
        }catch(e){}

        let date = new Date();
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        document.cookie = `${cName}=${cValue}; expires=${date.toUTCString()}; path=/`;
    },

    get: function (cName) {
        const name = cName + "=";
        const cDecoded = decodeURIComponent(document.cookie); //to be careful
        const cArr = cDecoded.split('; ');
        let res;
        cArr.forEach(val => {
            if (val.indexOf(name) === 0) res = val.substring(name.length);
        })
        return res;
    },

    remove: function(cName){
        cookies.set(cName, 0, 0);
    }
}
export default cookies;
Object.assign(window, {cookies});