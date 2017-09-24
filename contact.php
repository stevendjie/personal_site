<?php

include('php/form_process.php');

?>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Contact Me | Steven's Personal Website & Blogs</title>
		<link rel="stylesheet" href="client/stylesheets/main.css" />
        <link href="https://fonts.googleapis.com/css?family=Cinzel" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet">

	</head>
	<body>
		
		<header class="primary-header container clearfix">
			<h1 class="logo"><a href="index.html">Steven's <br/> Personal Website <br> & Blogs</h1>
			<div class="nav-bar">
			<a href="about_me.html">
				<h3 class="title">The Chronicles of My Life</h3>
			</a>
			<nav class="nav primary-nav">
				<ul>
					<li><a href="index.html">Home</a></li>
					<li><a href="about_me.html">About Me</a></li>
					<li><a href="projects.html">Projects</a></li>
					<li><a href="stories.html">Stories</a></li>
					<li><a href="contact.php">Contact</a></li>
				</ul>
			</nav>
			</div>
		</header>

		<section class="row-alt">
			<div class="lead container">

				<h1>Send me an e-mail below!</h1><p class="quote"> (or directly to <strong>sadjie@edu.uwaterloo.ca</strong>)</p>

			</div>
		</section>

		<section class="row">
			<div class="grid">
				<section class="content">
					<div class="col-2-3" style="width:100%;">
						<div id="form">
							<!--<form action="<?= $_SERVER['PHP_SELF']; ?>" id="contact-form" method="post" autocomplete="off">-->
							<form  action="https://script.google.com/macros/s/AKfycbz41SxTUelQElVUZV1ZN3nP5tJmPKCwRiW3mLAdaTCay8vJ0bw/exec" id="contact-form" method="post" autocomplete="off">
								<div class="align-right">
									<span style="color: red;">*&nbsp;</span><strong>required field</strong>
								</div>
								<label>Name&nbsp;<span style="color: red;">*&nbsp;</span></label>
								<input type="text" name="name" class="name" placeholder="Enter your name" tabIndex = 1 required><br>
								<label>Email&nbsp;<span style="color: red;">*&nbsp;</span></label>
								<input type="text" name="email" class="email" placeholder="Enter your email" tabIndex = 2 required><br>
								<label>Message&nbsp;<span style="color: red;">*&nbsp;</span></label>
								<textarea name="message" class="message" placeholder="Enter your message" tabIndex = 3 required></textarea><br>

								<label id="captcha">
									<input type="button" onclick="getCaptcha();"/>

								</label>
								<input type="text" name="captcha" class="captcha" placeholder="Enter captcha code" tabIndex = 4 maxlength="4" size="4" required><br>

								<input type="submit" class="submit" name="submit" value="Send e-mail" tabIndex=5>

							</form>
							<div style="display:none;" id="thankyou_message">
								<h2>Message sent! Thanks for contacting me!</h2>
							</div>
						</div>
					</div>
				</section>
			</div>
		</section>

		<footer class="primary-footer container clearfix">

			<span>&copy Steven Djie &nbsp;</span>

			<nav class="nav">
				<ul>
					<li><a href="index.html">Home</a></li>
					<li><a href="about_me.html">About Me</a></li>
					<li><a href="tunes.html">Tunes</a></li>
					<li><a href="stories.html">Stories</a></li>
					<li><a href="contact.php">Contact</a></li>
				</ul>
			</nav>


		</footer>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script type="text/javascript" src="client/scripts/main.js"></script>
	<script data-cfasync="false" type="text/javascript"
src="client/scripts/form_process.js"></script>
	</body>
</html>