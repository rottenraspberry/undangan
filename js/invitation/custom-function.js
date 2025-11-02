$( document ).ready(function() {
    
    /*------------------------------ Page Scrolling ----------------------*/
    
    $('.nav-item').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
    if (icon_gift) {
        $('.gifts').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    }
    
    /*------------------------------ Tooltips ----------------------*/
    
    $('.tooltips').tooltip();

    /*------------------------------ Bootstrap Carousel ----------------------*/

    $('#myCarousel').carousel({
        interval: 5000, //changes the speed
        pause: "false"
    })
    //Bootstrap Carousel Progressbar
    
    $("#progressbar").progressbar({
        value: 1
    });
    $("#progressbar > .ui-progressbar-value").animate({
        width: "100%"
    }, 5000);
    
    $('#myCarousel').bind('slid.bs.carousel', function (e) {        
            $("#progressbar > .ui-progressbar-value").finish();
            $("#progressbar > .ui-progressbar-value").animate({
            width: "0%"
            }, 0);
            $("#progressbar > .ui-progressbar-value").animate({
            width: "100%"
            }, 5000);               
    });
    
    /*------------------------------ Magnific POP -----------------*/
    $('.popup-image').magnificPopup({
      type: 'image',
      removalDelay: 500, //delay removal by X to allow out-animation
      callbacks: {
        beforeOpen: function() {
          // just a hack that adds mfp-anim class to markup 
           this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
           this.st.mainClass = this.st.el.attr('data-effect');
        }
      },
      closeOnContentClick: true,
      midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });

    /*------------------------------ QR Code -----------------*/
    if (qrcode) {
        $('.qrcode').click(function(){
            $('#modal-qr').removeAttr('class').addClass('one');
            $('body').addClass('modal-active');
            $('html').css('overflow-y','hidden');
        });

        $('#modal-qr').click(function(){
            $(this).addClass('out');
            $('body').removeClass('modal-active');
            $('html').css('overflow-y','scroll');
        });
    } else {
        $('.qrcode').remove();
        $('#qr-code').remove();
    }
    
    /*------------------------------ Check ios -----------------*/
    var deviceAgent = navigator.userAgent.toLowerCase();
    var ios = deviceAgent.match(/(iphone|ipod|ipad)/);
    
    /*------------------------------ countdown ----------------------*/
    const countDown = new Date(target_date).getTime(),
        x = setInterval(function() {
      const now = new Date().getTime(),
            distance = countDown - now,
            days = Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds = Math.floor((distance % (1000 * 60)) / 1000);
      var pass = 0;
      if (distance < 0) {
        var pass = 1;
        clearInterval(x);
      }
      if (pass) {
        document.getElementById('time').innerHTML = "<div>0<span>" + text_days + "</span></div><div>0<span>" + text_hours + "</span></div><div>0<span>" + text_minutes + "</span></div><div>0<span>" + text_second + "</span></div>";
      } else {
          document.getElementById('time').innerHTML = "<div>" + days + "<span>" + text_days + "</span></div><div>" + hours + "<span>" + text_hours + "</span></div><div>"+ minutes  + "<span>" + text_minutes + "</span></div><div>" + seconds + "<span>" + text_second + "</span></div>";
      }
    }, 1000);
    
    /*------------------------------ modal cover ----------------------*/

    $("#myModal").modal('show');

    /*------------------------------ get id youtubes ----------------------*/

    function getId(url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
    }
    if (bcksnd == "youtube") {
        var IdSong = getId(ytSong);
        if (start_yt > 0) {
            var st_song = '&start=' + start_yt;
        } else {
            var st_song = '';
        }
        if (ios) {
            $('#youtube_song').html('<iframe class="youtube_song" src="" data-src="//www.youtube.com/embed/' + IdSong + '?autoplay=1' + st_song + '&modestbranding=1&rel=0&hl=ru&showinfo=0&color=white&enablejsapi=1&loop=1&playlist=' + IdSong + '" frameborder="0" allowTransparency="true" frameborder="0" allowTransparency="true" allowfullscreen></iframe>');
            var iframe_song = $('#youtube_song').find('.youtube_song');
            var src_song = iframe_song.data('src');
            iframe_song.attr('src',src_song);
        } else {
            $('<iframe id="youtubesong" class="youtube_song" src="//www.youtube.com/embed/' + IdSong + '?modestbranding=1' + st_song + '&controls=0&rel=0&hl=ru&showinfo=0&color=white&enablejsapi=1&loop=1&playlist=' + IdSong + '" frameborder="0" allowTransparency="true" frameborder="0" allowTransparency="true" allowfullscreen></iframe><div style="width: 35%; height: 100%; position: absolute; top: 0; left: -1px; opacity:0;"></div><div style="width: 35%; height: 100%; position: absolute; top: 0; right: -1px; opacity:0;"></div>').appendTo('#button-cover');
            var iframe_song = $('#button-cover').find('.youtube_song');
        }
    }

    /*------------------------------ open invitation ----------------------*/

    $('#button-cover').click(function(){
      if (bcksnd != "no") {
        $("#mp3-player").addClass("play");
      }
      if (bcksnd == "mp3") {
        if (audio.paused) {
            audio.play();
        }
      }
      if (bcksnd == "youtube") {
          if (ios) {
            $('.youtube_song')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
          }
      }
      $("#dum").css("display","none");
      $(".home").css("display","block");
      $('html').css('overflow-y', 'scroll');
      if (gifts) {
        $('.gifts').css('visibility','visible');
      }
    });    

    if (bcksnd != "no") {
        
        if (bcksnd == "youtube") {
            setInterval(function(){
                if(document.activeElement.id === 'youtubesong'){
                    $(".open-btn").find("a").trigger("click");
                }
            },500);
        }

        /*------------------------------ backsound piringan hitam ----------------------*/
        $('#mp3-player').click(function(){
          if ($("#mp3-player").hasClass("play")) {
              if (bcksnd == "mp3") {
                if (audio.played) {
                    audio.pause();
                }
              }
              if (bcksnd == "youtube") {
                $('.youtube_song')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
              }
            $("#mp3-player").removeClass("play");
          } else {
            if (bcksnd == "mp3") {
             if (audio.paused) {
                audio.play();
             }
            }
            if (bcksnd == "youtube") {
                $('.youtube_song')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
            }
            $("#mp3-player").addClass("play"); 
          }

          if (vp) {
            if ($("button.play-video").hasClass("active")) {
                $('button.play-video').removeClass("active");
                $('button.pause-video').addClass("active");
                $('#videoprewed')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
            }
          }
        });
            
        /*------------------------------ focus blur window ----------------------*/
        if (bcksnd == "mp3") {

            var visited = 0;

            $(window).on('blur focus', function(e) {
              var prevType = $(this).data('prevType');
              
              if (prevType != e.type) {
                switch (e.type) {
                  case 'blur':
                    if (audio.played) {
                      audio.pause();
                    }
                    $("#mp3-player").removeClass("play");
                    break;
                    
                  case 'focus':
                    if (audio.paused) {
                      audio.play();
                    }
                    $("#mp3-player").addClass("play");
                    visited++;
                    break;
                }
              }
              
              $(this).data('prevType', e.type);
            });
        }
    }
    /*------------------------------ video prewed ----------------------*/

    if (vp) {
        var myId = getId(ytVid);
        if (ios) {
            $('#video_prewed').html('<iframe id="videoprewed" class="videoIframe js-videoIframe" src="" frameborder="0" allowTransparency="true" allowfullscreen data-src="//www.youtube.com/embed/' + myId + '?autoplay=1&controls=0&modestbranding=1&rel=0&hl=ru&showinfo=0&color=white&enablejsapi=1"></iframe><button class="videoPoster js-videoPoster"></button>');
            var iframes = $('#video_prewed').find('.js-videoIframe');
            var srcs = iframes.data('src');
            iframes.attr('src',srcs);
        } else {
            $('#video_prewed').html('<button id="videoPoster" class="videoPoster js-videoPoster" style="position:absolute;"></button><iframe id="videoprewed" class="videoIframe js-videoIframe" frameborder="0" allowTransparency="true" allowfullscreen src="//www.youtube.com/embed/' + myId + '?modestbranding=1&controls=0&rel=0&hl=ru&showinfo=0&color=white&enablejsapi=1" style="position:absolute; opacity:0;"></iframe><div style="position: absolute; width: 100%; height: 30%; top: 0; opacity: 0;"></div><div style="position: absolute; width: 100%; height: 20%; bottom: 0; opacity: 0;"></div>');
        }
        $('.videoPoster').css('background-image','url(https://img.youtube.com/vi/'+ myId +'/maxresdefault.jpg)');

        if (ios) {
            $(document).on('click','.js-videoPoster',function(e) {
              if (bcksnd != "no") {
                  if (bcksnd == "mp3") {
                      if (audio.played) {
                        audio.pause();
                      }
                  }
                  if (bcksnd == "youtube") {
                      $('.youtube_song')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
                  }
                  $("#mp3-player").removeClass("play");
              }
              $('#video_prewed').addClass('videoWrapperActive');
              $('#videoprewed')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
              $('.controls-video').css("visibility", "visible");
              $('#video_prewed').css("pointer-events", "none");
              $('button.play-video').addClass("active");
            });
        } else {
            setInterval(function(){
                if(document.activeElement.id === 'videoprewed'){
                    $('#video_prewed').css("pointer-events", "none");
                    $('#videoprewed').css('opacity','1');
                    $('#videoPoster').remove();
                    $('.controls-video').css("visibility", "visible");
                    $('button.play-video').addClass("active");
                    if (bcksnd != "no") {
                        if (bcksnd == "mp3") {
                          if (audio.played) {
                            audio.pause();
                          }
                        }
                        if (bcksnd == "youtube") {
                              $('.youtube_song')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
                        }
                        $("#mp3-player").removeClass("play");
                    }
                }
            },500);
        }

        $('button.play-video').click(function(){
          if ($("button.stop-video").hasClass("active")) {
            $('button.stop-video').removeClass("active");
          }
          if ($("button.pause-video").hasClass("active")) {
            $('button.pause-video').removeClass("active");
          }
          $('button.play-video').addClass("active");
          $('#videoprewed')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
          $("#mp3-player").removeClass("play");
          if (bcksnd != "no") {
              if (bcksnd == "mp3") {
                  if (audio.played) {
                    audio.pause();
                  }
              }
              if (bcksnd == "youtube") {
                  $('.youtube_song')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
              }
          }
        });

        $('button.stop-video').click(function(){
          if ($("button.play-video").hasClass("active")) {
            $('button.play-video').removeClass("active");
          }
          if ($("button.pause-video").hasClass("active")) {
            $('button.pause-video').removeClass("active");
          }
          $('button.stop-video').addClass("active");
          $('#videoprewed')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
          if (!$("#mp3-player").hasClass("play")) {
            $("#mp3-player").addClass("play");
          }
          if (bcksnd != "no") {
              if (bcksnd == "mp3") {
                  if (audio.paused) {
                    audio.play();
                  }
              }
              if (bcksnd == "youtube") {
                  $('.youtube_song')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
              }
          }
        });

        $('button.pause-video').click(function(){
          if ($("button.play-video").hasClass("active")) {
            $('button.play-video').removeClass("active");
          }
          if ($("button.stop-video").hasClass("active")) {
            $('button.stop-video').removeClass("active");
          }
          $('button.pause-video').addClass("active");
          $('#videoprewed')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
          if (!$("#mp3-player").hasClass("play")) {
            $("#mp3-player").addClass("play");
          }
          if (bcksnd != "no") {
              if (bcksnd == "mp3") {
                  if (audio.paused) {
                    audio.play();
                  }
              }
              if (bcksnd == "youtube") {
                  $('.youtube_song')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
              }
          }
        });
    }

    /*------------------------------ WOW Script ----------------------*/

    new WOW().init();   
    
});

