export function parseMessages(instance) {
   if (!instance) return {};

   let message = '';
   let displayStatus = '';
   let btnColor;
   let disabled = false;

   if (instance.status === 'online') {
      displayStatus = 'Online';
      message = 'The user instance is ONLINE and ready to use.';
      btnColor = 'success';
   }

   if (instance.status === 'offline') {
      displayStatus = 'Offline';
      message = 'You need to turn on the instance to run the slots!'
      btnColor = 'warn';
   }

   if (instance.status === 'starting') {
      displayStatus = 'Starting Instance';
      message = 'Your instance is currently starting...';
      btnColor = 'disabled';
      disabled = true;
   }

   if (instance.status === 'starting-userstream') {
      displayStatus = 'Opening User Stream';
      message = 'User stream connection is currently opening...';
      btnColor = 'disabled';
      disabled = true;
   }

   if (instance.status === 'error') {
      displayStatus = 'Error Caught';
      message = 'Message here';
      disabled = true;
   }

   return {
      displayStatus,
      message,
      btnColor,
      disabled
   };
}

export async function switchPower(API, instance) {
   if (!instance) return;

   if (instance.status === 'online') {
      return await API.ajax.authPost('/user/instance-control', { action: 'shutdown' })
   }
   
   else if (instance.status === 'offline') {
      return await API.ajax.authPost('/user/instance-control', { action: 'start' })
   }
}
