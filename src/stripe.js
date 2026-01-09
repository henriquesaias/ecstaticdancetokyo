const subscribe = async (subscriptionLength) => {
  const res = await fetch(
    `https://emi-stripe-subscriptions.goretuzk.workers.dev/subscribe-${subscriptionLength}`,
    { method: "POST" }
  );

  const data = await res.json();
  window.location.href = data;
}

export { subscribe };