/*------------------------------ confirm gift ----------------------*/
if (confirm_gift) {

    /*------------------------------ Input Format Rupiah ----------------------*/

    var dengan_rupiah = document.getElementById('gift_nominal');
    dengan_rupiah.addEventListener('keyup', function(e)
    {
        dengan_rupiah.value = formatRupiah(this.value, 'Rp. ');
    });
    
    function formatRupiah(angka, prefix)
    {
        var number_string = angka.replace(/[^,\d]/g, '').toString(),
            split    = number_string.split(','),
            sisa     = split[0].length % 3,
            rupiah     = split[0].substr(0, sisa),
            ribuan     = split[0].substr(sisa).match(/\d{3}/gi);
            
        if (ribuan) {
            separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
        
        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
    }

    $(document).ready(function(e){
        $("#gift-form").on('submit',(function(e) {
            $('#gift-submit').html(desc_loading);
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: "gift-submit.php",
                data: new FormData(this),
                contentType: false,
                     cache: false,
                processData: false,
                success: function(result) {
                    $('#gift-submit').html(desc_confirm);
                    if (result == "Gagal") {
                      Swal.fire("Uups!", desc_transfer_error, "error");
                    } else {
                      $("#gift_nama").val("");
                      $("#gift_rekening").val("");
                      $("#gift_nominal").val("");
                      Swal.fire("Berhasil!", desc_transfer_success, "success");
                    }
                }
            });
        })); 
    });
}

