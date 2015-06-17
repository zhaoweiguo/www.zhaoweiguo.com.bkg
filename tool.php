<html>
<head>
</head>

<body>

<input id="datetime1" />
<input type="button" value="时间转秒"  onclick="javascript:dt2second();"/>
<input id="second1" />

<br /><br /><br /><br />

<input id="second2" />
<input type="button" value="秒转时间" onclick="javascript:second2dt();" />
<input id="datetime2" />


</body>


<script>
 function dt2second() {
   var dt1 = document.getElementById('datetime1').value;
   var objSec1 = document.getElementById('second1');
   var sec1 = getLocalTime(dt1);
   objSec1.value = sec1;
 }

 function second2dt() {
   var second2 = document.getElementById("second2").value;
   var objDt2 = document.getElementById("dt2");

   var dtstr = "26-02-2012";
   var dt2 = new Date(dtstr.split("-").reverse().join("-")).getTime();

   //   var dt2 = new Date(second2).getTime();
   console.log(dt2);
 }




 function getLocalTime(nS) {     
   //   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:d{1,2}$/,' ');     
   //   return new Date(parseInt(nS) * 1000).toLocaleString();
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
 } 




</script>

</html>

