'use strict';

//generate captcha code for forms
function getCaptcha(){

	//generate random integers from 0 to 9 inclusive
	var str_num1 = (Math.floor(Math.random() * 10)).toString();
	var str_num2 = (Math.floor(Math.random() * 10)).toString();
	var str_num3 = (Math.floor(Math.random() * 10)).toString();
	var str_num4 = (Math.floor(Math.random() * 10)).toString();

	var captcha_code = str_num1 + str_num2 + str_num3 + str_num4; //concatenate strings

	//remove the current captcha
	$("#captcha label").remove();

	//insert a new captcha as first child
	$("#captcha").prepend("<label id='code'>" + captcha_code + "</label>");

	
}

$(function() {

	//configuration
	var width = 500;
	var animationSpeed = 1000;
	var pause = 2000;
	var currSlide = 0;

	//cache DOM (for speed)
	var $autoSlider = $('#auto-slider');
	var $slideContainer = $autoSlider.find('.slides');
	var $slides = $slideContainer.find('.slide');
	

	var interval;
	var currSlide = 0;
	//set interval
	function startSlider() {
		interval = setInterval(function() {
			//animate margin-left
			if (currSlide !== $slides.length - 1){
				$slideContainer.animate({'margin-left':'-='+width}, animationSpeed, function(){			
					currSlide++;
				});
			} else {
				currSlide = 0;
				$slideContainer.css('margin-left', 0);
			}

		}, pause);

	}

	function stopSlider() {
		clearInterval(interval);
	}

	//listen for mouse-enter and stop, resume when mouse leaves
	$autoSlider.mouseenter(stopSlider).mouseleave(startSlider); //mouseenter/leave is the Event, start/stopSlider is the Event Handler
	startSlider();

	var $manualSlides = $("#manual-slider .slide");
	$manualSlides.first().addClass("active");//add 'active' class to the first image
	$manualSlides.hide();//hide all images
	$(".active").show();//show active image

	$("#button-next").on("click", function() {//when 'next' button is clicked
		var $oldActive = $(".active");
		$oldActive.removeClass("active");
		if ($oldActive.is(":last-child")){
			$manualSlides.first().addClass("active");
		}
		else{
			$oldActive.next().addClass("active");
		}
		
		$manualSlides.fadeOut(500);
		$("#manual-slider .active").fadeIn(500);

	});
	$("#button-prev").on("click", function() {
		var $oldActive = $(".active");
		$oldActive.removeClass("active");
		if ($oldActive.is(":first-child")) {
			$manualSlides.last().addClass("active");

		} else {
			$oldActive.prev().addClass("active");
			
		}


		$manualSlides.fadeOut(500);
		$("#manual-slider .active").fadeIn(500);

	})



	$('.tab-panels .tabs li').on("click", function() {

		$('.tab-panels .tabs li.active').removeClass('active');

		$(this).addClass('active');

		//figure out which panel to show
		var panelToShow = $(this).attr('rel');//get the rel attribute

		//hide current panel
		$('.tab-panels .panel.active').slideUp(300, showNextPanel);

		//show new panel
		function showNextPanel() {
			$(this).removeClass('active');
			$('#'+panelToShow).slideDown(300, function() { //find the id of the panel to show
				$(this).addClass('active');
			});
		}
	});

	//blogging show/hide functionality
	$(".panel-header button").on("click", function() {
		var $this = $(this);

		var buttonText = ($this.text() === "Show") ? "Hide" : "Show";

		$this.text(buttonText).parent().next(".panel").slideToggle();
		
	});


	//contact form
	getCaptcha();//when the page first loads

	/*$('#submit').click(function() {
		//configuration of error messages
		var captcha_error = "Wrong captcha. Try again."
		var email_error = "Invalid email. Try again."
		var name_error = "Invalid name. Try again."
		var message_error = "Message too short. Try again."

		var errors_queue = [];
		//name validation
		var $name = $(".name");
		var name_pattern = /^([a-zA-Z0-9])+$/
		var name_text = $name.val();
		if (name_text == "")  $name.addClass("error");
		else if (!name_pattern.test(name_text)){
			$name.css({
			"color":"#b9353f", "font-weight":"bold"});
			errors_queue.push(name_error);
		}

		//email validation/^([A-Za-z0-9_\-\.]){1,}\@([A-Za-z0-9_\-\.]){1,}\.([A-Za-z]{2,4})$/
		var $email = $(".email");
		var email_pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,10})+$/;//regex
		var email_text = $email.val();
		if (email_text == "")  $email.addClass("error");
		else if (!email_pattern.test(email_text)){
			$email.css({
			"color":"#b9353f", "font-weight":"bold"});
			errors_queue.push(email_error);
		}

		//message validation
		var $message = $(".message");
		if ($message.val().length <= 2){
			if ($message.val().length == 0) $message.addClass("error");
			else{ 
				$message.css({
				"color":"#b9353f", "font-weight":"bold"});
				errors_queue.push(message_error);
			}

		}


		//captcha validation
		var $captcha = $(".captcha");
		var captcha_value = $("#code").text();
		var captcha_submitted = $captcha.val();
		if (captcha_submitted == "")  $captcha.addClass("error");
		else if (captcha_value != captcha_submitted){
			$captcha.css({
			"color":"#b9353f", "font-weight":"bold"});
			errors_queue.push(captcha_error);
		}
		if (!(captcha_value == captcha_submitted) || !(email_pattern.test(email_text))
		 || !(name_pattern.test(name_text)) || ($message.val().length < 2)){
			alert(errors_queue.shift());//dequeue
			return false;
		}

/*
		
		if ((captcha_value == captcha_submitted) && (email_pattern.test(email_text))
		 && (name_pattern.test(name_text)) && ($message.val().length >= 2)){
		 	$("#contact-form").css("display", "none");
            $("#form").append("<h2>Message sent!</h2>");
            return true;
      		
      	} else {
      		alert(errors_queue.shift());//dequeue
      	}

      	return false;
		

	});*/





		
});


