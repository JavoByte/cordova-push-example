var pushNotification;

function initNotifications(){
  pushNotification = window.plugins.pushNotification;

  if(device.platform == 'android' || device.platform == 'Android'){
    pushNotification.register(
      notificationRegisterSuccess,
      notificationRegisterError,
      {
        "senderID" : '455821482876',
        "ecb"      : 'onNotificationAndroid'
      }
    )
  }else{
    alert(device.platform)
  }
}

function notificationRegisterSuccess(result){
  alert('success' + result);
}

function notificationRegisterError(result){
  alert('error' + result);
}

function onNotificationAndroid(e){
  console.log('Notification received', e);

  switch (e.event) {
    case 'registered':
      var regid = e.regid;
      if(regid.length > 0){
        // Register device token
        window.localStorage.setItem('DEVICE_TOKEN', regid);
        $.post(app.webserver + app.registerPath, {'token' : regid, 'platform' : device.platform}, function(data){
          console.log('registration success');
        });
      }
      break;
    case 'message' :
      if(e.foreground){

      }else{

      }
      break;
    default:

  }
}
