$(function(){
    var getLinkUrl = getQueryString('go');
    if(getLinkUrl){
      $.ajax({
        type: "get",
        url: 'https://link.csdn.net/api/v1/link/check?url='+ getLinkUrl, //测服
        xhrFields: {withCredentials: true},
        success: function (res) {
          var string = ''
          if(res.code == 200){
            if(res.data.jump){
              window.location.href = xssCheck(getLinkUrl)
            }else{  
              if(res.data.expand){
                if(res.data.expand.url && res.data.expand.type && res.data.expand.type == 2){
                  window.location.href = res.data.expand.url;
                }else{
                  string = '<div class="loading-item loading-others">\
                            <div class="flex loading-tip tip1">\
                              <img class="loading-img" src="./go_files/rockets20201108.png" alt="">\
                              <div class="loading-text">'+res.data.expand.desc+'</div>\
                            </div>\
                            <div class="loading-topic">\
                              <span>您即将离开本站，去往：</span>\
                              <a class="loading-color1">'+xssCheck(getLinkUrl)+'</a>\
                            </div>\
                            <div class="flex-end">\
                                <a class="loading-btn" href="'+xssCheck(getLinkUrl)+'" target="_self" data-report-click=\'{"spm":"1032.2214.3001.5251"}\' data-report-view=\'{"spm":"1032.2214.3001.5251"}\'>继续</a>\
                                <a class="loading-btn loading-btn-github" href="'+res.data.expand.url+'" target="_self" data-report-click=\'{"spm":"1032.2214.3001.5252"}\' data-report-view=\'{"spm":"1032.2214.3001.5252"}\'>'+res.data.expand.button+'</a>\
                            </div>\
                          </div>';
                }
              }
            }
          }else if(res.code == 400200002){
            string = '<div class="loading-item loading-others" data-report-view=\'{"spm":"1032.2214.3001.5250"}\'>\
                        <div class="flex loading-tip tip2">\
                          <img class="loading-img" src="./go_files/warning20201108.png" alt="">\
                          <div class="loading-text">请注意设备安全</div>\
                        </div>\
                        <div class="loading-topic"><span>您即将离开本站，去往：</span><a class="loading-color2">'+xssCheck(getLinkUrl)+'</a>\
                        </div>\
                        <div class="flex-end">\
                          <a class="loading-btn" href="'+xssCheck(getLinkUrl)+'" target="_self" data-report-click=\'{"spm":"1032.2214.3001.5250"}\'>继续</a>\
                        </div>\
                      </div>'
          }else if(res.code == 400200001){
            string = '<div class="loading-item loading-others" data-report-view=\'{"spm":"1032.2214.3001.5261"}\'>\
                        <div class="flex loading-tip tip3">\
                          <img class="loading-img" src="./go_files/warning20201108.png" alt="">\
                          <div class="loading-text">请注意设备安全</div>\
                        </div>\
                        <div class="loading-topic"><span>为您的设备安全考虑，已将访问终止</span></div>\
                      </div>'
          }else{
            string = '<div class="loading-item loading-others" data-report-view=\'{"spm":"1032.2214.3001.5260"}\'>\
                        <div class="flex loading-tip tip3">\
                          <img class="loading-img" src="./go_files/warning20201108.png" alt="">\
                          <div class="loading-text">链接无法访问</div>\
                        </div>\
                        <div class="loading-topic"><span>您所访问的页面由于未知原因无法打开</span></div>\
                      </div>'
          }
          if(string){
            $('.content .loading-safe').remove();
            $('.content').append(string);
          }    
        },
        error: function (res){
          var string = '<div class="loading-item loading-others" data-report-view=\'{"spm":"1032.2214.3001.5260"}\'>\
                        <div class="flex loading-tip tip3">\
                          <img class="loading-img" src="./go_files/warning20201108.png" alt="">\
                          <div class="loading-text">链接无法访问</div>\
                        </div>\
                        <div class="loading-topic"><span>您所访问的页面由于未知原因无法打开</span></div>\
                      </div>'
          $('.content .loading-safe').remove();
          $('.content').append(string);
        }
      });
    }
    function getQueryString(name) {   
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
      var r = window.location.search.substr(1).match(reg);  //匹配目标参数
      if( r != null ) return decodeURIComponent( r[2] ); return null;   
    }
    function xssCheck(str,reg){
      return str ? str.replace(reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, function (a, b) {
          if(b){
              return a;
          }else{
              return {
                  '<':'&lt;',
                  '&':'&amp;',
                  '"':'&quot;',
                  '>':'&gt;',
                  "'":'&#39;',
              }[a]
          }
      }) : '';
    }
  })