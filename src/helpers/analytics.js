export default class Analytics {
   static cleanEventParams(params = {}) {
      return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== null));
   }

   static trackGoogleEvent(eventName, params = {}) {
      if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
         return;
      }
      
      window.gtag('event', eventName, params);
   }

   static trackSignUp({ method = 'email', ...customParams } = {}) {
      this.trackGoogleEvent('sign_up', this.cleanEventParams({ method, ...customParams }));
   }
   
   static trackLogin({ method = 'email', ...customParams } = {}) {
      this.trackGoogleEvent('login', this.cleanEventParams({ method, ...customParams }));
   }
   
   static trackEmailConfirmation({ email, ...customParams } = {}) {
      this.trackGoogleEvent('email_confirmation', this.cleanEventParams({ email, ...customParams }));
   }

   static trackSelectedPlan({ plan, priceApplied, interval, couponCode, ...customParams } = {}) {
      this.trackGoogleEvent('selected_plan', this.cleanEventParams({ plan, priceApplied, interval, couponCode, ...customParams }));
   }
   
   static trackSubscriptionStart({ plan, priceApplied, ...customParams } = {}) {
      this.trackGoogleEvent('subscription_start', this.cleanEventParams({ plan, priceApplied, ...customParams }));
   }
   
   static trackSubscription({ plan, priceApplied, ...customParams } = {}) {
      this.trackGoogleEvent('subscription', this.cleanEventParams({ plan, priceApplied, ...customParams }));
   }
}
