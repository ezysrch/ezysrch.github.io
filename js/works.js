
// Deal with prefixed APIs
window.AudioContext = window.AudioContext || window.webkitAudioContext;
navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;



						 
						 
					 
try {
    var audioContext = new AudioContext();
} catch (e) {
    console.log("Error initializing Web Audio");
}

var recorder;
// Callback once the user authorizes access to the microphone:
function startUserMedia(stream) {
    var input = audioContext.createMediaStreamSource(stream);
    recorder = new AudioRecorder(input);
    // We can, for instance, add a recognizer as consumer
    if (recognizer) recorder.consumers.push(recognizer);
 };

// Actually call getUserMedia
if (navigator.getUserMedia)
    navigator.getUserMedia({audio: true},
                           startUserMedia,
                           function(e) {console.log("No live audio input in this browser");}
                          );
else console.log("No web audio support in this browser");

   
   
   
   
   
  (function(window) {
    
    var AudioRecorder = function(source, cfg) {
	var consumers = [];
	var config = cfg || {};
	var errorCallback = config.errorCallback || function() {};
	var inputBufferLength = config.inputBufferLength || 4096;
	var outputBufferLength = config.outputBufferLength || 4000;
	var context = source.context;
	var node = context.createScriptProcessor(inputBufferLength);

	var recording = false;
	node.onaudioprocess = function(e) {
	    if (!recording) return;
	    worker.postMessage({
		command: 'record',
		buffer: [
		    e.inputBuffer.getChannelData(0),
		    e.inputBuffer.getChannelData(1)
		]
	    });
	};
	var start = function(data) {
	    consumers.forEach(function(consumer, y, z) {
                consumer.postMessage({ command: 'start', data: data });
		recording = true;
		return true;
	    });
	    recording = true;
	    return (this.consumers.length > 0);
	};
	
	
	this.stop = function() {
	    if (recording) {
		this.consumers.forEach(function(consumer, y, z) {
                    consumer.postMessage({ command: 'stop' });
		});
		recording = false;
	    }
	 //   worker.postMessage({ command: 'clear' });
	};
	
	
	
	
	var cancel = function() {
	    stop();
	};

	source.connect(node);
	node.connect(context.destination);
    };
    window.AudioRecorder = AudioRecorder;
})(window);