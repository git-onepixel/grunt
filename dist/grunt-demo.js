(function(window){
var a = (function(){
   return {
       /**
        * @param first
        * @param second
        * @returns {*}
        */
       add:function(first,second){
           return first+second;
       }
   }
})();
var b = (function(){
    return{
        print:function(first,second){
            var result = a.add(first,second);
            return result;
        }
    }
})();
document.write("<style>body,html{width:100%;height:100%;padding:0;margin:0;background:#305d9b;color:#fff;font-family:Arial;font-size:1.2em}@media screen and (max-width:360px){body,html{font-size:15px}}@media screen and (min-width:360px) and (max-width:460px){body,html{font-size:16px}}@media screen and (min-width:460px){body,html{font-size:18px}}</style>");
window.$ = b;
})(this);