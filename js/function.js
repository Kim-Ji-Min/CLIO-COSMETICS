$(function(){
  //plugin 초기화
  $(window).on('load',function(){
    new WOW().init();
  });
}); 

$(function(){
  //var
  var $gnb = $('header>nav>.gnb>li');
  var $sub = $('header>nav>.gnb>li>.sub');
  var $language = $('header>nav>.lnb>li>a.language');
  var $sitemap = $('header>nav>.lnb>li>a.sitemap');

  var $slide = $('section>.slide-container>.slide>li');
  var $indicator = $('section>.slide-container>.slide-pagination>ol>li>a');
  var intervalKey = null;

  var $fnb = $('footer>.fnb>a');
  var $fnbList = $('footer>.fnb>ul');
  var $btnTop = $('footer>.info>.policy>li>a.top');
  var $btnFamily = $('footer>.info>.familysite>a.familysiteOpen');

  var nowIdx  = 0;

  //function
  function nextIdx(){
    if(nowIdx<2){
      nowIdx++;
    }else{
      nowIdx = 0;
    }
  }

  function slideMove(){
    $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
    
    $slide.filter('.on').stop().fadeOut(1500).removeClass('on');
    $slide.eq(nowIdx).stop().fadeIn(1500).addClass('on');
  }

  function autoPlay(){
    intervalKey = setInterval(function(){
      nextIdx();
      slideMove();
    },2000);
  }

  autoPlay();

  function autoStop(){
    clearInterval(intervalKey);
  }
  
  //header
  $gnb.on({
    'mouseenter':function(){
      nowIdx = $gnb.index(this);
      $sub.eq(nowIdx).stop().fadeIn();
    },
    'mouseleave':function(){
      $sub.stop().fadeOut();
    }
  });

  $('header>nav>.gnb>li>a').focus(function(){
    $sub.stop().fadeOut();
    $(this).parent().find('.sub').stop().fadeIn();
  });

  $('.last>a').blur(function(){
    $sub.stop().fadeOut();
  });

  $language.on('click',function(event){
    event.preventDefault();
    alert('현재 지원하지 않는 기능입니다.');
  });

  $sitemap.on('click',function(event){
    event.preventDefault();
    var bottomVal = $('footer').offset().top;

    $('html,body').stop().animate({
      scrollTop : bottomVal
    },1000,'easeInOutCubic');

    $fnb.trigger("click");
  });//end of header

  //section - slide banner
  $indicator.on('click',function(event){
    event.preventDefault();
    autoStop();
    nowIdx = $indicator.index(this);

    slideMove();
  });//end of section

  //footer
  $btnTop.on('click',function(event){
    event.preventDefault();
    var topVal = $('header').offset().top;

    $('html,body').stop().animate({
      scrollTop : topVal
    },1000,'easeInOutCubic');
  });
  
  $fnb.on('click',function(event){
    event.preventDefault();

    $fnbList.stop().slideToggle(500);
  });

  $btnFamily.on('click',function(event){
    event.preventDefault();
    $(this).next('ul').stop().slideToggle(500);
  });

  $btnFamily.on('focusout',function(){
    $(this).siblings().stop().slideUp(500);
  });//end of footer
});

