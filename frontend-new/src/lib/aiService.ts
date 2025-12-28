// src/lib/aiService.ts

// This simulates an AI Response. 
// In the future, you can replace this logic with an OpenAI/Gemini API call.

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  const lowerMsg = userMessage.toLowerCase();

  // Simulate network delay for realism
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 1. GREETINGS
  if (lowerMsg.match(/\b(hi|hello|hey|greetings)\b/)) {
    return "Hello! Welcome to Support AutoPilot. How can I assist you with your tickets or account today?";
  }

  // 2. PASSWORD & ACCOUNT ISSUES
  if (lowerMsg.includes("password") || lowerMsg.includes("reset")) {
    return "To reset your password, please go to the 'Settings' tab in the sidebar and select 'Security'. detailed instructions have been sent to your email.";
  }
  if (lowerMsg.includes("login") || lowerMsg.includes("sign in")) {
    return "If you are having trouble logging in, ensure your email format is correct. You can also contact admin@support.com for manual account recovery.";
  }

  // 3. TICKET SUPPORT
  if (lowerMsg.includes("ticket") || lowerMsg.includes("status")) {
    return "You can check the status of your support tickets in the 'Tickets' section. Currently, our average response time is 2 hours.";
  }
  if (lowerMsg.includes("create") || lowerMsg.includes("new")) {
    return "To create a new ticket, navigate to the 'Tickets' page and click the '+ New Ticket' button at the top right.";
  }

  // 4. PRICING & BILLING
  if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("bill")) {
    return "We offer three tiers: Starter ($29/mo), Pro ($99/mo), and Enterprise. You can view your current invoices in the 'Settings' > 'Billing' section.";
  }

  // 5. HUMAN HANDOFF
  if (lowerMsg.includes("human") || lowerMsg.includes("agent") || lowerMsg.includes("person")) {
    return "I have flagged this conversation. A human agent will take over shortly. Your estimated wait time is 5 minutes.";
  }

  // 6. FALLBACK (Context Awareness)
  return "I understand you're asking about '" + userMessage + "'. Could you please provide more details? I can help with Tickets, Account Settings, and Billing.";
};