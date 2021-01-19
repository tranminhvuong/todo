const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);

$( '#webcam-app' ).on('shown.bs.modal', function(){
  $('.md-modal').addClass('md-show');
  webcam.flip();
  webcam.start()
    .then(result =>{
      cameraStarted();
      console.log('webcam started');
    })
    .catch(err => {
      displayError();
    });
});

$('#webcam-app').on('hidden.bs.modal', function () {
  cameraStopped();
  webcam.stop();
  console.log('webcam stopped');
})

function displayError(err = ''){
  if(err!=''){
    $('#errorMsg').html(err);
  }
  $('#errorMsg').removeClass('d-none');
}

function cameraStarted(){
  $('#errorMsg').addClass('d-none');
  $('.flash').hide();
  $('#webcam-control').removeClass('webcam-off');
  $('#webcam-control').addClass('webcam-on');
  $('.webcam-container').removeClass('d-none');
  if( webcam.webcamList.length > 1){
      $('#cameraFlip').removeClass('d-none');
  }
  $('#wpfront-scroll-top-container').addClass('d-none');
  window.scrollTo(0, 0); 
  $('body').css('overflow-y','hidden');
}

function cameraStopped(){
  $('#errorMsg').addClass('d-none');
  $('#wpfront-scroll-top-container').removeClass('d-none');
  $('#webcam-control').removeClass('webcam-on');
  $('#webcam-control').addClass('webcam-off');
  $('#cameraFlip').addClass('d-none');
  $('.webcam-container').addClass('d-none');
  $('.md-modal').removeClass('md-show');
}


$('#take-photo').click(function () {
  beforeTakePhoto();
  let picture = webcam.snap();
  // document.querySelector('#download-photo').href = picture;
  afterTakePhoto();
});

function beforeTakePhoto(){
  $('.flash')
      .show() 
      .animate({opacity: 0.3}, 500) 
      .fadeOut(500)
      .css({'opacity': 0.7});
  window.scrollTo(0, 0); 
  $('#webcam-control').addClass('d-none');
  $('#cameraControls').addClass('d-none');
}

function afterTakePhoto(){
  webcam.stop();
  $('#canvas').removeClass('d-none');
  $('#take-photo').addClass('d-none');
  $('#exit-app').removeClass('d-none');
  $('#download-photo').removeClass('d-none');
  $('#resume-camera').removeClass('d-none');
  $('#cameraControls').removeClass('d-none');
}

function removeCapture(){
  $('#canvas').addClass('d-none');
  $('#webcam-control').removeClass('d-none');
  $('#cameraControls').removeClass('d-none');
  $('#take-photo').removeClass('d-none');
  $('#exit-app').addClass('d-none');
  $('#download-photo').addClass('d-none');
  $('#resume-camera').addClass('d-none');
}

$('#resume-camera').click(function () {
  webcam.stream()
    .then(facingMode =>{
      removeCapture();
    });
});

$('#exit-app').click(function () {
  removeCapture();
  $('#webcam-app').modal('hide');
});

$('#download-photo').click(function (){
  var dataIMG= $('#canvas')[0].toDataURL();
  dataUrl = dataIMG.split(',')[1];
  var bound = "========";
  var meta = {
    "name": "hello world.png",
    "type": "anyone",
    "role": "reader",
    "parents": ['1xuUeRF9CpEik1g6NFoPT77PiZTq5iBAF'],
    "mimeType": "image/png",
    "description": "This image is created by canvas"
  };
  var accessToken = 'ya29.a0AfH6SMD_PSJb7by52UeSwNjglNUzmAIb2WOSnn0qdPMB2OInPV3oZX-vyPdWlXkunJRdqmuJKJM1Z49kT1BmBu3ehoVhEzcqX5SaxScHz6XONy5LS8C5aBA9aKJNaHdDlzt1bojVP7mdE5FMEpy6-uKlpfETJGNnzl8oysuyU5M';
  var multiparts = [];
  multiparts.push('--' + bound);
  multiparts.push('Content-Type: application/json');
  multiparts.push('');
  multiparts.push(JSON.stringify(meta));
  multiparts.push('--' + bound);
  multiparts.push('Content-Type: image/png');
  multiparts.push('Content-Transfer-Encoding: base64');
  multiparts.push('');
  multiparts.push(dataUrl);
  multiparts.push('--' + bound + '--');
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", true);
  xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
  xhr.setRequestHeader("Content-Type", "multipart/mixed; boundary=" + bound);
  xhr.onload = function(e){
    var e = JSON.parse(xhr.responseText);
    if (e.error) {
      removeCapture();
      $('#webcam-app').modal('hide');
      alert('Too Long time. Please reload page');
    } else {
      $('#img-ava').attr("src", dataIMG);
      removeCapture();
      $('#webcam-app').modal('hide');
      var gglink = 'https://drive.google.com/file/d/';
      axios.post('/api/user/upload_avatar', {
        avatar_url: gglink + e.id + '/view'
      });
    }
  };
  xhr.send(multiparts.join("\r\n"));
});
