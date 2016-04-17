(function(){
    var today = new Date();
    var y = document.getElementById('year');
	var m = document.getElementById('month');
	var todayBtn = document.getElementById('now');
	var yy = y.value;
	var mm = m.value;
	for(var i = 1901; i<2050; i++){
		y.options.add(new Option(i+'年',i));
	}
	/* 
	 * @param {number} year 年份
	 * @param {number} month 月份(1-12)
	 * @return {number} 该月第一天是星期几（0-6）[0是星期日]
	 */
	var getWeek = function(year, month){
          var d = new Date(year, --month, 1);
          return (d.getDay());
        };
    /* 
     * @param {number} year 年份
     * @param {number} month 月份(1-12)
     * @return {number}  获取一个月多少天(28/29/30/31)
     */
    var getDays = function getDays(year, month){
        var d = new Date(year, --month,1);
        d.setDate(32);
        return (32-d.getDate());
    };
    /* 
     * @param {number} week 该月第一天星期几(0-6)
     * @param {number} days 该月总天数(28/29/30/31)
     * @return 渲染页面
     */
    var render = function(week, days, yyy, mmm){
    	var html = '';
    	var date = document.getElementById('date');
    	// 本月1号前面有几个空格子
    	var x = (week+6)%7;
    	// 该月行数：当月天数+空格子数量，除以7，再向上取整
    	var layer = Math.ceil((days+x)/7);
    	var a = 1;
    	var b = a-x;
    	html += '<tbody id="date">';
    	for(var i = 1; i <= layer; i++){
    		html += '<tr>';
    		for(var j = 1; j<=7; j++){
    			if(yyy == today.getFullYear() && mmm == today.getMonth()+1 && b == today.getDate()){
    				html += '<td style="background-color: #ffbb00; color: #fff;">'+ b +'</td>';
    			}else {
    				html += (b > days || b < 1)?'<td></td>':'<td>'+ b +'</td>';
    			}
    			b = ++a - x;
    		}
    		html += '</tr>';
    	}
    	html += '</tbody>';
    	setTBodyInnerHTML(date,html);
    	// date.innerHTML = html; 	// 这种写法不兼容ie8及以下
    };
    //不支持innerHTML的元素有:<col>、<colgroup>、<frameset>、<head>、<html>、<style>、<table>
    //<tbody>、<thead>、<tfoot>和<tr> 此外，在IE8及更早版本中，<title> 元素也没有innerHTML属性。
    /* 
     * @param {object} tbody 容器
     * @param {string} html 拼接好的字符串
     * @return 把html放到容器里，并且渲染页面
     */
    var setTBodyInnerHTML = function (tbody, html) {
	    var div = document.createElement('div')
	    div.innerHTML = '<table>' + html + '</table>';
	    tbody.parentNode.replaceChild(div.firstChild.firstChild, tbody);
    }
	var dumpToToday = function(){
		var firstWeek = getWeek(today.getFullYear(),today.getMonth()+1);
		var totalDays = getDays(today.getFullYear(),today.getMonth()+1);
		y.options[today.getFullYear()-1901].setAttribute('selected',true);
		m.options[today.getMonth()+1].setAttribute('selected',true);
		render(firstWeek, totalDays,today.getFullYear(),today.getMonth()+1);
	}
	dumpToToday();
	y.onchange = function() {
		yy = this.value;
		var week = getWeek(yy,mm);
		var days = getDays(yy,mm);
		render(week,days,yy,mm);
	}
	m.onchange = function() {
		mm = this.value;
		var week = getWeek(yy,mm);
		var days = getDays(yy,mm);
		render(week,days,yy,mm);
	}
	todayBtn.onclick = dumpToToday;
})()