/*------------------------------ confirm gift ----------------------*/
if (confirm_rsvp) {

    /*------------------------------ Input Only Number ----------------------*/

    function Validate(id, numType){
      var thisId = document.getElementById(id);
      if(numType == "integer"){
        var remChars =  thisId.value.replace(/[^0-9\.]/g,'');
        thisId.value =  remChars.replace(/\./g,'');
      }
    }

    $(document).ready(function(e){
        $("#rsvp-form").on('submit',(function(e) {
            $('#rsvp-submit').html(desc_loading_rsvp);
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: "rsvp-submit.php",
                data: new FormData(this),
                contentType: false,
                     cache: false,
                processData: false,
                success: function(result) {
                    $('#rsvp-submit').html(desc_confirm_rsvp);
                    if (result == "Gagal") {
                      Swal.fire("Uups!", desc_rsvp_error, "error");
                    } else {
                      $("#rsvp_nama").val("");
                      $("#rsvp_jumlah").val("");
                      $("#rsvp_kehadiran").val("");
                      $("#rsvp_pesan").val("");
                      Swal.fire("Berhasil!", desc_rsvp_success, "success");
                    }
                }
            });
        })); 
    });
}
/*------------------------------ submit comment ----------------------*/
if (comment) {

    $(document).ready(function(e){
        $("#comment-form").on('submit',(function(e) {
            $('#comment-submit').html(desc_loading_comment);
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: "comment-submit.php",
                data: new FormData(this),
                contentType: false,
                     cache: false,
                processData: false,
                success: function(result) {
                    if (result == "Gagal") {
                      Swal.fire("Uups!", desc_comment_error, "error");
                      $('#comment-submit').html(desc_submit_comment);
                    } else {
                      var nama = $("#comment_nama").val();
                      if (form_hubungan) {
                        var hubungan = $("#comment_hubungan").val();
                        var notif_hubungan = '<div class="post-comments-info"><span>'+ hubungan +'</span></div>';
                      } else {
                        var notif_hubungan = '';
                      }
                      var ucapan = $("#comment_ucapan").val();
                      if (form_kehadiran) {
                          if ($("#comment_kehadiran").val() == "ya") {
                            var kehadiran = '<div class="post-comments-info"><span class="yes">ðŸ‘ ' + hadir + '</span></div>';
                          } else {
                            var kehadiran = '<div class="post-comments-info"><span class="no">ðŸ™ ' + absen + '</span></div>';
                          }
                      } else {
                        var kehadiran = '';
                      }
                      var notif_result = '<li class="wow fadeInUp" data-wow-delay="0.7s"><div class="post-comments-info"><h4>'+ nama +'</h4></div>' + notif_hubungan + '<div class="post-comments-comment">'+ ucapan +'</div>' + kehadiran + '</li>';
                      setTimeout(function() {
                        $('#comment-submit').html(desc_submit_comment);
                        if ($("#comment").hasClass("comment-detail")) {
                            $(notif_result).prependTo('.comment-detail');
                        }
                        $("#comment_nama").val("");
                        $("#comment_hubungan").val("");
                        $("#comment_kehadiran").val("");
                        $("#comment_ucapan").val("");
                        $("#notif-submit").css("visibility","visible");
                      }, 2000);
                      $("#underline-comment").remove();
                      $('<center><label id="notif-submit">' + desc_comment_success + '</label></center>').prependTo("#post-comments");
                      setTimeout(function() {
                        $("#notif-submit").remove();
                        if ($("#comment").hasClass("comment-detail")) {
                            $('<div id="underline-comment" class="underline" style="margin-bottom: 40px;"></div>').prependTo("#post-comments");
                        } else {
                            $('<div id="underline-comment" class="underline" style="margin-bottom: 40px;"></div><ul class="comment-detail">'+notif_result+'</ul>').prependTo("#post-comments");
                        }
                      }, 3000);
                    }
                }
            });
        })); 
    });

    /*------------------------------ More Comment ----------------------*/

    $("#morebutton").click(function(){
        $("#more").css("display","block");
        $("#morebutton").css("display","none");
    });
}

