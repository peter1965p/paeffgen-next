"use server";

export async function createModuleSubscription(moduleId: string, price: number) {
  // Hier kommt der Mollie API Aufruf rein
  const apiKey = process.env.MOLLIE_API_KEY;

  const response = await fetch('https://api.mollie.com/v2/payments', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: {
        currency: 'EUR',
        value: price.toFixed(2),
      },
      description: `SPECTORA Premium Modul: ${moduleId}`,
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/modulstore?success=true`,
      webhookUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/mollie`,
      metadata: { moduleId }
    }),
  });

  const payment = await response.json();
  return payment._links.checkout.href; // Der Link zum Bezahlen
}