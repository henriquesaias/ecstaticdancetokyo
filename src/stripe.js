const subscribe = async () => {
  const res = await fetch(
    "https://emi-stripe-subscriptions.goretuzk.workers.dev/create-checkout-session",
    { method: "POST" }
  );

  const data = await res.json();
  window.location.href = data;
}

export { subscribe };