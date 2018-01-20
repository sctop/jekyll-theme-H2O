var $_GET = (function(){
    var url = window.document.location.href.toString();
    var u = url.split("?");
    if(typeof(u[1]) == "string"){
        u = u[1].split("&");
        var get = {};
        for(var i in u){
            var j = u[i].split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
})();
function getcount() {
	$.ajax({
		type : "GET",
		url : "ajax.php?act=getcount",
		dataType : 'json',
		async: true,
		success : function(data) {
			if(data.background.code==1){
				$("body").css("background", "#000000 url('"+data.background.url+"') no-repeat 100% 100% fixed");
			}
			$('#count_yxts').html(data.yxts);
			$('#count_orders').html(data.orders);
			$('#count_orders1').html(data.orders1);
			$('#count_orders2').html(data.orders2);
			$('#count_orders_all').html(data.orders);
			$('#count_orders_today').html(data.orders2);
			$('#count_money').html(data.money);
			$('#count_money1').html(data.money1);
		}
	});
}
function getPoint() {
	if($('#tid option:selected').val()=="0"){
		$('#inputsname').html("");
		$('#inputsname').hide();
		$('#alert_frame').hide();
		return false;
	}
	var price = $('#tid option:selected').attr('price');
	$('#need').val('￥'+price);
	var multi = $('#tid option:selected').attr('multi');
	if(multi == 1){
		$('#display_num').show();
	}else{
		$('#display_num').hide();
	}
	var alert = $('#tid option:selected').attr('alert');
	if(alert!=''){
		$('#alert_frame').show();
		$('#alert_frame').html(unescape(alert));
	}else{
		$('#alert_frame').hide();
	}
	var inputname = $('#tid option:selected').attr('inputname');
	if(inputname!=''){
		$('#inputname').html(inputname);
	}else{
		$('#inputname').html("下单ＱＱ");
	}
	var inputsname = $('#tid option:selected').attr('inputsname');
	if(inputsname!=''){
		$('#inputsname').html("");
		$.each(inputsname.split('|'), function(i, value) {
			if(value=='说说ID'||value=='说说ＩＤ')
				var addstr='<div class="input-group-addon onclick" onclick="get_shuoshuo(\'inputvalue'+(i+2)+'\',$(\'#inputvalue\').val())">自动获取</div>';
			else if(value=='作品ID'||value=='作品ＩＤ')
				var addstr='<div class="input-group-addon onclick" onclick="get_kuaishou(\'inputvalue'+(i+2)+'\',$(\'#inputvalue\').val())">自动获取</div>';
			else
				var addstr='';
			$('#inputsname').append('<div class="form-group"><div class="input-group"><div class="input-group-addon" id="inputname'+(i+2)+'">'+value+'</div><input type="text" name="inputvalue'+(i+2)+'" id="inputvalue'+(i+2)+'" value="" class="form-control" required/>'+addstr+'</div></div>');
		});
		$('#inputsname').show();
	}else{
		$('#inputsname').html("");
		$('#inputsname').hide();
	}
	if($("#inputname").html() == '快手ID'||$("#inputname").html() == '快手ＩＤ'){
		$('#inputvalue').attr("placeholder", "在此输入快手作品链接 可自动获取");
	}else if($("#inputname").html() == '歌曲ID'||$("#inputname").html() == '歌曲ＩＤ'){
		$('#inputvalue').attr("placeholder", "在此输入歌曲的分享链接 可自动获取");
	}else if($("#inputname").html() == '火山ID'||$("#inputname").html() == '火山ＩＤ'){
		$('#inputvalue').attr("placeholder", "在此输入火山视频的链接 可自动获取");
	}else if($("#inputname").html() == '抖音ID'||$("#inputname").html() == '抖音ＩＤ'){
		$('#inputvalue').attr("placeholder", "在此输入抖音的分享链接 可自动获取");
	}else{
		$('#inputvalue').removeAttr("placeholder");
	}
	if($('#tid option:selected').attr('isfaka')==1){
		$('#inputname').html("你的邮箱");
		$('#inputvalue').attr("placeholder", "用于接收卡密以及查询订单使用");
		$('#display_left').show();
		$.ajax({
			type : "POST",
			url : "ajax.php?act=getleftcount",
			data : {tid:$('#tid option:selected').val()},
			dataType : 'json',
			success : function(data) {
				$('#leftcount').val(data.count)
			}
		});
		if($.cookie('email'))$('#inputvalue').val($.cookie('email'));
	}else{
		$('#display_left').hide();
	}
}
function get_shuoshuo(id,uin,km,page){
	km = km || 0;
	page = page || 1;
	if(uin==''){
		layer.alert('请先填写QQ号！');return false;
	}
	var ii = layer.load(2, {shade:[0.1,'#fff']});
	$.ajax({
		type : "GET",
		url : "ajax.php?act=getshuoshuo&uin="+uin+"&page="+page,
		dataType : 'json',
		success : function(data) {
			layer.close(ii);
			if(data.code == 0){
				var addstr='';
				$.each(data.data, function(i, item){
					addstr+='<option value="'+item.tid+'">'+item.content+'</option>';
				});
				var nextpage = page+1;
				var lastpage = page>1?page-1:1;
				if($('#show_shuoshuo').length > 0){
					$('#show_shuoshuo').html('<div class="input-group"><div class="input-group-addon onclick" onclick="get_shuoshuo(\''+id+'\',$(\'#inputvalue\').val(),'+km+','+lastpage+')"><i class="fa fa-chevron-left"></i></div><select id="shuoid" class="form-control" onchange="set_shuoshuo(\''+id+'\');">'+addstr+'</select><div class="input-group-addon onclick" onclick="get_shuoshuo(\''+id+'\',$(\'#inputvalue\').val(),'+km+','+nextpage+')"><i class="fa fa-chevron-right"></i></div></div>');
				}else{
					if(km==1){
						$('#km_inputsname').append('<div class="form-group" id="show_shuoshuo"><div class="input-group"><div class="input-group-addon onclick" onclick="get_shuoshuo(\''+id+'\',$(\'#inputvalue\').val(),'+km+','+lastpage+')"><i class="fa fa-chevron-left"></i></div><select id="shuoid" class="form-control" onchange="set_shuoshuo(\''+id+'\');">'+addstr+'</select><div class="input-group-addon onclick" onclick="get_shuoshuo(\''+id+'\',$(\'#inputvalue\').val(),'+km+','+nextpage+')"><i class="fa fa-chevron-right"></i></div></div></div>');
					}else{
						$('#inputsname').append('<div class="form-group" id="show_shuoshuo"><div class="input-group"><div class="input-group-addon onclick" onclick="get_shuoshuo(\''+id+'\',$(\'#inputvalue\').val(),'+km+','+lastpage+')"><i class="fa fa-chevron-left"></i></div><select id="shuoid" class="form-control" onchange="set_shuoshuo(\''+id+'\');">'+addstr+'</select><div class="input-group-addon onclick" onclick="get_shuoshuo(\''+id+'\',$(\'#inputvalue\').val(),'+km+','+nextpage+')"><i class="fa fa-chevron-right"></i></div></div></div>');
					}
				}
				set_shuoshuo(id);
			}else{
				layer.alert(data.msg);
			}
		} 
	});
}
function set_shuoshuo(id){
	var shuoid = $('#shuoid').val();
	$('#'+id).val(shuoid);
}
function fillOrder(id){
	if(!confirm('是否确定补交订单？'))return;
	$.ajax({
		type : "POST",
		url : "ajax.php?act=fill",
		data : {orderid:id},
		dataType : 'json',
		success : function(data) {
			layer.alert(data.msg);
			$("#submit_query").click();
		}
	});
}
function getsongid(){
	var songurl=$("#inputvalue").val();
	if(songurl==''){layer.alert('请确保每项不能为空！');return false;}
	if(songurl.indexOf('.qq.com')<0){layer.alert('请输入正确的歌曲的分享链接！');return false;}
	try{
		var songid = songurl.split('s=')[1].split('&')[0];
	}catch(e){
		layer.alert('请输入正确的歌曲的分享链接！');return false;
	}
	$('#inputvalue').val(songid);
}
function getkuaishouid(){
	var kuauishouurl=$("#inputvalue").val();
	if(kuauishouurl==''){layer.alert('请确保每项不能为空！');return false;}
	if(kuauishouurl.indexOf('gifshow.com')<0 && kuauishouurl.indexOf('kuaishou.com')<0){layer.alert('请输入正确的快手作品链接！');return false;}
	try{
		if(kuauishouurl.indexOf('userId=')>0){
			var anotherid = kuauishouurl.split('userId=')[1].split('&')[0];
		}else{
			var anotherid = kuauishouurl.split('photo/')[1].split('/')[0];
		}
		if(kuauishouurl.indexOf('photoId=')>0){
			var videoid = kuauishouurl.split('photoId=')[1].split('&')[0];
		}else{
			var videoid = kuauishouurl.split('photo/')[1].split('/')[1].split('?')[0];
		}
	}catch(e){
		layer.alert('请输入正确的快手作品链接！');return false;
	}
	$('#inputvalue').val(anotherid);
	if($('#inputvalue2').val()=='')$('#inputvalue2').val(videoid);
}
function get_kuaishou(id,ksid){
	if(ksid==''){
		layer.alert('请先填写快手作品链接！');return false;
	}
	var zpid = $('#'+id).val();
	if(ksid.indexOf('http')>=0){
		var kuauishouurl = ksid;
	}else if(zpid.indexOf('http')>=0){
		var kuauishouurl = zpid;
	}else if(zpid==''){
		layer.alert('请先填写快手作品链接！');return false;
	}else{
		return true;
	}
	if(kuauishouurl.indexOf('gifshow.com')<0 && kuauishouurl.indexOf('kuaishou.com')<0){layer.alert('请输入正确的快手作品链接！');return false;}
	try{
		if(kuauishouurl.indexOf('userId=')>0){
			var anotherid = kuauishouurl.split('userId=')[1].split('&')[0];
		}else{
			var anotherid = kuauishouurl.split('photo/')[1].split('/')[0];
		}
		if(kuauishouurl.indexOf('photoId=')>0){
			var videoid = kuauishouurl.split('photoId=')[1].split('&')[0];
		}else{
			var videoid = kuauishouurl.split('photo/')[1].split('/')[1].split('?')[0];
		}
	}catch(e){
		layer.alert('请输入正确的快手作品链接！');return false;
	}
	$('#inputvalue').val(anotherid);
	$('#inputvalue2').val(videoid);
}
function gethuoshanid(){
	var songurl=$("#inputvalue").val();
	if(songurl==''){layer.alert('请确保每项不能为空！');return false;}
	if(songurl.indexOf('.huoshan.com')<0){layer.alert('请输入正确的链接！');return false;}
	try{
		var songid = songurl.split('user/')[1].split('/')[0];
	}catch(e){
		layer.alert('请输入正确的链接！');return false;
	}
	$('#inputvalue').val(songid);
}
function getdouyinid(){
	var songurl=$("#inputvalue").val();
	if(songurl==''){layer.alert('请确保每项不能为空！');return false;}
	if(songurl.indexOf('.douyin.com')<0){layer.alert('请输入正确的链接！');return false;}
	try{
		var songid = songurl.split('video/')[1].split('/')[0];
	}catch(e){
		layer.alert('请输入正确的链接！');return false;
	}
	$('#inputvalue').val(songid);
}
function showOrder(id){
	var qq=$("#qq3").val();
	var ii = layer.load(2, {shade:[0.1,'#fff']});
	$.ajax({
		type : "POST",
		url : "ajax.php?act=order",
		data : {qq:qq,id:id},
		dataType : 'json',
		success : function(data) {
			layer.close(ii);
			if(data.code == 0){
				var item = '<table class="table table-condensed table-hover">';
				item += '<tr><td colspan="6" style="text-align:center"><b>订单基本信息</b></td></tr><tr><td class="info">商品名称</td><td colspan="5">'+data.name+'</td></tr><tr><td class="info">订单金额</td><td colspan="5">'+data.money+'元</td></tr><tr><td class="info">下单信息</td><td colspan="5">'+data.inputs+'</td></tr>';
				if(data.list){
					item += '<tr><td colspan="6" style="text-align:center"><b>订单实时状态</b></td><tr><td class="warning">下单数量</td><td>'+data.list.num+'</td><td class="warning">下单时间</td><td colspan="3">'+data.list.add_time+'</td></tr><tr><td class="warning">初始数量</td><td>'+data.list.start_num+'</td><td class="warning">当前数量</td><td>'+data.list.now_num+'</td><td class="warning">订单状态</td><td><font color=blue>'+data.list.order_state+'</font></td></tr>';
				}else if(data.kminfo){
					item += '<tr><td colspan="6" style="text-align:center"><b>以下是你的卡密信息</b></td><tr><td colspan="6">'+data.kminfo+'</td></tr>';
				}
				if(data.alert){
					item += '<tr><td colspan="6" style="text-align:center"><b>商品简介</b></td><tr><td colspan="6">'+data.alert+'</td></tr></table>';
				}
				item += '</table>';
				layer.open({
				  type: 1,
				  title: '订单详细信息',
				  skin: 'layui-layer-rim',
				  content: item
				});
			}else{
				layer.alert(data.msg);
			}
		}
	});
}
$(document).ready(function(){
$("#showSearchBar").click(function () {
	$("#display_selectclass").slideToggle();
	$("#display_searchBar").slideToggle();
});
$("#closeSearchBar").click(function () {
	$("#display_searchBar").slideToggle();
	$("#display_selectclass").slideToggle();
});
$("#doSearch").click(function () {
	var kw = $("#searchkw").val();
	if(kw==''){$("#closeSearchBar").click();return;}
	var ii = layer.load(2, {shade:[0.1,'#fff']});
	$("#tid").empty();
	$("#tid").append('<option value="0">请选择商品</option>');
	$.ajax({
		type : "POST",
		url : "ajax.php?act=gettool",
		data : {kw:kw},
		dataType : 'json',
		success : function(data) {
			layer.close(ii);
			if(data.code == 0){
				var num = 0;
				$.each(data.data, function (i, res) {
					$("#tid").append('<option value="'+res.tid+'" cid="'+res.cid+'" price="'+res.price+'" alert="'+escape(res.alert)+'" inputname="'+res.input+'" inputsname="'+res.inputs+'" multi="'+res.multi+'" isfaka="'+res.isfaka+'">'+res.name+'</option>');
					num++;
				});
				$("#tid").val(0);
				getPoint();
				if(num==0 && cid!=0)$("#tid").html('<option value="0">没有搜索到相关商品</option>');
			}else{
				layer.alert(data.msg);
			}
		},
		error:function(data){
			layer.msg('服务器错误');
			return false;
		}
	});
});
$("#inputvalue").blur(function () {
	if($("#inputname").html() == '快手ID'||$("#inputname").html() == '快手ＩＤ'){
		if($("#inputvalue").val()!='' && $("#inputvalue").val().indexOf('http')>=0){
			getkuaishouid();
		}
	}
	if($("#inputname").html() == '歌曲ID'||$("#inputname").html() == '歌曲ＩＤ'){
		if($("#inputvalue").val().indexOf("s=") ==-1){
			if($("#inputvalue").val().length != 12 && $("#inputvalue").val().length != 16){
				layer.alert('歌曲ID是一串12位或16位的字符!<br>输入K歌作品链接即可！');
				return false;
			}
		}else if($("#inputvalue").val()!=''){
			getsongid();
		}
	}
	if($("#inputname").html() == '火山ID'||$("#inputname").html() == '火山ＩＤ'){
		if($("#inputvalue").val()!='' && $("#inputvalue").val().indexOf('http')>=0){
			gethuoshanid();
		}
	}
	if($("#inputname").html() == '抖音ID'||$("#inputname").html() == '抖音ＩＤ'){
		if($("#inputvalue").val()!='' && $("#inputvalue").val().indexOf('http')>=0){
			getdouyinid();
		}
	}
});
$("#cid").change(function () {
	var cid = $(this).val();
	var ii = layer.load(2, {shade:[0.1,'#fff']});
	$("#tid").empty();
	$("#tid").append('<option value="0">请选择商品</option>');
	$.ajax({
		type : "GET",
		url : "ajax.php?act=gettool&cid="+cid,
		dataType : 'json',
		success : function(data) {
			layer.close(ii);
			if(data.code == 0){
				var num = 0;
				$.each(data.data, function (i, res) {
					$("#tid").append('<option value="'+res.tid+'" cid="'+res.cid+'" price="'+res.price+'" alert="'+escape(res.alert)+'" inputname="'+res.input+'" inputsname="'+res.inputs+'" multi="'+res.multi+'" isfaka="'+res.isfaka+'">'+res.name+'</option>');
					num++;
				});
				if($_GET["tid"]){
					var tid = parseInt($_GET["tid"]);
					$("#tid").val(tid);
				}else{
					$("#tid").val(0);
				}
				getPoint();
				if(num==0 && cid!=0)$("#tid").html('<option value="0">该分类下没有商品</option>');
			}else{
				layer.alert(data.msg);
			}
		},
		error:function(data){
			layer.msg('服务器错误');
			return false;
		}
	});
});
	$("#submit_buy").click(function(){
		var tid=$("#tid").val();
		if(tid==0){layer.alert('请选择商品！');return false;}
		var inputvalue=$("#inputvalue").val();
		if(inputvalue=='' || tid==''){layer.alert('请确保每项不能为空！');return false;}
		if($("#inputvalue2").val()=='' || $("#inputvalue3").val()=='' || $("#inputvalue4").val()=='' || $("#inputvalue5").val()==''){layer.alert('请确保每项不能为空！');return false;}
		if($('#inputname').html()=='下单ＱＱ' && (inputvalue.length<5 || inputvalue.length>11)){layer.alert('请输入正确的QQ号！');return false;}
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		if($('#inputname').html()=='你的邮箱' && !reg.test(inputvalue)){layer.alert('邮箱格式不正确！');return false;}
		if($("#inputname2").html() == '说说ID'||$("#inputname2").html() == '说说ＩＤ'){
			if($("#inputvalue2").val().length != 24){layer.alert('说说必须是原创说说！');return false;}
		}
		$('#pay_frame').hide();
		$('#submit_buy').val('Loading');
		$.ajax({
			type : "POST",
			url : "ajax.php?act=pay",
			data : {tid:tid,inputvalue:inputvalue,inputvalue2:$("#inputvalue2").val(),inputvalue3:$("#inputvalue3").val(),inputvalue4:$("#inputvalue4").val(),inputvalue5:$("#inputvalue5").val(),num:$("#num").val()},
			dataType : 'json',
			success : function(data) {
				if(data.code == 0){
					$('#alert_frame').hide();
					$('#tid').attr("disabled",true);
					$('#qq1').attr("disabled",true);
					$('#submit_buy').hide();
					$('#orderid').val(data.trade_no);
					$('#needs').val("￥"+data.need);
					$("#pay_frame").slideDown();
					if($('#inputname').html()=='你的邮箱'){
						$.cookie('email', inputvalue);
					}
				}else{
					layer.alert(data.msg);
				}
				$('#submit_buy').val('立即购买');
			} 
		});
	});
	$("#submit_checkkm").click(function(){
		var km=$("#km").val();
		if(km==''){layer.alert('请确保卡密不能为空！');return false;}
		$('#submit_km').val('Loading');
		$('#km_show_frame').hide();
		$.ajax({
			type : "POST",
			url : "ajax.php?act=checkkm",
			data : {km:km},
			dataType : 'json',
			success : function(data) {
				if(data.code == 0){
					$('#submit_checkkm').hide();
					$('#km').attr("disabled",true);
					$('#km_tid').val(data.tid);
					$('#km_name').val(data.name);
					if(data.alert!=''){
						$('#km_alert_frame').show();
						$('#km_alert_frame').html(data.alert);
					}else{
						$('#km_alert_frame').hide();
					}
					var inputname = data.inputname;
					if(inputname!=''){
						$('#km_inputname').html(inputname);
					}else{
						$('#km_inputname').html("下单ＱＱ");
					}
					var inputsname = data.inputsname;
					if(inputsname!=''){
						$('#km_inputsname').html("");
						$.each(inputsname.split('|'), function(i, value) {
							if(value=='说说ID'||value=='说说ＩＤ')
								var addstr='<div class="input-group-addon onclick" onclick="get_shuoshuo(\'km_inputvalue'+(i+2)+'\',$(\'#km_inputvalue\').val(),1)">自动获取</div>';
							else
								var addstr='';
							$('#km_inputsname').append('<div class="form-group"><div class="input-group"><div class="input-group-addon" id="km_inputname">'+value+'</div><input type="text" name="inputvalue'+(i+2)+'" id="km_inputvalue'+(i+2)+'" value="" class="form-control" required/>'+addstr+'</div></div>');
						});
						$('#km_inputsname').show();
					}else{
						$('#km_inputsname').html("");
						$('#km_inputsname').hide();
					}

					$("#km_show_frame").slideDown();
				}else{
					layer.alert(data.msg);
				}
				$('#submit_checkkm').val('检查卡密');
			} 
		});
	});
	$("#submit_card").click(function(){
		var km=$("#km").val();
		var inputvalue=$("#km_inputvalue").val();
		if(inputvalue=='' || km==''){layer.alert('请确保每项不能为空！');return false;}
		if($("#km_inputvalue2").val()=='' || $("#km_inputvalue3").val()=='' || $("#km_inputvalue4").val()=='' || $("#km_inputvalue5").val()==''){layer.alert('请确保每项不能为空！');return false;}
		if($('#km_inputname').html()=='下单ＱＱ' && (inputvalue.length<5 || inputvalue.length>11)){layer.alert('请输入正确的QQ号！');return false;}
		if($("#km_inputname2").html() == '说说ID'||$("#km_inputname2").html() == '说说ＩＤ'){
			if($("#km_inputvalue2").val().length != 24){layer.alert('说说必须是原创说说！');return false;}
		}
		$('#submit_card').val('Loading');
		$('#result1').hide();
		$.ajax({
			type : "POST",
			url : "ajax.php?act=card",
			data : {km:km,inputvalue:inputvalue,inputvalue2:$("#km_inputvalue2").val(),inputvalue3:$("#km_inputvalue3").val(),inputvalue4:$("#km_inputvalue4").val(),inputvalue5:$("#km_inputvalue5").val()},
			dataType : 'json',
			success : function(data) {
				if(data.code == 0){
					$('#result1').html('<div class="alert alert-success"><img src="assets/img/ico_success.png">&nbsp;'+data.msg+'</div>');
					$("#result1").slideDown();
				}else{
					layer.alert(data.msg);
				}
				$('#submit_card').val('立即购买');
			} 
		});
	});
	$("#submit_query").click(function(){
		var qq=$("#qq3").val();
		//if(qq==''){layer.alert('请确保每项不能为空！');return false;}
		$('#submit_query').val('Loading');
		$('#result2').hide();
		$('#list').html('');
		$.ajax({
			type : "POST",
			url : "ajax.php?act=query",
			data : {qq:qq},
			dataType : 'json',
			success : function(data) {
				if(data.code == 0){
					var status;
					$.each(data.data, function(i, item){
						if(item.status==1)
							status='<span class="label label-success">已完成</span>';
						else if(item.status==2)
							status='<span class="label label-warning">处理中</span>';
						else if(item.status==3)
							status='<span class="label label-danger">异常</span>&nbsp;<button type="submit" class="btn btn-info btn-xs" onclick="fillOrder('+item.id+')">补交</button>';
						else if(item.status==4)
							status='<font color=red>已退款</font>';
						else
							status='<span class="label label-primary">待处理</span>';
						$('#list').append('<tr orderid='+item.id+'><td>'+item.input+'</td><td>'+item.name+'</td><td>'+item.value+'</td><td class="hidden-xs">'+item.addtime+'</td><td>'+status+'</td><td><a onclick="showOrder('+item.id+')" title="查看订单详细" class="btn btn-info btn-xs">详细</a></td></tr>');
						if(item.result!=null){
							if(item.status==3){
								$('#list').append('<tr><td colspan=5><font color="red">异常原因：'+item.result+'</font></td></tr>');
							}else{
								$('#list').append('<tr><td colspan=5><font color="blue">处理结果：'+item.result+'</font></td></tr>');
							}
						}
					});
					$("#result2").slideDown();
				}else{
					layer.alert(data.msg);
				}
				$('#submit_query').val('立即查询');
			} 
		});
	});
	$("#submit_lqq").click(function(){
		var qq=$("#qq4").val();
		if(qq==''){layer.alert('QQ号不能为空！');return false;}
		if(qq.length<5 || qq.length>11){layer.alert('请输入正确的QQ号！');return false;}
		$('#result3').hide();
		if($.cookie('lqq') && $.cookie('lqq').indexOf(qq)>=0){
			$('#result3').html('<div class="alert alert-success"><img src="assets/img/ico_success.png">&nbsp;该QQ已经提交过，请勿重复提交！</div>');
			$("#result3").slideDown();
			return false;
		}
		$('#submit_lqq').val('Loading');
		$.ajax({
			type : "POST",
			url : "ajax.php?act=lqq",
			data : {qq:qq,salt:hashsalt},
			dataType : 'json',
			success : function(data) {
				if($.cookie('lqq')){
					$.cookie('lqq', $.cookie('lqq')+'-'+qq);
				}else{
					$.cookie('lqq', qq);
				}
				$('#result3').html('<div class="alert alert-success"><img src="assets/img/ico_success.png">&nbsp;QQ已提交 正在为您排队,可能需要一段时间 请稍后查看圈圈增长情况</div>');
				$("#result3").slideDown();
				$('#submit_lqq').val('立即提交');
			} 
		});
	});
$("#buy_alipay").click(function(){
	var orderid=$("#orderid").val();
	window.location.href='other/submit.php?type=alipay&orderid='+orderid;
});
$("#buy_qqpay").click(function(){
	var orderid=$("#orderid").val();
	window.location.href='other/submit.php?type=qqpay&orderid='+orderid;
});
$("#buy_wxpay").click(function(){
	var orderid=$("#orderid").val();
	window.location.href='other/submit.php?type=wxpay&orderid='+orderid;
});
$("#buy_tenpay").click(function(){
	var orderid=$("#orderid").val();
	window.location.href='other/submit.php?type=tenpay&orderid='+orderid;
});
$("#buy_shop").click(function(){
	var orderid=$("#orderid").val();
	window.location.href='shop.php?act=submit&orderid='+orderid;
});

var i = $("#num").val();
$("#num_add").click(function () {
	if ($("#need").val() == ''){
		layer.alert('请先选择商品');
		return false;
	}
	var multi = $('#tid option:selected').attr('multi');
	if (multi == 0){
		layer.alert('该商品不支持选择数量');
		return false;
	}
	i++;
	var price = $('#tid option:selected').attr('price');
	$("#num").val(i);
	price = price * i;
	$("#need").val('￥' + price.toFixed(2));
});
$("#num_min").click(function (){
	if ($("#need").val() == ''){
		layer.alert('请先选择商品');
		return false;
	}
	var multi = $('#tid option:selected').attr('multi');
	if (multi == 0){
		layer.alert('该商品不支持选择数量');
		return false;
	}
	i--;
	var price = $('#tid option:selected').attr('price');
	$("#num").val(i);
	price = price * i;
	$("#need").val('￥' + price.toFixed(2));
	if (i <= 0) {
		$("#num").val(1);
		i = 1;
		$("#need").val('￥' + $('#tid option:selected').attr('price'));
	}
});
$("#num").blur(function () {
	var price = $('#tid option:selected').attr('price');
	if($("#num").val()<1){
		$("#num").val("1")
	}
	price = price * $("#num").val();
	$("#need").val('￥' + price.toFixed(2));
});

if(homepage == true){
	getcount();
}
if($_GET['buyok']){
	var orderid = $_GET['orderid'];
	$("#tab-query").tab('show');
	$("#submit_query").click();
	isModal=false;
}
if($_GET['cid']){
	var cid = parseInt($_GET['cid']);
	$("#cid").val(cid);
}
$("#cid").change();

if( !$.cookie('op') && isModal==true){
	$('#myModal').modal({
		keyboard: true
	});
	var cookietime = new Date(); 
	cookietime.setTime(cookietime.getTime() + (10*60*1000));
	$.cookie('op', false, { expires: cookietime });
}
var visits = $.cookie("counter")
if(!visits)
{
 visits=1;
}
else
{
 visits=parseInt(visits)+1;
}
$('#counter').html(visits);
$.cookie("counter", visits, 24*60*60*30);
});