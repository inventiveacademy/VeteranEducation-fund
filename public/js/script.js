"use strict";

$( document ).ready(function() {


  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
            '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
            '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('image-link')) return;

      var alt = this.alt;
      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="image-link"></a>');
    });

    $(this).find('.image-link').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  // Bootstrap table style
  $('.article-entry table').each(function(i, table)  {
    if ($(this).parent().hasClass('table-responsive')) return;
    $(this).addClass('table');
    $(this).wrap('<div class="table-responsive"></div>');
  });

  // Lightbox plugin
  if ($.fancybox){
    $('.image-link').fancybox();
  }



  // Landing Page Script //

  let fname;
  let lname;
  let email;
  let contactphone;
  let address;
  let city;
  let zip;
  let state;

  // Check for all required inputs and enable submit button
  function areValues() {
    if (fname && lname && email && phone && address && city && zip && state) {
        $("#submitAppBtn").prop("disabled", false);
    } else {
        if (!fname || !lname || !email || !phone || !address || !city || !zip || !state) {
            $("#submitAppBtn").prop("disabled", true);
        }
    }
  };


   // Phone validation
  function phoneValidation(phone) {  
    var number = /^\d{10}$/;  
    if(phone.match(number)) {
      return true;  
    }  
  }

  // Invalid phone alert popup
  function inValidPhoneAlert() {
      if($("#phone").data("error") === false) {
      $("#phone").toggleClass("inputError");
      $("#phoneContainer").append("<p id='inputErrorPar'>Please enter a valid phone number.</p>");
      $("#phone").data("error", true);
    }
  }

  // Remove invalid phone alert
  function removeInValidPhoneAlert() {
    $("#inputErrorPar").remove();
    $("#phone").data("error", false);
    $("#phone").toggleClass("inputError");
  }

  // Email validation
  function validateEmail(email) {  
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) { 
      return (true)  
    }   
  }

  // Invalid email alert popup
  function inValidEmailAlert() {
    if($("#email").data("error") === false) {
    $("#email").toggleClass("inputError");
    $("#emailContainer").append("<p id='inputErrorPar'>Please enter a valid email.</p>");
    $("#email").data("error", true);
    }
  }

  function removeInValidEmailAlert() {
    $("#inputErrorPar").remove();
    $("#email").data("error", false);
    $("#email").toggleClass("inputError");
  }

  // Collect values on inputs
  $("#fname").change(function() {
        fname = $("#fname").val();
        areValues();
  });

  $("#lname").change(function() {
        lname = $("#lname").val();
        areValues();
  });

  
  $("#email").change(function() {
        email = $("#email").val();
        let validEmail = validateEmail(email);
        if(validEmail === true) {
          areValues();
          removeInValidEmailAlert();
        }
        else if (email === ""){
          removeInValidEmailAlert();
        }
        else {
          inValidEmailAlert();
        }
  });
  
  $("#phone").change(function() {
        contactphone = $("#phone").val();
        let validPhone = phoneValidation(contactphone);
        if (validPhone === true) {
          areValues();
          removeInValidPhoneAlert();
        }
        else if (contactphone === "") {
          removeInValidPhoneAlert();
        }
        else {
          inValidPhoneAlert();
        }
  });
      
  $("#address").change(function() {
        address = $("#address").val();
        areValues();
  });

  $("#city").change(function() {
        city = $("#city").val();
        areValues();
  });

  $("#zip").change(function() {
        zip = $("#zip").val();
        areValues();
  });
  
  $("#state").change(function() {
        state = $("#state").val();
        areValues();
  });


  // New Application
  function Application(fname, lname, email, phone, address, city, zip, state) {
    this.firstname = fname;
    this.lastname = lname;
    this.email = email;
    this.contactphone = phone;
    this.address = address;
    this.city = city;
    this.zip = zip;
    this.state = state;
    this.source = "vetEdFund";
  }

  //Post new appliction
  const postApplication = function(application) {
    
    $.ajax({
        url: "http://localhost:3008/applications",
        type: "POST",
        data: application,
        success: function(results){
          console.log(results);
          if (results) {
            // redirect to success page
          }
        },
      })

  }

  // Create new application
  $("#submitAppBtn").on("click", function(e) {
      console.log(e);
      e.preventDefault();
      let fname = $("#fname").val();
      let mname = $("#mname").val();
      let lname = $("#lname").val();
      let email = $("#email").val();
      let phone = $("#phone").val();
      let address = $("#address").val();
      let city = $("#city").val();
      let zip = $("#zip").val();
      let state = $("#state").val();

      var application = new Application(fname, lname, email, phone, address, city, zip, state);
      postApplication(application);
      
  });

  // Change background color of header on scroll down
  $(window).scroll(function() {
      let header = $("#landingHeader");
      let navLinks = $("#landingNav ul li a")
      let applyBtn = $("#apply");
      scroll = $(window).scrollTop();

      if(scroll >= 100) {
          header.css("background", "rgba(255, 255, 255, .7)");
          applyBtn.css("background", "#E8C162");
          applyBtn.css("color", "#fff");
          navLinks.css("color", "#333");
      }
      else {
          header.css("background", "none");
          applyBtn.css("background", "none");
          applyBtn.css("color", "#E8C162");
          navLinks.css("color", "#fff");
      }
  })

  // Fade in content card on scroll down
  $(window).scroll(function() {
      let h1 = $("#copyHeading");
      let p = $("#copyPar");
      scroll = $(window).scrollTop();

      if(scroll >= 100) {
          h1.css("opacity", "1");
      }

      if(scroll >= 200) {
          p.css("opacity", "1")
      }
  });












});