/*------------------------------ Preloader ----------------------*/

$(window).load(function() { 
    $('#preloader').delay(350).fadeOut('slow');
});

/*------------------------------ Disable rightclick ----------------------*/

$(function() {
    $(this).bind("contextmenu", function(e) {
        e.preventDefault();
    });
}); 
(function($){

$.fn.ctrl = function(key, callback) {

if (!$.isArray(key)) {
   key = [key];
}
callback = callback || function(){ return false; }
return $(this).keydown(function(e) {

    $.each(key,function(i,k){
        if(e.keyCode == k.toUpperCase().charCodeAt(0) && e.ctrlKey) {
            return callback(e);
        }
    });
    return true;
});
};


$.fn.disableSelection = function() {

this.ctrl(['a','s','c']);

return this.attr('unselectable', 'on')
           .css({'-moz-user-select':'-moz-none',
                 '-moz-user-select':'none',
                 '-o-user-select':'none',
                 '-khtml-user-select':'none',
                 '-webkit-user-select':'none',
                 '-ms-user-select':'none',
                 'user-select':'none'})
           .bind('selectstart', function(){ return false; });
};

})(jQuery);
$(':not(input,select,textarea)').disableSelection();


/*------------------------------ Adab Walimah ----------------------*/

function showNoticeOnScroll() {
    Swal.fire({
      html:"<h2 style='margin-top:0; margin-bottom:30px; color: #000;'>Adab Walimah</h2><img src='https://undgn.id/asset/img/adab-walimah.webp' style='width: 100%; height: auto; border-radius: 10px;'>",
      icon: "",
      allowOutsideClick: false,
      timer: 10000,
      timerProgressBar: true
    });
    window.removeEventListener('scroll', showNoticeOnScroll);
}

if (adab_walimah) {
    window.addEventListener('scroll', showNoticeOnScroll);
}
