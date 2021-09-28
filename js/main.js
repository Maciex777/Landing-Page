$(document).ready(function(){

    // Cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    function readCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    let x = readCookie('infocookie');
    if (x === 'show') {
        $('#cookiePolicy').css("display", "none");
    } else {
        setCookie('infocookie','show',365); //liczba dni trwałości cookie
    }
    // po kliknięciu na przycisk Akceptuję
    $('#cookiePolicy__close').on('click', function(){
        $('#cookiePolicy').hide();
    });



  // Slider
  $('.intro-section__slider').slick({
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    dotsClass: 'intro-section__slider-dots',
  });



  // Menu na scroll
  $(window).scroll(function () {
    if ($(document).scrollTop() > 150) {
      $('#page-header').addClass('header-shrink');
    } else {
      $('#page-header').removeClass('header-shrink');
    }
  });
  //Smooth scrool do sekcji, której id jest podane w atrybucie data-href
  $('[data-href^="#"]').on('click', function(event) {
      if ($('#toggle-menu').hasClass('active')) {
        $('#toggle-menu').removeClass('active');
        $('#menu').removeClass('open');
      }

      let target = $( $(this).attr('data-href') );
      if( target.length ) {
          event.preventDefault();
          $('html, body').animate({
              scrollTop: target.offset().top
          }, 900);
      }
  });
  // Menu mobilne
  $('#toggle-menu').click (function(){
    $(this).toggleClass('active');
    $('#menu').toggleClass('open');
  });




  // Taby
  const tabButton = $('.analysis-tabs__button');
  const tabContent = $('.analysis-content__item');

  tabButton.not(':first').addClass('inactive');
  tabContent.hide();
  tabContent.first().show();

  // Po kliknięciu na zakładkę
  tabButton.click(function() {

    if ($(window).width() > 1200) {
      $('html, body').animate({
        scrollTop: $("#analysis-tabs").offset().top
      }, 600);
    } else {
      let targetOffset = $("#analysis-content").offset().top - 50;
      $('html, body').animate({
        scrollTop: targetOffset
      }, 600);
    }

    let tabNumber = $(this).attr('id');

    if($(this).hasClass('inactive')){
      tabButton.addClass('inactive');
      $(this).removeClass('inactive');

      tabContent.hide();
      $('#'+ tabNumber + '-content').fadeIn('slow');
   }

   $('.analysis-graph__bar').css('height', 0);  // Wyzerowanie słupków wykresu

   if ($(this).is('#tab3')) {
     $('.analysis-graph__bar').each(function(){
       let $bar = $(this);
       let percentNum = parseFloat($bar.attr('data-percent'));

       if (percentNum < 0) { // Jeżeli wartość procentowa jest ujemna
         $bar.css('top', '100%'); // Odwrócenie słupka wykresu
         percentNum *= -1
         let positivePer = percentNum + '%';
         $bar.attr('data-percent', positivePer); // Przypisanie dodatniej wartości do słupka wykresu
       }
       setTimeout(function(){
         $bar.css('height', $bar.attr('data-percent')); // Animacja rosnących słupków wykresu
       }, 100);
     });
   }

  });

  $('#analysis-table tr').not(':first').each(function() {
    let firstCol = $(this).find("td:first").html();
    let secondCol = $(this).find("td:nth-of-type(2)").html();
    let thirdCol = $(this).find("td:nth-of-type(3)").html();
    setChartBars(firstCol, secondCol, thirdCol);
  });

  function setChartBars(year, sales, profit){
    let currentBar = $('.analysis-graph__bars-wrapper[data-year="'+year+'"] div');
    // Usuwanie spacji i upewnianie się, że wartość jest liczbą
    let profitPer = (parseInt(profit.replace(/ /g,'')) / 100) + '%';
    let salesPer = (parseInt(sales.replace(/ /g,''))*2 / 1000) + '%';
    // zamiana wartości słupków wykresu na wartości z tabeli
    currentBar.eq(0).attr('data-percent', profitPer);
    currentBar.eq(1).attr('data-percent', salesPer);
  }


  // Formularz
  // ID formularza
  var submitForm = $('#contact-form');
  // ID pola tekstowego z informacją
  var infoMessage = $('#info-message');
  var submitBtn = $('#submit-button');

  submitForm.on('submit', function (e) {
    e.preventDefault();
    var formData = $(this).serialize();
    $.post("send.php", formData).fail(function (req) {
      console.log(req);
      infoMessage.addClass('contact-section__form-info--fail');
      submitBtn.addClass('button-active');
      infoMessage.html('Nie udało się wysłać wiadomości!');
    }).always(function (req) {
      console.log(req);
      infoMessage.addClass('contact-section__form-info--success');
      submitBtn.addClass('button-active');
      infoMessage.html('Wysłano wiadomość!');
    }).done(function (req) {
      console.log(req);
      infoMessage.addClass('contact-section__form-info--success');
      submitBtn.addClass('button-active');
      infoMessage.html('Wysłano wiadomość!');
    })
  });


});
