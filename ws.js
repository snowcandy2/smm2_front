var win = 0;
var lose = 0;
var tio;
var tio2;
var tio3;

window.onload = function ()
         {
             
            if ("WebSocket" in window)
            {
               
               // 打开一个 web socket
               var ws = new WebSocket("ws://127.0.0.1:8099");
                
               ws.onopen = function()
               {
                //   $("#wsinfo").html("已连接");
               };
                
               ws.onmessage = function (evt) 
               { 
                  var received_msg = evt.data;
                  try {
                    var res = JSON.parse(received_msg);
                    if (res.type === 'level_detected') {
                        // 接收到新关卡
                        $("#level_name").html("");
                        $("#level_id").html("");
                        $("#level_author").html("");
                    } else if (res.type === 'level') {
                        // 接收到新关卡，但是tgr找不到或者连不上
                        $("#level_name").html(res.message.level_name);
                        $("#level_id").html(res.message.level_code);
                        $("#level_author").html("");
                    } else if (res.type === 'new_level') {
                        // 接收到新关卡，成功连接tgr
                        $("#level_name").html(res.message.name);
                        $("#level_id").html(res.level_code);
                        $("#level_author").html(res.message.uploader.name);
                        $("#likes").html(res.message.likes);
                        $("#boos").html(res.message.boos);
                        $("#plays").html(res.message.plays);
                        $("#clear_rate").html(res.message.clear_rate);
                        $("#clears").html(res.message.clears);
                        $("#attempts").html(res.message.attempts);
                        $("#cleartime").html(res.message.upload_time_pretty);
                        if ('world_record' in res.message || 'record_holder' in res.message) {
                            $("#world_record").html(res.message.world_record_pretty);
                            $("#wr").html(res.message.record_holder.name);
                        } else {
                            $("#world_record").html("--:--.---");
                            $("#wr").html("???");
                        }
                        $("#difficulty").html(["简单", "普通", "困难", "极难"][res.message.difficulty]);
                        $("#versus_matches").html(res.message.versus_matches);
                        $("#coop_matches").html(res.message.coop_matches);
                        $("#leftdown").fadeIn(1000);
                        setTimeout(function() {
                            $("#leftdown").fadeOut(1000);
                        }, 10000);
                    } else if (res.type === 'win') {
                        win = res.message;
                        clearTimeout(tio);
                        $("#righttop").show(200);
                        $("#wins").hide(200);
                        $("#win_rate").hide(200);
                        setTimeout(function() {
                            $("#wins").html(win);
                            $("#win_rate").html((win / (win + lose) * 100.0).toFixed(2) + "%");
                            $("#wins").show(200);
                            $("#win_rate").show(200);
                        }, 500);
                        tio = setTimeout(function() {
                            $("#righttop").fadeOut(200);
                        }, 20000);
                    } else if (res.type === 'lose') {
                        lose = res.message;
                        clearTimeout(tio);
                        $("#righttop").show(200);
                        $("#losses").hide(200);
                        $("#win_rate").hide(200);
                        setTimeout(function() {
                            $("#losses").html(lose);
                            $("#win_rate").html((win / (win + lose) * 100.0).toFixed(2) + "%");
                            $("#losses").show(200);
                            $("#win_rate").show(200);
                        }, 500);
                        tio = setTimeout(function() {
                            $("#righttop").fadeOut(200);
                        }, 20000);
                    } else if (res.type === 'death') {
                        clearTimeout(tio3);
                        $("#death_cnt").html(res.message);
                        $("#deaths").show(800);
                        tio3 = setTimeout(function() {
                            $("#deaths").hide(800);
                        }, 3000);
                    } else if (res.type === 'message') {
                        clearTimeout(tio2);
                        switch (res.message) {
                            case 'thanks':
                                $("#mcontent").html("谢谢"); break;
                            case 'here_we_go':
                                $("#mcontent").html("拜托了"); break;
                            case 'nice_work':
                                $("#mcontent").html("辛苦了！"); break;
                            case 'im_done_for':
                                $("#mcontent").html("输掉了……"); break;
                            case 'sorry':
                                $("#mcontent").html("不好意思"); break;
                            case 'no_worries':
                                $("#mcontent").html("不要在意！"); break;
                            case 'nice':
                                $("#mcontent").html("赞！"); break;
                            case 'how':
                                $("#mcontent").html("你是怎么办到的？"); break;
                            case 'gotcha':
                                $("#mcontent").html("原来如此！"); break;
                            case 'so_tough':
                                $("#mcontent").html("好难！"); break;
                            case 'oops':
                                $("#mcontent").html("糟糕！"); break;
                            case 'wahoo':
                                $("#mcontent").html("太好了！"); break;
                            case 'oh_no':
                                $("#mcontent").html("被打败了"); break;
                            case 'weve_got_this':
                                $("#mcontent").html("加油吧！"); break;
                            case 'teamwork':
                                $("#mcontent").html("一起合作吧"); break;
                            case 'follow_me':
                                $("#mcontent").html("请到这边来！"); break;
                            case 'help':
                                $("#mcontent").html("请帮帮我！"); break;
                            case 'run_for_it':
                                $("#mcontent").html("请冲刺！"); break;
                            case 'jump':
                                $("#mcontent").html("请跳跃！"); break;
                            case 'hop_on':
                                $("#mcontent").html("请到上面来！"); break;
                            case 'throw':
                                $("#mcontent").html("请投掷！"); break;
                        }
                        $("#message").fadeIn(500);
                        tio2 = setTimeout(function() {
                            $("#message").fadeOut(500);
                        }, 3000);
                    }
                  } catch (e) {
                      console.log(e);
                  }
                //   $("#wsinfo").html(received_msg);
               };
                
               ws.onclose = function()
               { 
                  // 关闭 websocket
                  $("#wsinfo").html("连接已关闭");
               };
            }
            
            else
            {
               // 浏览器不支持 WebSocket
               $("#wsinfo").html("您的浏览器不支持 WebSocket!");
            }
         }