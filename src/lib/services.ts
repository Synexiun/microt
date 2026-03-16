import { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "microblading",
    name: "Microblading",
    shortDescription:
      "Ultra-fine hair strokes for naturally full, perfectly shaped brows.",
    description:
      "Microblading is a semi-permanent cosmetic tattooing technique that creates the appearance of natural, fuller eyebrows. Using a specialized hand-held tool with ultra-fine needles, our artists deposit pigment into the upper layers of the skin, drawing individual hair-like strokes that blend seamlessly with your existing brow hair.\n\nAt Velvet Brow Studio, our microblading artists are trained in the latest techniques and use only premium pigments that are formulated to heal true to color. Each session begins with a detailed consultation where we analyze your facial structure, skin tone, and personal preferences to design brows that perfectly complement your features.\n\nThe result is a set of stunningly natural brows that frame your face beautifully, eliminating the need for daily brow makeup. Whether you have sparse brows, gaps, or simply want a more defined shape, microblading delivers effortless beauty that lasts 12 to 18 months.",
    duration: "2–2.5 hours",
    priceRange: "$388",
    touchUpPrice: "$100",
    image: "/images/custom/microblading.png",
    processSteps: [
      {
        title: "Consultation & Design",
        description:
          "We begin with an in-depth consultation to understand your desired look. Using precise measurements and mapping techniques, we design the perfect brow shape tailored to your facial structure.",
      },
      {
        title: "Color Matching",
        description:
          "Our artist selects a custom pigment blend that matches your natural brow color, hair tone, and skin undertone to ensure the most natural-looking result.",
      },
      {
        title: "Numbing & Preparation",
        description:
          "A topical numbing cream is applied to ensure your comfort throughout the procedure. The area is carefully prepped and sanitized.",
      },
      {
        title: "Microblading Procedure",
        description:
          "Using the hand-held tool, individual hair strokes are meticulously drawn following the natural growth pattern of your brows. This process takes approximately 1–1.5 hours.",
      },
      {
        title: "Aftercare Review",
        description:
          "We provide detailed aftercare instructions and a complimentary aftercare kit. A touch-up session is scheduled 6–7 weeks after your initial appointment.",
      },
    ],
    healingTimeline: [
      {
        day: "Days 1–3",
        description:
          "Brows will appear darker and bolder than the final result. Mild redness and tenderness around the area is normal. Avoid getting the area wet.",
      },
      {
        day: "Days 4–7",
        description:
          "Light flaking and itching may occur as the skin begins to heal. Do not pick or scratch the treated area. The color will appear to lighten significantly.",
      },
      {
        day: "Days 7–14",
        description:
          "The flaking subsides and brows may look patchy or lighter than expected. This is a normal part of the healing process as pigment settles into the skin.",
      },
      {
        day: "Days 14–28",
        description:
          "The true color begins to emerge as the skin fully heals. Brows will gradually darken and even out to reveal the final, beautiful result.",
      },
      {
        day: "Week 6–7",
        description:
          "Your touch-up appointment allows us to perfect the shape, fill any areas where pigment may not have retained, and adjust the color if needed.",
      },
    ],
    faqs: [
      {
        question: "How long does microblading last?",
        answer:
          "Microblading typically lasts 12 to 18 months, depending on your skin type, lifestyle, and aftercare routine. Annual touch-ups are recommended to maintain the crisp, fresh appearance of your brows.",
      },
      {
        question: "Is microblading painful?",
        answer:
          "Most clients describe the sensation as mild discomfort rather than pain. We apply a professional-grade topical numbing cream before and during the procedure to ensure maximum comfort throughout your session.",
      },
      {
        question: "Who is not a good candidate for microblading?",
        answer:
          "Microblading may not be suitable for those who are pregnant or nursing, have diabetes, are on blood thinners, have active skin conditions in the brow area, or have very oily skin (combo brows may be a better option).",
      },
      {
        question: "What is the difference between microblading and a brow tattoo?",
        answer:
          "Unlike traditional tattoos that go deep into the skin and use ink, microblading uses specialized pigment deposited into the upper dermis. The strokes mimic natural hair and the pigment fades naturally over time rather than turning blue or grey.",
      },
    ],
  },
  {
    slug: "ombre-powder-brows",
    name: "Ombre / Powder Brows",
    shortDescription:
      "Soft, powdery gradient brows that look like perfectly applied brow makeup — all day, every day.",
    description:
      "Ombre and Powder Brows is a semi-permanent technique that uses a digital machine to deposit tiny dots of pigment in a soft, gradient pattern across the brow. The result is a beautifully powdery, filled-in brow that mimics the look of professionally applied brow powder or pomade — without the daily effort.\n\nUnlike microblading, which uses manual strokes, the ombre powder technique works with the machine to create an even, dimensional finish that is especially flattering on oily, combination, or mature skin types. The gradient naturally fades from lighter at the front to more defined at the tail, giving a modern, polished look.\n\nAt Velvet Brow Studio, every ombre brow session begins with careful shape mapping and color consultation to design a brow that suits your facial structure and skin tone. Whether you want a subtle everyday look or a bolder defined arch, we customize the intensity to match your preference.",
    duration: "2–2.5 hours",
    priceRange: "$388",
    touchUpPrice: "$100",
    image: "/images/custom/phibrows.png",
    processSteps: [
      {
        title: "Shape Mapping & Consultation",
        description:
          "We design your ideal brow shape using precise measurement techniques, ensuring perfect symmetry. Together we determine the ideal intensity — from soft and natural to bold and defined.",
      },
      {
        title: "Pigment Selection",
        description:
          "A custom pigment blend is selected based on your natural hair color, skin undertone, and desired warmth or coolness of tone. Test swatches are applied to preview the healed color.",
      },
      {
        title: "Numbing Application",
        description:
          "A topical numbing cream is applied generously and given time to take full effect before any work begins. Additional numbing is applied as needed throughout the session.",
      },
      {
        title: "Ombre Powder Application",
        description:
          "Using a precise digital machine, pigment is deposited in a soft dotting motion starting light at the front and gradually building density toward the arch and tail. This creates the signature ombre gradient effect.",
      },
      {
        title: "Aftercare & Touch-Up Booking",
        description:
          "You receive a complete aftercare guide and healing kit. Your touch-up appointment is scheduled 6–7 weeks after your initial session to perfect the color and fill any uneven areas.",
      },
    ],
    healingTimeline: [
      {
        day: "Days 1–3",
        description:
          "Brows appear significantly darker and more filled-in than the final result. This is expected and temporary. The area may feel slightly tender. Apply aftercare ointment as directed.",
      },
      {
        day: "Days 4–7",
        description:
          "The treated area begins to flake and peel. The powder effect may look patchy during this phase. Do not pick at flakes as this can affect pigment retention.",
      },
      {
        day: "Days 8–14",
        description:
          "Brows enter the ghost phase where they appear very light or faded. This is completely normal as fresh skin forms over the pigment below the surface.",
      },
      {
        day: "Days 15–30",
        description:
          "Color gradually returns and the powder effect becomes visible again. The final shade and soft gradient begin to emerge as the skin fully settles.",
      },
      {
        day: "Week 6–7",
        description:
          "The touch-up appointment perfects the shape and color. Any areas needing additional pigment or shade adjustments are addressed during this session.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between ombre brows and microblading?",
        answer:
          "Microblading uses a manual blade to create individual hair-stroke impressions. Ombre Powder Brows use a digital machine to create a soft, pixelated powder effect. Ombre brows tend to last longer and retain better on oily or mature skin types.",
      },
      {
        question: "How long do Ombre / Powder Brows last?",
        answer:
          "Ombre Powder Brows typically last 18 to 24 months, often outlasting microblading. Oily skin types and those who spend a lot of time in the sun may need a refresh sooner. A touch-up every 1–2 years keeps them looking fresh.",
      },
      {
        question: "Will ombre brows look natural?",
        answer:
          "Absolutely. The powder effect is fully customizable — from barely-there softness to bold and defined. Most clients are surprised by how natural and blended the results look once fully healed. We work with your existing brow hair to create a seamless result.",
      },
      {
        question: "Is ombre powder suitable for oily skin?",
        answer:
          "Yes — in fact, ombre powder brows are especially recommended for oily or combination skin. The machine technique creates more lasting pigment retention compared to manual microblading on skin that produces more oil.",
      },
    ],
  },
  {
    slug: "combo-brows",
    name: "Combo Brows",
    shortDescription:
      "The best of both worlds — hair strokes combined with soft powder shading.",
    description:
      "Combo brows merge two techniques: microblading and powder ombre shading. The result is a beautifully dimensional brow that features realistic hair strokes at the front and a soft, powdery gradient through the body and tail of the brow.\n\nThis technique is ideal for clients who want the natural hair-stroke look of microblading with the added fullness and definition that powder shading provides. Combo brows work exceptionally well on all skin types, including oily skin where traditional microblading alone may not retain as crisply.\n\nAt Velvet Brow Studio, our combo brow artists excel at blending these two techniques seamlessly, creating a gradient effect that looks like perfectly applied brow makeup — except it stays on 24/7. Wake up every morning with flawless brows that require zero effort.",
    duration: "2.5–3 hours",
    priceRange: "$400",
    touchUpPrice: "$120",
    image: "/images/custom/combo-brows.png",
    processSteps: [
      {
        title: "Shape Design & Consultation",
        description:
          "We discuss your desired look and design the ideal shape using precise mapping techniques. Together, we determine the perfect balance of hair strokes and shading for your unique features.",
      },
      {
        title: "Custom Pigment Blending",
        description:
          "Pigments are custom-blended for both the hair-stroke and shading portions of the brow. Colors are selected to create a natural, dimensional gradient effect.",
      },
      {
        title: "Numbing & Skin Prep",
        description:
          "A topical numbing agent is applied for your comfort. The skin is prepared and sanitized to ensure optimal pigment retention and a smooth procedure.",
      },
      {
        title: "Hair Strokes & Shading",
        description:
          "Microbladed hair strokes are created at the front of the brow for a natural start, then seamlessly transitioned into soft powder shading through the body and tail for added fullness.",
      },
      {
        title: "Final Review & Aftercare",
        description:
          "The finished brows are reviewed and any final adjustments made. You receive comprehensive aftercare instructions and schedule your touch-up appointment for 6–7 weeks out.",
      },
    ],
    healingTimeline: [
      {
        day: "Days 1–3",
        description:
          "Brows will look bold, dark, and very defined — much darker than the healed result. Some redness and mild swelling is normal. Keep the area dry and apply aftercare ointment.",
      },
      {
        day: "Days 4–7",
        description:
          "Scabbing and flaking begins. The shaded areas may flake in larger patches than the hair-stroke areas. Do not pick or pull at any flakes. Let them shed naturally.",
      },
      {
        day: "Days 8–14",
        description:
          "Color appears significantly lighter as the skin heals over the pigment. Some areas may look patchy. This is the ghost phase and is completely temporary.",
      },
      {
        day: "Days 15–30",
        description:
          "The true color gradually re-emerges. Both the hair strokes and shading begin to look soft, natural, and beautifully blended as the skin completes its healing cycle.",
      },
      {
        day: "Week 6–7",
        description:
          "Touch-up appointment to perfect the results. Additional hair strokes or shading can be added, and color intensity can be adjusted to achieve your ideal look.",
      },
    ],
    faqs: [
      {
        question: "Who is a good candidate for combo brows?",
        answer:
          "Combo brows are excellent for almost everyone, but especially recommended for clients with oily or combination skin, those who want a fuller brow look, or anyone who loves the hair-stroke look but wants added dimension and longevity.",
      },
      {
        question: "Do combo brows last longer than microblading alone?",
        answer:
          "Yes, typically. The powder shading component tends to retain better over time, especially on oily skin. Combo brows generally last 18 to 24 months before a refresh is needed, compared to 12–18 months for microblading alone.",
      },
      {
        question: "Will combo brows look like heavy makeup?",
        answer:
          "Not at all. Our artists specialize in creating a soft, natural gradient that mimics the look of lightly applied brow powder. The effect is polished yet natural — like your best brow day, every day.",
      },
      {
        question: "How do I prepare for my combo brow appointment?",
        answer:
          "Avoid alcohol, caffeine, and blood-thinning medications 24 hours before your appointment. Do not wax or tint your brows for at least one week prior. Come with clean skin free of makeup in the brow area.",
      },
    ],
  },
  {
    slug: "lip-blush",
    name: "Lip Blush",
    shortDescription:
      "A subtle wash of color for naturally rosy, perfectly defined lips.",
    description:
      "Lip blush is a semi-permanent cosmetic tattoo that enhances the natural color, shape, and definition of your lips. This technique deposits a soft wash of pigment into the lips, creating a beautiful tinted effect that looks like you are always wearing your favorite lip color.\n\nThe lip blush technique at Velvet Brow Studio goes beyond simple color application. Our artists carefully correct asymmetries, define the lip border for a more polished appearance, and can even create the illusion of fuller lips through strategic shading and color placement. The result is effortlessly beautiful lips that look naturally flushed and youthful.\n\nWhether you want to correct uneven lip color, add definition to pale lips, restore color lost with age, or simply wake up with gorgeous lips every morning, lip blush is the perfect solution. Choose from a range of colors, from subtle nudes to rosy pinks to berry tones.",
    duration: "1.5–2 hours",
    priceRange: "$388",
    touchUpPrice: "$100",
    image: "/images/custom/lip-blush.png",
    processSteps: [
      {
        title: "Color Consultation",
        description:
          "We discuss your desired lip color and assess your natural lip tone, skin undertone, and lifestyle to select the perfect pigment shade. Test colors are applied to preview the result.",
      },
      {
        title: "Lip Design & Mapping",
        description:
          "Your lip shape is carefully outlined and any symmetry corrections are made. The design is drawn on and approved by you before any pigment is applied.",
      },
      {
        title: "Numbing Process",
        description:
          "A strong topical numbing cream is applied to the lips and given 20–30 minutes to take full effect. Additional numbing is applied throughout the procedure as needed for your comfort.",
      },
      {
        title: "Lip Blush Application",
        description:
          "Using a specialized machine, pigment is gently implanted into the lips in layers, building up from a soft base to the desired intensity. The color is blended for a natural gradient effect.",
      },
      {
        title: "Aftercare Instructions",
        description:
          "You receive a detailed aftercare guide and healing ointment. A touch-up session is booked for 6–7 weeks later to perfect the color and shape.",
      },
    ],
    healingTimeline: [
      {
        day: "Days 1–3",
        description:
          "Lips will appear very bright and saturated — up to 50% darker than the healed result. Swelling is normal, especially on day 2. Apply the provided healing balm frequently and stay hydrated.",
      },
      {
        day: "Days 4–7",
        description:
          "Lips begin to dry out, flake, and peel. The color will appear very uneven during this phase. Do not pick at the peeling skin. Keep lips moisturized with the aftercare balm.",
      },
      {
        day: "Days 7–14",
        description:
          "Most peeling is complete. Lips may look very light or like the color has disappeared entirely. This is temporary as the pigment is settling beneath the healed skin.",
      },
      {
        day: "Days 14–28",
        description:
          "The true lip blush color gradually emerges. Lips begin to look soft, natural, and beautifully tinted. The final result is typically 30–50% lighter than the initial application.",
      },
      {
        day: "Week 6–7",
        description:
          "Touch-up appointment to adjust the color intensity, perfect the shape, and add any additional pigment needed. This session is essential for achieving optimal, long-lasting results.",
      },
    ],
    faqs: [
      {
        question: "How long does lip blush last?",
        answer:
          "Lip blush typically lasts 2 to 3 years, making it one of the longer-lasting permanent makeup treatments. The longevity depends on your lip care habits, sun exposure, and lifestyle. A touch-up every 2–3 years maintains the vibrancy.",
      },
      {
        question: "Is lip blush painful?",
        answer:
          "The lips are a sensitive area, but our thorough numbing protocol ensures most clients experience only mild discomfort. Many clients describe it as a tingling or vibrating sensation. We continuously check your comfort level throughout the procedure.",
      },
      {
        question: "Can lip blush make my lips look bigger?",
        answer:
          "While lip blush does not physically change lip size, it can create the illusion of fuller lips. By slightly extending the color just to the edge of the vermillion border and using strategic shading, we can enhance the appearance of lip volume and definition.",
      },
      {
        question: "I get cold sores. Can I still get lip blush?",
        answer:
          "Yes, but you must take an antiviral medication (such as Valtrex) starting 3 days before your appointment and continuing for 3 days after. This helps prevent a cold sore outbreak that could affect the healing and pigment retention.",
      },
    ],
  },
  {
    slug: "eye-liner",
    name: "Eye Liner",
    shortDescription:
      "Effortlessly defined eyes with smudge-proof, wake-up-ready eyeliner.",
    description:
      "Permanent eyeliner is a semi-permanent cosmetic tattoo applied along the lash line to create the appearance of perfectly applied eyeliner that never smudges, smears, or fades throughout the day. This treatment is one of the most transformative permanent makeup procedures, instantly making eyes appear larger, more defined, and more awake.\n\nAt Velvet Brow Studio, we offer a range of permanent eyeliner styles to suit your preferences, from a subtle lash line enhancement that adds invisible fullness between the lashes to a thin classic line for everyday definition to a slightly thicker wing for a more dramatic look. Our artists work with you to choose the perfect style and thickness.\n\nPermanent eyeliner is perfect for anyone who wants to save time on their daily makeup routine, those with allergies to conventional eyeliner products, contact lens wearers who struggle with traditional liner, or anyone who wants smudge-proof definition around the clock.",
    duration: "~1.5 hours",
    priceRange: "$388",
    touchUpPrice: "$100",
    image: "/images/custom/permanent-eyeliner.png",
    processSteps: [
      {
        title: "Style Consultation",
        description:
          "We discuss your desired eyeliner style — lash enhancement, classic line, or soft wing. We consider your eye shape, lid space, and daily makeup preferences to recommend the most flattering approach.",
      },
      {
        title: "Design & Preview",
        description:
          "Using a removable cosmetic pencil, we draw the eyeliner design on your lids so you can see and approve the look before any permanent work begins.",
      },
      {
        title: "Numbing Application",
        description:
          "A specialized numbing cream formulated for the delicate eye area is applied and given adequate time to take effect. Your comfort and safety are our top priority.",
      },
      {
        title: "Eyeliner Application",
        description:
          "Using a precise digital machine, pigment is carefully deposited along the lash line. The procedure is performed with meticulous attention to symmetry and detail.",
      },
      {
        title: "Post-Care Guidance",
        description:
          "Detailed aftercare instructions are provided for the delicate eye area. A touch-up session is scheduled for 6–7 weeks later to perfect the line and ensure optimal pigment retention.",
      },
    ],
    healingTimeline: [
      {
        day: "Days 1–3",
        description:
          "Eyeliner will appear darker and thicker than the final result. Mild swelling of the eyelids is normal, especially on the first morning. Apply cold compresses and the provided aftercare gel.",
      },
      {
        day: "Days 4–7",
        description:
          "The treated area begins to flake and peel. The liner may appear spotty or uneven during this phase. Avoid rubbing your eyes and do not apply eye makeup to the area.",
      },
      {
        day: "Days 7–14",
        description:
          "Peeling is complete and the liner appears lighter than expected. The color is settling beneath the new skin layer and will gradually darken to its true shade.",
      },
      {
        day: "Days 14–28",
        description:
          "The healed color emerges — a soft, defined line that enhances your lash line beautifully. The final result is typically about 30% softer than the freshly applied look.",
      },
      {
        day: "Week 6–7",
        description:
          "Touch-up appointment to refine the line, adjust thickness if desired, and fill in any areas where pigment may not have retained evenly during initial healing.",
      },
    ],
    faqs: [
      {
        question: "Does permanent eyeliner hurt?",
        answer:
          "The eye area is sensitive, but our numbing protocol is very effective. Most clients experience a mild tickling or vibrating sensation. Some areas may feel more sensitive than others, and we adjust our technique and numbing throughout the procedure for your comfort.",
      },
      {
        question: "How long does permanent eyeliner last?",
        answer:
          "Permanent eyeliner typically lasts 2 to 5 years depending on the style, your skin type, and lifestyle factors. Lash line enhancements may fade sooner than thicker liner styles. Touch-ups every 1–2 years keep the liner looking fresh and defined.",
      },
      {
        question: "Can I wear contact lenses during the procedure?",
        answer:
          "Contact lenses must be removed before the procedure and should not be worn for at least 24–48 hours after treatment to allow the area to heal. Please bring your glasses to your appointment.",
      },
      {
        question: "What styles of permanent eyeliner do you offer?",
        answer:
          "We offer lash line enhancement (invisible fullness between lashes), classic thin line (subtle everyday definition), classic medium line (a more visible liner look), and soft wing style. During your consultation, we help you choose the style that best complements your eye shape and lifestyle.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug);
}
