import { FAQ } from "../types"

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "How do I book a ticket for an event?",
    answer: "Booking a ticket is simple. Navigate to the event details page, click the 'Book Now' button, and follow the checkout process. You'll need to be logged into your account to complete a booking.",
    category: "Booking"
  },
  {
    id: "2",
    question: "Is registration free?",
    answer: "Creating an account on EventSphere is completely free. You only pay for tickets to paid events. There are also many free events available on the platform.",
    category: "General"
  },
  {
    id: "3",
    question: "Can I get a refund if I can't attend?",
    answer: "Refund policies vary by event and are set by the individual organizers. Please check the specific event's details page for their cancellation and refund policy.",
    category: "Payments"
  },
  {
    id: "4",
    question: "How do I contact support?",
    answer: "You can reach our support team through the Contact Us page, by emailing support@eventsphere.com, or by calling our hotline during business hours.",
    category: "Support"
  },
  {
    id: "5",
    question: "Do I need to print my ticket?",
    answer: "No, printing is not required. You can show the digital ticket on your mobile device through the EventSphere app or your email confirmation at the venue.",
    category: "Booking"
  },
  {
    id: "6",
    question: "How do I host my own event?",
    answer: "Once logged in, click on 'Create Event' from your dashboard. Fill out the event details, choose your ticketing options, and publish your event to make it visible to attendees.",
    category: "Hosting"
  },
  {
    id: "7",
    question: "Are my payment details secure?",
    answer: "Yes, we use industry-standard encryption and partner with secure payment gateways (like Stripe) to ensure your financial information is always protected.",
    category: "Payments"
  },
  {
    id: "8",
    question: "Can I transfer my ticket to someone else?",
    answer: "Ticket transferability depends on the organizer's settings. If allowed, you can transfer your ticket to another email address from your user dashboard under 'My Bookings'.",
    category: "Booking"
  }
]
