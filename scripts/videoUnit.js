var video, videoTrackingModule, videoButtonArray, videoButton,
	videoArray = ['videos/video.mp4'],
	videoIndex = 1, videoPlaying = false, i;


		

	
function initVideo() {
    //Build Version tracking 
    mmbuildVersion.file = "09122015 videoUnit";
    if (mmbuildVersion.test == true) console.log("Build: " + mmbuildVersion.build + " " + mmbuildVersion.file);

    //Initialise video	
	video 					= document.getElementById("video");
    videoTrackingModule     = new EBG.VideoModule(video);
		
    ///////////////////////////////////custom pause code/////////////////////////////////////      
       
    video.safe = false;
    videoTrackingModule._pauseHandler = function() {
        if (!video.safe) {
            try {
                //Original Pause tracking, enabled when the video does not need to be protected: !video.safe
                EB.stopVideoTimer(this._assetName, this._fullScreen); 
                var pauseInteraction = this._fullScreen ? EBG.VideoInteraction.FULLSCREEN_PAUSE : EBG.VideoInteraction.PAUSE;
                if (!this._ended && this._started) {
                    // When playback reaches 100% and stops browser fires "pause" event
                    EB.videoInteraction(pauseInteraction, this._assetName);
                }
            } catch (e) {
                EBG.log.exception("_pauseHandler", e);
            }

            EBG.log.endGroup();
        } else {
            try {
                //Edited Pause tracking, used when the video needs to be protected: video.safe=true;
                EB.stopVideoTimer(this._assetName, this._fullScreen);
            } catch (e) {
                EBG.log.exception("_pauseHandler", e);
            }
            EBG.log.endGroup();
        }

       //After the pause has been handled, returns the video protection status back to unprotected: video.safe=false;
      video.safe = false;
   };
	
	videoContainer.style.visibility = "visible";	
	
	video.addEventListener('ended', videoHandler, false);
	
	//videoButtonArray = [unmuteButton, videoReplayButton, videoContainer];
    videoButtonArray = [videoContainer];
	for (i = 0; i < videoButtonArray.length; i++) {
		videoButton = videoButtonArray[i];
		videoButton.addEventListener("mouseover", videoButtonHandler, false);	
		videoButton.addEventListener("mouseout", videoButtonHandler, false);	
		videoButton.addEventListener("click", videoButtonHandler, false);
	}

    //TweenMax.to(videoCover, 0, {autoAlpha:1, ease:Quad.easeInOut, overwrite:false});
    //TweenMax.to([videoReplayButton, videoEndFrame], 0, {autoAlpha:0, ease:Quad.easeInOut, overwrite:false});
}

function initVideo2() {
    //Build Version tracking 
    mmbuildVersion.file = "09122015 videoUnit";
    if (mmbuildVersion.test == true) console.log("Build: " + mmbuildVersion.build + " " + mmbuildVersion.file);

    //Initialise video	
	video2 					= document.getElementById("video2");
    videoTrackingModule2     = new EBG.VideoModule(video2);
		
    ///////////////////////////////////custom pause code/////////////////////////////////////      
       
    video2.safe = false;
    videoTrackingModule2._pauseHandler = function() {
        if (!video2.safe) {
            try {
                //Original Pause tracking, enabled when the video does not need to be protected: !video.safe
                EB.stopVideoTimer(this._assetName, this._fullScreen); 
                var pauseInteraction = this._fullScreen ? EBG.VideoInteraction.FULLSCREEN_PAUSE : EBG.VideoInteraction.PAUSE;
                if (!this._ended && this._started) {
                    // When playback reaches 100% and stops browser fires "pause" event
                    EB.videoInteraction(pauseInteraction, this._assetName);
                }
            } catch (e) {
                EBG.log.exception("_pauseHandler", e);
            }

            EBG.log.endGroup();
        } else {
            try {
                //Edited Pause tracking, used when the video needs to be protected: video.safe=true;
                EB.stopVideoTimer(this._assetName, this._fullScreen);
            } catch (e) {
                EBG.log.exception("_pauseHandler", e);
            }
            EBG.log.endGroup();
        }

       //After the pause has been handled, returns the video protection status back to unprotected: video.safe=false;
      video2.safe = false;
   };
	
	//videoContainer2.style.visibility = "visible";	
	
	video2.addEventListener('ended', videoHandler, false);
	
	//videoButtonArray2 = [unmuteButton, videoReplayButton, videoContainer];
   // videoButtonArray2 = [videoContainer];
	/*for (i = 0; i < videoButtonArray.length; i++) {
		videoButton = videoButtonArray[i];
		videoButton.addEventListener("mouseover", videoButtonHandler, false);	
		videoButton.addEventListener("mouseout", videoButtonHandler, false);	
		videoButton.addEventListener("click", videoButtonHandler, false);
	}
*/
    //TweenMax.to(videoCover, 0, {autoAlpha:1, ease:Quad.easeInOut, overwrite:false});
    //TweenMax.to([videoReplayButton, videoEndFrame], 0, {autoAlpha:0, ease:Quad.easeInOut, overwrite:false});
}


