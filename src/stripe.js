import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_live_51LidycLkbVO6UUDrArSmM2T5QsKfJz3wv522dxoGBhYy3JqWq2YT5T1sNfxFan8dQjDByt5SdGsOF83s0JQ9xV8W00w4hiad96");

async function subscribe() {
  const res = await fetch(
    "https://emi-stripe-subscriptions.goretuzk.workers.dev/webhook",
    { method: "POST" }
  );

  const { url } = await res.json();
  window.location.href = url;
}

export { subscribe };