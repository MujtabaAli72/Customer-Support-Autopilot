# backend/knowledge_base.py

FAQ_DATA = """
[
  {
    "topic": "Web Order Shipping",
    "question": "What shipping service do you use?",
    "answer": "We use DPD's Responsible Delivery - CO2 Neutral service. This is a tracked 24hr service for Mainland UK, and a tracked 48hr service for all other locations (however, please allow 3-5 working days). Brewery tour vouchers and Gift vouchers will be sent out as a 1st class Royal Mail letter."
  },
  {
    "topic": "Web Order Shipping",
    "question": "Do you offer local collection?",
    "answer": "We offer a free click and collect service from our Tap Room in our North residence. Just choose 'collect from brewery' at the checkout, and you'll be able to collect your order the next working day. Please wait for confirmation that your order is ready to collect before coming along."
  },
  {
    "topic": "Web Order Shipping",
    "question": "When can I pick up my Click and Collect order?",
    "answer": "You can now collect your online order any day of the week, Monday through Sunday. Please note that you need to have received the email confirming your order is ready for collection."
  },
  {
    "topic": "Web Order Shipping",
    "question": "How much is shipping?",
    "answer": "For Mainland UK orders under 60, a delivery charge of 35.99 will be applied. This charge is reflected at 14.99 for orders to the Highlands, Islands, and Northern Ireland. Orders over 60 are shipped free of charge. Gift cards and brewery tour vouchers are sent out free of charge via Royal Mail."
  },
  {
    "topic": "Web Order Shipping",
    "question": "How can I track my delivery?",
    "answer": "Once your order has shipped, you will receive an email from DPD with shipping details, and a link to track your parcel. Within this email, you will be given the option to change delivery details, add a safe place, or reschedule your delivery."
  },
  {
    "topic": "Web Order Shipping",
    "question": "Do you deliver overseas?",
    "answer": "We do not currently ship orders overseas."
  },
  {
    "topic": "General Order Queries",
    "question": "How can I get in touch about an order?",
    "answer": "You can get in touch with us by following this link: https://www.justanothersample.com/contact"
  },
  {
    "topic": "General Order Queries",
    "question": "Do you offer discounts for buying in bulk?",
    "answer": "We offer a discount when you buy a 12 pack of a specific beer. When adding to your basket, select the box labelled Buy More and Save for this discount to be applied."
  },
  {
    "topic": "General Order Queries",
    "question": "Can I add a gift message to my order?",
    "answer": "At the checkout page, check the box labeled 'tick to add gift message'. Here, you can enter a gift message of your choosing. We will print this message out and stick it directly inside the box, or for $1.95 extra we will stick the message inside a gift card to be included alongside the order."
  },
  {
    "topic": "General Order Queries",
    "question": "How can I make an amendment to an order I have placed?",
    "answer": "We will always try to accommodate changes to orders, when possible, but due to our 24hr delivery turnaround, our packing team will sometimes get to your order before we see your enquiry! Please email as soon as possible for the best chance of making a change to your order."
  },
  {
    "topic": "General Order Queries",
    "question": "How do I use a voucher code?",
    "answer": "You can use your voucher code at checkout, by entering it into the field titled 'Got a voucher/coupon code?'. Please note that we currently only allow the usage of one voucher code per order."
  },
  {
    "topic": "General Order Queries",
    "question": "Can I exchange an item in a mixed case?",
    "answer": "Unfortunately, not. We have an array of mixed cases with the aim to provide something for everyone, and cannot substitute beers within these cases. We do sell a blank gift box, which can be filled with four beers and a glass of your choosing – ideal for creating that perfect gift pack!"
  },
  {
    "topic": "General Order Queries",
    "question": "I am ordering for a friend; can I hide the cost of the order?",
    "answer": "We do not include a physical invoice in the box just a summary of the included contents. This is because the invoice is part of your email order confirmation. Your chosen recipient will never know how much you have spent on them."
  },
  {
    "topic": "General Order Queries",
    "question": "What do I do if my payment has been declined?",
    "answer": "Please double check that the billing address you are entering matches the one on your payment card. This can be sensitive, so please ensure the details are identical. As a next step, please contact your bank. If you have any further declined payments, you can get in touch with us at contact@justanothersample.com."
  },
  {
    "topic": "General Order Queries",
    "question": "What payment methods do you accept?",
    "answer": "We are currently accepting Visa, Mastercard, American Express, Apple Pay and Google Pay."
  },
  {
    "topic": "General Order Queries",
    "question": "Can I add multiple discount codes to my order?",
    "answer": "We are currently unable to allow multiple discount codes on orders. Please note that some mixed cases like our 'Mystery Box' will not accept discount codes due to their already significantly reduced price."
  },
  {
    "topic": "General Order Queries",
    "question": "Can you provide me with a VAT receipt?",
    "answer": "Our VAT number and registered company address is provided on the order confirmation you received to your email. If you require a more detailed VAT receipt, please get in touch with us directly at contact@justanothersample.com."
  },
  {
    "topic": "General Order Queries",
    "question": "There are some cans missing from my order. What do I do?",
    "answer": "We are sorry to hear you have been left thirsty. Please drop us an email being sure to include your order number and the items missing. We will get back to you as soon as possible to find a solution!"
  },
  {
    "topic": "General Order Queries",
    "question": "What should I do if my order has arrived damaged?",
    "answer": "We are very sorry to hear this. Please direct any report of major damage/leakage to contact@justanothersample.com, alongside clear photos of the damage."
  },
  {
    "topic": "General Order Queries",
    "question": "Only part of my order has arrived, what do I do?",
    "answer": "Sometimes, deliveries can become split in transit by our courier. We are unable to guarantee that orders containing multiple boxes will arrive together. If you have received only a partial order, please contact DPD in the first instance."
  },
  {
    "topic": "General Order Queries",
    "question": "Do you sell any Free From beers?",
    "answer": "Absolutely! We currently host three EU certified Gluten Free beers; Sam, Sammi and Sammua. As for vegan beers, a great majority of our brews do not contain lactose or any animal by-products."
  },
  {
    "topic": "General Order Queries",
    "question": "When will my favourite beer be returning?",
    "answer": "As is the nature of many craft beer brews, we can never guarantee the return or re-brewing of specific beers, though we do have our flagship core range, and regular returners such as Pastel Pils, Futurist and Pompelmocello."
  },
  {
    "topic": "General Order Queries",
    "question": "Are Sam, Sammi and Sammua really gluten free?",
    "answer": "Absolutely. All three beers are certified gluten free, and the level of gluten tests below the required levels within the EU legislation (under 20 parts per million)."
  },
  {
    "topic": "The Tap Yard",
    "question": "Are you dog friendly?",
    "answer": "We love all well-behaved dogs, and have water bowls and treats at the ready inside our Tap Room!"
  },
  {
    "topic": "The Tap Yard",
    "question": "Can I book at table down at the Tap Yard?",
    "answer": "Bookings are no longer required, but are advised for larger groups or for special seating requirements."
  },
  {
    "topic": "The Tap Yard",
    "question": "What growlers can I use to fill beer with?",
    "answer": "Aluminium and glass growlers are perfect. Please ensure that your growlers are clean upon bringing them to be filled."
  },
  {
    "topic": "The Tap Yard",
    "question": "Are you child friendly?",
    "answer": "Absolutely. We stock an array of soft drinks, and have two high chairs and a changing table available for use."
  },
  {
    "topic": "Tours, Events & Trade",
    "question": "How do I book a brewery tour?",
    "answer": "You can either purchase a physical brewery tour voucher from our web shop or Tap Room, or book online at https://www.justanothersample.com/visit-the-brewery/take-a-tour."
  },
  {
    "topic": "Tours, Events & Trade",
    "question": "When do you run brewery tours?",
    "answer": "We run our tours every Saturday, with a couple of time slot options available."
  }
]
"""