function playMutedVideo($videoID) {
	videoIndex = $videoID;
	
	TweenMax.to(videoCover, 0.5, {autoAlpha:0, ease:Quad.easeInOut, overwrite:false});
	
	console.log("play muted video");
	
	video.setAttribute("src", 'videos/'+ videoIndex+ '.mp4');
	video.muted = true;
	video.load();
    video.play();
	videoPlaying = true;
	
	EB.automaticEventCounter("auto_play_video");
}



function playVideo($videoID) {
	videoIndex = $videoID;
    
    video.setAttribute("controls", "controls");
    //TweenMax.to([videoReplayButton, videoEndFrame, unmuteButton], 0, {autoAlpha:0, ease:Quad.easeInOut, overwrite:false});
	
	console.log(videoIndex);
	video.muted = false;
	video.setAttribute("src", 'videos/'+ videoIndex+ '_video.mp4');
	video.load();
    video.play();
	videoPlaying = true;
	
	EB.userActionCounter("vid_user_play_video");
    
    //togg/leVideoHandler(false);
}

function playVideo2($videoID) {
	videoIndex = $videoID;
    
    video2.setAttribute("controls", "controls");
    //TweenMax.to([videoReplayButton, videoEndFrame, unmuteButton], 0, {autoAlpha:0, ease:Quad.easeInOut, overwrite:false});
	
	console.log("play video2");
	video2.muted = false;
	video2.setAttribute("src", videoIndex);
	video2.load();
    video2.play();
	videoPlaying2 = true;
	
	EB.userActionCounter("vid_user_play_tvc");
    
    //togg/leVideoHandler(false);
}

function stopVideo() {
   
	if (videoPlaying || video) {
	   	//Amended clickthrough, will pause using the safe pausehandling method
		video.safe = true;
		 console.log('stopVid')
		if (video) video.pause();
		
		setTimeout(function() {
            //The unprotected status change after the pause handler does not always work, so applied the unprotected status again after a short wait
            video.safe = false;
		}, 100); 
		
		videoPlaying = false;
	}
}
function stopVideo2() {
	if (videoPlaying2 || video2) {
	   	//Amended clickthrough, will pause using the safe pausehandling method
		video2.safe = true;
		
		if (video2) video2.pause();
		
		setTimeout(function() {
            //The unprotected status change after the pause handler does not always work, so applied the unprotected status again after a short wait
            video2.safe = false;
		}, 100); 
		
		videoPlaying2 = false;
	}
}



function videoHandler($e) {
	type = $e.type;
	
	switch (type) {
		case "ended":
			console.log("video complete");
            
            //TweenMax.to(videoReplayButton, 0.5, {autoAlpha:0.8, ease:Quad.easeInOut, overwrite:false});
           // TweenMax.to(videoEndFrame, 0.5, {autoAlpha:1, ease:Quad.easeInOut, overwrite:false});
            //TweenMax.to(unmuteButton, 0.3, {autoAlpha:0, ease:Quad.easeInOut, overwrite:false});
            toggleVideoHandler(true);
			videoPlaying = false;
			break;	
	}
}



function toggleVideoHandler($mode) {
    switch ($mode) {
        case true:
            videoContainer.addEventListener("mousemove", videoButtonHandler, false);
            videoContainer.addEventListener("mouseover", videoButtonHandler, false);
            videoContainer.addEventListener("mouseout", videoButtonHandler, false);
            videoContainer.addEventListener("click", videoButtonHandler, false);
            break;
            
        case false:
            videoContainer.removeEventListener("mouseover", videoButtonHandler, false);
            videoContainer.removeEventListener("mousemove", videoButtonHandler, false);
            videoContainer.removeEventListener("mouseout", videoButtonHandler, false);
            videoContainer.removeEventListener("click", videoButtonHandler, false);
            break;
    }
}



function videoButtonHandler($e) {	
	videoButton 	= $e.currentTarget;
	type			= $e.type;
	
	switch (videoButton) {            
		/*case unmuteButton:
			if (type == "mouseover")			{ TweenMax.to(videoButton, 0, {alpha:1, ease:Quad.easeInOut, overwrite:false}); }
			else if (type == "mouseout")		{ TweenMax.to(videoButton, 0, {alpha:0.8, ease:Quad.easeInOut, overwrite:false}); }
			else if (type == "click")			{ 
                                                    TweenMax.to(unmuteButton, 0, {autoAlpha:0, overwrite:false});
													playVideo(videoIndex);
												}
			break;
            
		case videoReplayButton:
		case videoContainer:
			if (type == "mouseover")			{ TweenMax.to(videoReplayButton, 0, {alpha:1, ease:Quad.easeInOut, overwrite:false}); }
			else if (type == "mouseout")		{ TweenMax.to(videoReplayButton, 0, {alpha:0.8, ease:Quad.easeInOut, overwrite:false}); }
			else if (type == "click")			{ 
                                                    TweenMax.to([videoReplayButton, videoEndFrame], 0, {autoAlpha:0, overwrite:false});
                                                    playVideo(videoIndex);
												}
			break;*/
	}
}