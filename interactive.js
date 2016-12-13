	//upon loading
	//start playing the video when it finishes loading
	//update status and show remaining supplies


$(function(){
//localStorage.clear()
arr = ["media/contentdog.mp4", "media/exciteddog.mp4","media/saddog.mp4","media/maddog.mp4","media/celebvideo.mp4"]
	var launch = localStorage.getItem('day')
	
	function newday() {
			//$('.amount').html(0) //reset inventory to 0
			localStorage.setItem('c',JSON.stringify(0)) //test 100 supplies 
			localStorage.setItem('m',JSON.stringify(0))
			localStorage.setItem('e',JSON.stringify(0))	
			sundown = JSON.parse(localStorage.getItem('day'))
			sundown += 1
			localStorage.setItem('day',JSON.stringify(sundown)) //count number of days played
			console.log(sundown)
			localStorage.setItem('run',JSON.stringify('ran'))
			addmoney = JSON.parse(localStorage.getItem('money'))
			localStorage.setItem('money',JSON.stringify(addmoney+=10))//add 10 coins atop existing purse
			console.log(localStorage)
			localStorage.setItem('bought',JSON.stringify(false))
			
		}
	var day = localStorage.getItem('day')
	
	if (!launch){ //only reset pieces if it's the first day 
		localStorage.clear()
		console.log('start fresh')
		localStorage.setItem('day',JSON.stringify(1))
		localStorage.setItem('money',JSON.stringify(10))
		localStorage.setItem('c',JSON.stringify(0))
		localStorage.setItem('m',JSON.stringify(0))
		localStorage.setItem('e',JSON.stringify(0))
		localStorage.setItem('run',JSON.stringify('ran')) //set 'ran' if it's the first day
	}
	$('#title').html('Day' + ' ' + day)	

	

	session = 0; //keep track of total number of sessions
	moneylove = {"snacks":{"c":1,"m":1,"e":2},"food":{"c":2,"m":0,"e":1},"soap":{"c":2,"m":0,"e":0},"toys":{"c":2,"m":1,"e":2},"dinner":{"c":3,"m":2,"e":3}} //dog state

	currentTime = JSON.parse(localStorage.getItem('currently'))
	


	$('#care').attr('disabled',false);
	$('#Time').attr('style','display:none')
	buy = JSON.parse(localStorage.getItem('bought'))
	$('#store button').each(function(){ //retrieve values
		var values = JSON.parse(localStorage.getItem(this.id))

		if (!values || buy == false){ //if you haven't bought anything yet
			localStorage.setItem(this.id,0) //set to 0 if there are no values
		}
		var x = $('#'+this.id).prev().html(localStorage.getItem(this.id)) 
	})		

		//if reload
	if (currentTime>0){
		$('#care').attr('disabled',true);
		$('#Time').attr('style','display:block')
		$('#store button').attr('disabled',true)
		var num = JSON.parse(localStorage.getItem('dogvideo'))
		dogvideo(num)

	}

	$('#store button').click(function(){//set values
		var btn_name = $('#' + this.id)
		console.log(btn_name)
		var addinventory = btn_name.prev().html()
		plusone = parseInt(addinventory) + 1
		btn_name.prev().html(plusone)
		localStorage.setItem(this.id,JSON.stringify(plusone))
		moneyleft = JSON.parse(localStorage.getItem('money'))
		localStorage.setItem('money',JSON.stringify(moneyleft-1)) 
		$('#mula').html(moneyleft)
		for (state in moneylove[this.id]){
			stateadd = JSON.parse(localStorage.getItem(state))
			stateadd += moneylove[this.id][state]
			localStorage.setItem(state,JSON.stringify(stateadd))
		}
		if (moneyleft <= 0 ){
			console.log(moneyleft)
			$('#store button').attr('disabled',true)
			console.log('you are out of money')
		}
		console.log(localStorage)
	})

	function dogvideo (number){
		localStorage.setItem('dogvideo',JSON.stringify(number))
		console.log(number)
		vid = document.getElementById('video')
		vid.style.display="block"
		var elem = arr[number]  //returns a string
		$('#video').html('<source src = "' + elem + '" type="video/mp4">')
		$('#video').attr("loop","loop");
		$('#video').get(0).play()

	}



	//status = document.getElementById('status')
	$('button#care').click(function(){ //last step
		//statusupdate = $('#status')
		//console.log('care for juno')
		c = localStorage.getItem("c")
		m = localStorage.getItem("m")
		e = localStorage.getItem("e")
		//an array of videos
		
		localStorage.setItem('bought',JSON.stringify(true))
		
	//disappear the buttons

		if (m>=5){
			$('#status').text("watch out, juno's mad at the moment. don't get between him and his activities!");
			dogvideo(3)
		}
		else if (e>=10){
			console.log('run Juno excited video')
			$('#status').css('background-color','orange')
			$('#status').text("Juno's too excited to sleep, and he won't let you sleep either")
			dogvideo(1)
		}
		else if(c>=10){
			//run Juno content video
			numdays = localStorage.getItem("day")
			var content = JSON.parse(localStorage.getItem('content'))
			if (!content){
				localStorage.setItem('content', JSON.stringify(1))
			} else {
				localStorage.setItem('content',JSON.stringify(content + 1))
			}
			
			if (content == 6){
				$('#status').css('background-color','yellow')
				$('#status').text('congrats. Juno is your dog. Thanks for Playing!')
				dogvideo(4)
				//run celebration video
				//play again button?
			}
			else{
				console.log('working')
				var cont = JSON.parse(localStorage.getItem('content'))
				$('#status').css('background-color','green')
				$('#status').text('Keep Juno happy for ' + (6-cont).toString() + ' more days for your big surprise!')
				dogvideo(0)
			}
		}
		else {
			$('#status').text("Juno is sad because you didn't give him enough attention")
			dogvideo(2)
		}

		$('#care').attr('disabled',true)
		$('#store button').attr('disabled',true)
		$('#Time').attr('style','display:block')
	

	$('#status').attr('style','display:block')
	});

	moneyleft = JSON.parse(localStorage.getItem('money'))
	$('#mula').html(moneyleft)

	function getTimeRemaining(endtime){
	  var seconds = Math.floor( (endtime/1000) % 60 );
	  var minutes = Math.floor( (endtime/1000/60) % 60 );
	  var hours = Math.floor( (endtime/(1000*60*60)) % 24 );
	  var days = Math.floor( endtime/(1000*60*60*24) );
	  return { //sends this to the caller
	  	'total':endtime,
	    'hours': hours,
	    'minutes': minutes,
	    'seconds': seconds
	  };
	}
	$('#Time').click(function(){
		  var timeinterval = setInterval(function(){ //timecode stamp
		  	d1 = new Date() 
			var running = JSON.parse(localStorage.getItem('run'))
			console.log(running)
			if (running == 'ran'){
				d2 = new Date(d1)
				nextday = d2.setMinutes(d1.getMinutes()+1)
				console.log(nextday)
				localStorage.setItem('nextday',JSON.stringify(nextday))
				localStorage.setItem('run',JSON.stringify('')) //break the loop
			}
			nday = JSON.parse(localStorage.getItem('nextday'))
			
		  	seconds = nday - d1.getTime() //find seconds
		  	localStorage.setItem('currently',JSON.stringify(seconds))
		  	console.log(localStorage)
		    var t = getTimeRemaining(seconds);
		    $('#container').html(
		    '<div id="clockdiv">' + 
			  '<div>' + 
			    '<span class="hours"></span>' + 
			    '<div class="smalltext">Hours</div>' + 
			  '</div>' + 
			  '<div>' + 
			    '<span class="minutes"></span>' + 
			    '<div class="smalltext">Minutes</div>' +
			  '</div>' + 
			  '<div>' + 
			    '<span class="seconds"></span>' + 
			    '<div class="smalltext">Seconds</div>' + 
			  '</div>' + 
			'</div>' + '<br>' + '<button id="returnhome">Back to Store</button>'
				/*'hours: '+ t.hours + '<br>' +
				'minutes: ' + t.minutes + '<br>' +
				'seconds: ' + t.seconds + '<br>' + 
				
				*/
				)

		    var hours = $('span.hours')
		    var mins = $('span.minutes')
		    var seconds = $('span.seconds')

		    hours.html(t.hours)
		    mins.html(t.minutes)
		    seconds.html(t.seconds)


		    if(t.total<=0){

		    clearInterval(timeinterval);
		    newday()
		    console.log('newday')
		    hours.html(0)
		    mins.html(0)
		    seconds.html(0)
		    }
		  },1000);
	});

	$('#container').on('click', 'button#returnhome',function(){
		location.reload();
		console.log('loaded');

	})

		
})




