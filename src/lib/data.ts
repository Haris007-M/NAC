import type { Product, Post, Review } from './types';

export const PRODUCTS: Product[] = [
 {
  "id": "anua-heartleaf-foam",
  "slug": "anua-heartleaf-foam",
  "name": "Heartleaf Quercetinol Pore Deep Cleansing Foam",
  "brand": "Anua",
  "category": "Cleanser",
  "size": "150 ml",
  "price": 16,
  "compareAt": 19,
  "rating": 4.8,
  "reviews": 2140,
  "skinTypes": [
   "Oily",
   "Combination"
  ],
  "concerns": [
   "Pores",
   "Oil control"
  ],
  "bestFor": "Oily, combination and pore-congested skin",
  "tag": "Best seller",
  "description": "A low-irritation foaming cleanser with heartleaf and quercetinol that lifts sebum and clears congested pores without leaving skin tight.",
  "howToUse": "Lather a small amount with water, massage over damp skin for 30\u201360 seconds, rinse well. AM and PM.",
  "ingredients": "Houttuynia cordata (heartleaf) extract, quercetinol, BHA, glycerin, mild amino-acid surfactants.",
  "image": "/img/anua-heartleaf-foam.webp"
 },
 {
  "id": "skinever-cleanser",
  "slug": "skinever-cleanser",
  "name": "Daily Treatment Face Wash",
  "brand": "SKINEVER",
  "category": "Cleanser",
  "size": "150 ml",
  "price": 14,
  "compareAt": null,
  "rating": 4.6,
  "reviews": 640,
  "skinTypes": [
   "Sensitive",
   "Dry"
  ],
  "concerns": [
   "Redness",
   "Irritation"
  ],
  "bestFor": "Sensitive, inflamed or redness-prone skin",
  "tag": "New",
  "description": "A gentle, soothing daily cleanser designed for reactive skin. Removes impurities while helping calm redness and visible irritation.",
  "howToUse": "Massage onto damp skin, rinse with lukewarm water. Suitable for twice-daily use.",
  "ingredients": "Centella asiatica, panthenol, allantoin, low-pH cleansing base.",
  "image": "/img/skinever-cleanser.webp"
 },
 {
  "id": "cosrx-low-ph-gel",
  "slug": "cosrx-low-ph-gel",
  "name": "Low pH Good Morning Gel Cleanser",
  "brand": "COSRX",
  "category": "Cleanser",
  "size": "150 ml",
  "price": 12,
  "compareAt": 14,
  "rating": 4.7,
  "reviews": 3890,
  "skinTypes": [
   "Oily",
   "Sensitive",
   "Combination"
  ],
  "concerns": [
   "Acne",
   "Oil control"
  ],
  "bestFor": "Acne-prone, oily and sensitive skin",
  "tag": "Cult favourite",
  "description": "A mildly acidic gel cleanser with tea tree oil and BHA that cleanses gently while respecting the skin's natural pH.",
  "howToUse": "Use in the morning (or AM and PM). Lather with water, massage, rinse.",
  "ingredients": "Tea tree leaf oil, betaine salicylate (BHA), mild surfactants, pH ~5.0\u20136.0.",
  "image": "/img/cosrx-low-ph-gel.webp"
 },
 {
  "id": "cosrx-snail-96",
  "slug": "cosrx-snail-96",
  "name": "Advanced Snail 96 Mucin Power Essence",
  "brand": "COSRX",
  "category": "Serum",
  "size": "100 ml",
  "price": 21,
  "compareAt": 25,
  "rating": 4.9,
  "reviews": 5120,
  "skinTypes": [
   "Dry",
   "Combination",
   "Normal",
   "Sensitive"
  ],
  "concerns": [
   "Hydration",
   "Acne scars",
   "Dullness"
  ],
  "bestFor": "Dehydrated skin, post-acne marks and dullness",
  "tag": "Viral",
  "description": "96% snail secretion filtrate delivers deep, bouncy hydration and supports the look of healing and smoother texture.",
  "howToUse": "After cleansing and toner, pat 2\u20133 pumps onto the face. Follow with moisturizer.",
  "ingredients": "Snail secretion filtrate 96%, sodium hyaluronate, betaine, panthenol, allantoin.",
  "image": "/img/cosrx-snail-96.webp"
 },
 {
  "id": "anua-niacinamide-txa",
  "slug": "anua-niacinamide-txa",
  "name": "10% Niacinamide + 4% TXA Dark Spot Correcting Serum",
  "brand": "Anua",
  "category": "Serum",
  "size": "30 ml",
  "price": 22,
  "compareAt": null,
  "rating": 4.8,
  "reviews": 1760,
  "skinTypes": [
   "Oily",
   "Combination",
   "Normal",
   "Dry"
  ],
  "concerns": [
   "Dark spots",
   "Acne scars",
   "Dullness"
  ],
  "bestFor": "Hyperpigmentation, stubborn dark spots and acne marks",
  "tag": "Best seller",
  "description": "A brightening serum pairing 10% niacinamide with 4% tranexamic acid to visibly fade dark spots and even out tone.",
  "howToUse": "Apply 2\u20133 drops after toner, AM or PM. Always use sunscreen in the morning.",
  "ingredients": "Niacinamide 10%, tranexamic acid 4%, arbutin, glutathione, panthenol.",
  "image": "/img/anua-niacinamide-txa.webp"
 },
 {
  "id": "boj-glow-serum",
  "slug": "boj-glow-serum",
  "name": "Glow Serum: Propolis + Niacinamide",
  "brand": "Beauty of Joseon",
  "category": "Serum",
  "size": "30 ml",
  "price": 17,
  "compareAt": null,
  "rating": 4.7,
  "reviews": 2980,
  "skinTypes": [
   "Oily",
   "Combination",
   "Normal"
  ],
  "concerns": [
   "Acne",
   "Dullness",
   "Dark spots"
  ],
  "bestFor": "Acne-prone, dull and uneven skin tone",
  "tag": null,
  "description": "Honey-coloured propolis serum with niacinamide that calms breakouts and gives a healthy, even glow.",
  "howToUse": "Apply a few drops after toner. Layer under moisturizer.",
  "ingredients": "Propolis extract 60%, niacinamide 2%, tea tree, turmeric root extract.",
  "image": "/img/boj-glow-serum.webp"
 },
 {
  "id": "boj-relief-sun",
  "slug": "boj-relief-sun",
  "name": "Relief Sun: Rice + Probiotics SPF50+ PA++++",
  "brand": "Beauty of Joseon",
  "category": "Sun & Barrier",
  "size": "50 ml",
  "price": 18,
  "compareAt": 21,
  "rating": 4.9,
  "reviews": 6400,
  "skinTypes": [
   "Dry",
   "Combination",
   "Normal",
   "Sensitive"
  ],
  "concerns": [
   "Sun protection",
   "Hydration"
  ],
  "bestFor": "All skin types, especially dry to combination",
  "tag": "No.1 Sunscreen",
  "description": "A lightweight, creamy organic sunscreen with rice extract and grain-fermented probiotics. No white cast, comfortable all day.",
  "howToUse": "Last step of your AM routine. Apply generously 15 minutes before sun exposure; reapply every 2 hours outdoors.",
  "ingredients": "Rice extract 30%, grain-fermented extracts, niacinamide, chemical UV filters.",
  "image": "/img/boj-relief-sun.webp"
 },
 {
  "id": "aestura-atobarrier-365",
  "slug": "aestura-atobarrier-365",
  "name": "Atobarrier 365 Cream",
  "brand": "Aestura",
  "category": "Sun & Barrier",
  "size": "80 ml",
  "price": 29,
  "compareAt": null,
  "rating": 4.8,
  "reviews": 1320,
  "skinTypes": [
   "Dry",
   "Sensitive"
  ],
  "concerns": [
   "Barrier repair",
   "Irritation",
   "Hydration"
  ],
  "bestFor": "Damaged barrier, eczema-prone or irritated skin",
  "tag": "Derm pick",
  "description": "A dermatologist-developed ceramide cream that reinforces a weakened skin barrier and keeps skin comfortable for long hours.",
  "howToUse": "Apply as the final step of your routine, AM and PM, or whenever skin feels tight.",
  "ingredients": "Derma-ceramide capsules, cholesterol, fatty acids, glycerin. Also available as a lotion.",
  "image": "/img/aestura-atobarrier-365.webp"
 }
];

export const POSTS: Post[] = [
 {
  "slug": "korean-skincare-routine-for-beginners",
  "title": "Korean Skincare Routine for Beginners: The Simple 4-Step Guide (2026)",
  "tag": "Routines",
  "date": "2026-10-20",
  "readTime": "8 min",
  "metaDescription": "New to K-beauty? Learn the easy 4-step Korean skincare routine for beginners: cleanser, serum, moisturizer and SPF, with product picks for every skin type.",
  "focusKeyword": "korean skincare routine for beginners",
  "keywords": [
   "korean skincare routine",
   "k-beauty for beginners",
   "simple skincare routine",
   "korean skincare steps",
   "morning and night skincare routine",
   "best korean skincare products"
  ],
  "hashtags": [
   "#KoreanSkincare",
   "#KBeauty",
   "#SkincareRoutine",
   "#SkincareForBeginners",
   "#GlassSkin",
   "#NACosmetics"
  ],
  "excerpt": "You don't need 10 steps to get glass skin. This beginner-friendly Korean skincare routine uses four steps that do most of the work.",
  "body": [
   {
    "type": "p",
    "value": "The famous \"10-step Korean skincare routine\" made K-beauty popular, but it also scared a lot of people away. Most dermatologists and Korean beauty editors agree that a <b>simple routine done every day</b> beats a complicated one you give up after a week."
   },
   {
    "type": "p",
    "value": "Here is the 4-step Korean skincare routine for beginners we recommend to every new NAC customer."
   },
   {
    "type": "h2",
    "value": "Step 1: Cleanse with a low-pH cleanser"
   },
   {
    "type": "p",
    "value": "Your skin's natural pH sits around 4.5 to 5.5. Harsh, high-pH soaps strip that protective acid mantle, which leads to tightness, redness and often more oil. A low-pH gel or foam removes sunscreen, sweat and sebum while keeping your barrier intact."
   },
   {
    "type": "ul",
    "value": [
     "<b>Oily or acne-prone:</b> a gel cleanser with BHA or tea tree",
     "<b>Combination or congested pores:</b> a heartleaf foam cleanser",
     "<b>Sensitive or redness-prone:</b> a soothing cleanser with centella and panthenol"
    ]
   },
   {
    "type": "prod",
    "value": "cosrx-low-ph-gel"
   },
   {
    "type": "h2",
    "value": "Step 2: Treat with one serum or essence"
   },
   {
    "type": "p",
    "value": "This is the step where you target your main concern. Beginners should pick <b>one</b> serum and use it for at least 6 to 8 weeks before judging results."
   },
   {
    "type": "ul",
    "value": [
     "<b>Dehydration and dullness:</b> snail mucin essence",
     "<b>Dark spots and acne marks:</b> niacinamide + tranexamic acid",
     "<b>Breakouts and uneven tone:</b> propolis + niacinamide"
    ]
   },
   {
    "type": "prod",
    "value": "cosrx-snail-96"
   },
   {
    "type": "h2",
    "value": "Step 3: Moisturize to lock it in"
   },
   {
    "type": "p",
    "value": "Even oily skin needs moisture. A ceramide cream rebuilds the lipids that keep water in and irritants out, and it makes your serum more comfortable to use."
   },
   {
    "type": "prod",
    "value": "aestura-atobarrier-365"
   },
   {
    "type": "h2",
    "value": "Step 4: Sunscreen every morning"
   },
   {
    "type": "p",
    "value": "Sunscreen is the most important anti-aging and anti-pigmentation step. Korean sunscreens are loved because they feel like skincare: light, no white cast and comfortable under makeup. Use about two finger-lengths for face and neck, and reapply every two hours outdoors."
   },
   {
    "type": "prod",
    "value": "boj-relief-sun"
   },
   {
    "type": "tip",
    "value": "<b>Morning:</b> cleanser, serum, moisturizer, SPF. <b>Night:</b> cleanser, serum, moisturizer. That's it."
   },
   {
    "type": "h2",
    "value": "When to add more steps"
   },
   {
    "type": "p",
    "value": "Once your skin has been calm for a month, you can add a hydrating toner, a second serum or a weekly exfoliant. Introduce one new product at a time, two weeks apart, so you know what works."
   }
  ],
  "faq": [
   {
    "q": "How many steps is a Korean skincare routine?",
    "a": "A basic routine has four steps: cleanser, serum, moisturizer and sunscreen. Extra steps like toner, essence and sheet masks are optional."
   },
   {
    "q": "Can I use Korean skincare if I have sensitive skin?",
    "a": "Yes. Choose a low-pH cleanser, a fragrance-free ceramide moisturizer, and patch test new products on your jaw for 48 hours."
   },
   {
    "q": "How long before I see results?",
    "a": "Hydration improves within days. Texture, dark spots and acne marks usually need 6 to 12 weeks of consistent use."
   }
  ]
 },
 {
  "slug": "niacinamide-vs-tranexamic-acid-dark-spots",
  "title": "Niacinamide vs Tranexamic Acid: Which Is Better for Dark Spots?",
  "tag": "Ingredients",
  "date": "2026-10-14",
  "readTime": "7 min",
  "metaDescription": "Niacinamide or tranexamic acid for hyperpigmentation? Compare how each fades dark spots and acne marks, and why the 10% niacinamide + 4% TXA combo works.",
  "focusKeyword": "niacinamide vs tranexamic acid",
  "keywords": [
   "tranexamic acid serum",
   "niacinamide serum for dark spots",
   "best serum for hyperpigmentation",
   "how to fade acne scars",
   "anua niacinamide txa serum",
   "dark spot corrector"
  ],
  "hashtags": [
   "#Niacinamide",
   "#TranexamicAcid",
   "#Hyperpigmentation",
   "#DarkSpots",
   "#AcneScars",
   "#Anua",
   "#KBeauty"
  ],
  "excerpt": "Both ingredients brighten, but they work at different stages of pigmentation. Here's how they compare and why many people use them together.",
  "body": [
   {
    "type": "p",
    "value": "Hyperpigmentation, including sun spots, post-acne marks and uneven tone, is one of the most searched skin concerns worldwide. Two ingredients come up again and again: <b>niacinamide</b> and <b>tranexamic acid (TXA)</b>."
   },
   {
    "type": "h2",
    "value": "What niacinamide does"
   },
   {
    "type": "p",
    "value": "Niacinamide is a form of vitamin B3. It helps reduce the transfer of pigment (melanin) to the surface cells of the skin, strengthens the skin barrier, and helps regulate oil. Most serums use 2% to 10%."
   },
   {
    "type": "ul",
    "value": [
     "Brightens dullness and evens tone",
     "Helps reduce the look of enlarged pores",
     "Supports a healthy barrier",
     "Gentle enough for most skin types"
    ]
   },
   {
    "type": "h2",
    "value": "What tranexamic acid does"
   },
   {
    "type": "p",
    "value": "Tranexamic acid works earlier in the process. It helps calm the signals that tell skin to produce excess pigment, which is why it is popular for stubborn marks and melasma-prone skin. Topical serums typically use 2% to 5%."
   },
   {
    "type": "h2",
    "value": "Niacinamide vs TXA: quick comparison"
   },
   {
    "type": "ul",
    "value": [
     "<b>Best for overall glow and pores:</b> niacinamide",
     "<b>Best for stubborn, deep-looking spots:</b> tranexamic acid",
     "<b>Irritation risk:</b> both are low, which is why they pair well",
     "<b>Results:</b> 8 to 12 weeks of daily use for both"
    ]
   },
   {
    "type": "h2",
    "value": "Why use them together"
   },
   {
    "type": "p",
    "value": "Because they target pigment at different stages, combining them gives you a two-step approach in one product. That's the idea behind Anua's 10% Niacinamide + 4% TXA serum, one of the best-reviewed K-beauty dark spot correctors."
   },
   {
    "type": "prod",
    "value": "anua-niacinamide-txa"
   },
   {
    "type": "tip",
    "value": "No brightening serum works without daily sunscreen. UV exposure re-darkens spots faster than any serum can fade them."
   },
   {
    "type": "prod",
    "value": "boj-relief-sun"
   }
  ],
  "faq": [
   {
    "q": "Can I use niacinamide and tranexamic acid together?",
    "a": "Yes. They are compatible and are often formulated together. Apply after cleansing and before moisturizer."
   },
   {
    "q": "Can I use niacinamide with vitamin C?",
    "a": "Yes. Modern formulas are stable together. If you feel flushing, use them at different times of day."
   },
   {
    "q": "Is TXA safe for sensitive skin?",
    "a": "Topical tranexamic acid is generally well tolerated. Always patch test first and stop if irritation continues."
   }
  ]
 },
 {
  "slug": "beauty-of-joseon-relief-sun-review",
  "title": "Beauty of Joseon Relief Sun Review: Is It the Best Korean Sunscreen?",
  "tag": "Sun care",
  "date": "2026-10-06",
  "readTime": "6 min",
  "metaDescription": "Honest Beauty of Joseon Relief Sun Rice + Probiotics SPF50+ review: texture, white cast, skin types it suits, and how to apply Korean sunscreen correctly.",
  "focusKeyword": "beauty of joseon relief sun review",
  "keywords": [
   "best korean sunscreen",
   "sunscreen with no white cast",
   "sunscreen for dry skin",
   "spf50 pa++++",
   "beauty of joseon sunscreen",
   "korean sunscreen for oily skin"
  ],
  "hashtags": [
   "#BeautyOfJoseon",
   "#ReliefSun",
   "#KoreanSunscreen",
   "#SPF50",
   "#Sunscreen",
   "#SunscreenEveryday",
   "#KBeauty"
  ],
  "excerpt": "No white cast, a skincare-like finish and SPF50+ PA++++. We break down why this sunscreen went viral and who it suits best.",
  "body": [
   {
    "type": "p",
    "value": "If you have spent any time on skincare TikTok, you have seen the little white tube with the green cap. Beauty of Joseon Relief Sun: Rice + Probiotics became one of the best-selling sunscreens in the world for a few clear reasons."
   },
   {
    "type": "h2",
    "value": "Texture and finish"
   },
   {
    "type": "p",
    "value": "It feels like a light, creamy moisturizer. It spreads easily, leaves <b>no white cast</b> on any skin tone, and dries to a natural, slightly dewy finish that works under makeup."
   },
   {
    "type": "h2",
    "value": "What SPF50+ PA++++ means"
   },
   {
    "type": "ul",
    "value": [
     "<b>SPF50+</b> measures protection from UVB, the rays that cause sunburn",
     "<b>PA++++</b> is the highest rating for UVA, the rays linked to aging and pigmentation",
     "Together they make it a strong daily sunscreen for city and outdoor use"
    ]
   },
   {
    "type": "h2",
    "value": "Who it suits best"
   },
   {
    "type": "p",
    "value": "Dry, normal and combination skin types usually love it. Very oily skin may find it a little dewy in hot weather; blotting papers at midday solve this."
   },
   {
    "type": "prod",
    "value": "boj-relief-sun"
   },
   {
    "type": "h2",
    "value": "How to apply sunscreen correctly"
   },
   {
    "type": "ul",
    "value": [
     "Use two finger-lengths for face and neck",
     "Apply as the last skincare step, 15 minutes before going out",
     "Reapply every 2 hours outdoors, or after sweating and swimming",
     "Wear it on cloudy days and indoors near windows"
    ]
   },
   {
    "type": "tip",
    "value": "Pairing sunscreen with a barrier cream at night helps skin stay calm if you spend a lot of time in the sun."
   },
   {
    "type": "prod",
    "value": "aestura-atobarrier-365"
   }
  ],
  "faq": [
   {
    "q": "Is Beauty of Joseon Relief Sun good for oily skin?",
    "a": "It can work for oily skin, but the finish is dewy. If you are very oily, use a light moisturizer under it or blot during the day."
   },
   {
    "q": "Does it leave a white cast?",
    "a": "No. It is a chemical-filter sunscreen and leaves no visible white cast."
   },
   {
    "q": "Can I use it under makeup?",
    "a": "Yes. Let it set for a few minutes before foundation."
   }
  ]
 },
 {
  "slug": "best-cleanser-for-oily-acne-prone-skin",
  "title": "Best Korean Cleanser for Oily & Acne-Prone Skin: Anua vs COSRX",
  "tag": "Guides",
  "date": "2026-09-26",
  "readTime": "6 min",
  "metaDescription": "Looking for the best face wash for oily, acne-prone skin? Compare Anua Heartleaf Pore Deep Cleansing Foam and COSRX Low pH Good Morning Gel Cleanser.",
  "focusKeyword": "best cleanser for oily acne prone skin",
  "keywords": [
   "best face wash for oily skin",
   "korean cleanser for acne",
   "low ph cleanser",
   "anua heartleaf cleansing foam",
   "cosrx low ph cleanser",
   "pore cleanser"
  ],
  "hashtags": [
   "#OilySkin",
   "#AcneProneSkin",
   "#FaceWash",
   "#Cleanser",
   "#COSRX",
   "#Anua",
   "#ClearSkin"
  ],
  "excerpt": "Squeaky clean is not the goal. Here's how to choose a cleanser that controls oil without triggering more breakouts.",
  "body": [
   {
    "type": "p",
    "value": "When your skin is oily or breaking out, it's tempting to scrub it until it squeaks. That stripped feeling is a sign your barrier is damaged, and damaged skin often produces <b>more</b> oil and more breakouts."
   },
   {
    "type": "h2",
    "value": "What to look for in a cleanser"
   },
   {
    "type": "ul",
    "value": [
     "<b>Low pH (around 5 to 6):</b> cleans without disrupting your acid mantle",
     "<b>BHA (salicylic acid or betaine salicylate):</b> helps clear pores",
     "<b>Soothing extracts:</b> heartleaf, tea tree and centella calm active spots",
     "<b>No harsh sulfates or grainy scrubs</b>"
    ]
   },
   {
    "type": "h2",
    "value": "Anua Heartleaf Quercetinol Pore Deep Cleansing Foam"
   },
   {
    "type": "p",
    "value": "A creamy foam that excels at removing sunscreen and excess oil. Heartleaf and quercetinol soothe, while gentle exfoliating agents keep pores clear. Best for combination skin and visible congestion around the nose and chin."
   },
   {
    "type": "prod",
    "value": "anua-heartleaf-foam"
   },
   {
    "type": "h2",
    "value": "COSRX Low pH Good Morning Gel Cleanser"
   },
   {
    "type": "p",
    "value": "A cult classic for a reason. This light gel uses tea tree oil and betaine salicylate and is gentle enough for twice-daily use. Best for oily, acne-prone and sensitive skin."
   },
   {
    "type": "prod",
    "value": "cosrx-low-ph-gel"
   },
   {
    "type": "h2",
    "value": "Which one should you choose?"
   },
   {
    "type": "ul",
    "value": [
     "Very oily with blackheads: <b>Anua foam</b>",
     "Acne-prone and easily irritated: <b>COSRX gel</b>",
     "Using both: Anua at night to remove sunscreen, COSRX in the morning"
    ]
   },
   {
    "type": "tip",
    "value": "Massage your cleanser for a full 60 seconds. It gives the ingredients time to work and dissolves sunscreen properly."
   }
  ],
  "faq": [
   {
    "q": "Should I wash my face twice a day if I have oily skin?",
    "a": "Yes, morning and night is enough. Washing more often can trigger more oil."
   },
   {
    "q": "Is foam or gel cleanser better for acne?",
    "a": "Both work. Gels are often gentler; foams can feel more thorough for heavy sunscreen and oil."
   },
   {
    "q": "What is double cleansing?",
    "a": "Using an oil or balm cleanser first to remove sunscreen and makeup, then a water-based cleanser. It is helpful at night if you wear heavy makeup."
   }
  ]
 },
 {
  "slug": "how-to-repair-damaged-skin-barrier",
  "title": "How to Repair a Damaged Skin Barrier: Signs, Causes & a 4-Week Plan",
  "tag": "Skin health",
  "date": "2026-09-15",
  "readTime": "7 min",
  "metaDescription": "Stinging, redness and tightness? Learn the signs of a damaged skin barrier and a simple 4-week Korean skincare plan with ceramides to repair it.",
  "focusKeyword": "how to repair damaged skin barrier",
  "keywords": [
   "damaged skin barrier",
   "skin barrier repair cream",
   "ceramide moisturizer",
   "sensitive skin routine",
   "aestura atobarrier 365",
   "redness and irritation"
  ],
  "hashtags": [
   "#SkinBarrier",
   "#BarrierRepair",
   "#SensitiveSkin",
   "#Ceramides",
   "#Aestura",
   "#SkinHealth",
   "#KBeauty"
  ],
  "excerpt": "Stinging, tightness and sudden redness are classic signs. Here's what causes barrier damage and a simple plan to calm skin.",
  "body": [
   {
    "type": "p",
    "value": "Your skin barrier is the outermost layer of skin. It is built like a brick wall: skin cells are the bricks and lipids (ceramides, cholesterol and fatty acids) are the mortar. When that mortar breaks down, water escapes and irritants get in."
   },
   {
    "type": "h2",
    "value": "Signs your skin barrier is damaged"
   },
   {
    "type": "ul",
    "value": [
     "Products that never bothered you suddenly sting",
     "Skin feels tight after cleansing",
     "Redness, flaking or rough patches",
     "More breakouts at the same time as dryness"
    ]
   },
   {
    "type": "h2",
    "value": "Common causes"
   },
   {
    "type": "ul",
    "value": [
     "Over-exfoliating with acids, retinoids or scrubs",
     "Harsh, high-pH cleansers",
     "Weather changes, heating and air conditioning",
     "Using too many new products at once"
    ]
   },
   {
    "type": "h2",
    "value": "The 4-week repair plan"
   },
   {
    "type": "p",
    "value": "<b>Weeks 1 to 2:</b> stop strong actives (retinoids, AHA/BHA, high-strength vitamin C). Use only a gentle cleanser, a ceramide moisturizer and sunscreen."
   },
   {
    "type": "prod",
    "value": "skinever-cleanser"
   },
   {
    "type": "prod",
    "value": "aestura-atobarrier-365"
   },
   {
    "type": "p",
    "value": "<b>Weeks 3 to 4:</b> if stinging has stopped, add a hydrating essence. Snail mucin is a favourite because it hydrates and soothes without irritation."
   },
   {
    "type": "prod",
    "value": "cosrx-snail-96"
   },
   {
    "type": "tip",
    "value": "Reintroduce your actives one at a time, starting two or three nights a week. If irritation lasts beyond a few weeks, see a dermatologist."
   }
  ],
  "faq": [
   {
    "q": "How long does it take to repair the skin barrier?",
    "a": "Most people feel a clear improvement in 2 to 4 weeks with a gentle routine."
   },
   {
    "q": "Are ceramides good for all skin types?",
    "a": "Yes. Ceramides are natural lipids in skin and suit dry, oily and sensitive skin."
   },
   {
    "q": "Can I wear makeup with a damaged barrier?",
    "a": "Yes, but keep it minimal and remove it with a gentle cleanser."
   }
  ]
 },
 {
  "slug": "cosrx-snail-mucin-benefits",
  "title": "Snail Mucin Benefits: What COSRX Snail 96 Essence Really Does for Skin",
  "tag": "Ingredients",
  "date": "2026-09-03",
  "readTime": "6 min",
  "metaDescription": "What does snail mucin do for your skin? Learn the benefits of COSRX Advanced Snail 96 Mucin Power Essence for hydration, acne marks and glass skin.",
  "focusKeyword": "snail mucin benefits",
  "keywords": [
   "cosrx snail mucin",
   "snail mucin essence",
   "snail 96 mucin power essence",
   "glass skin",
   "hydrating serum",
   "snail mucin for acne scars"
  ],
  "hashtags": [
   "#SnailMucin",
   "#COSRX",
   "#GlassSkin",
   "#HydratedSkin",
   "#SkincareTikTok",
   "#KBeauty",
   "#NACosmetics"
  ],
  "excerpt": "Why a 96% snail mucin essence is one of the most reviewed skincare products online, and how to use it properly.",
  "body": [
   {
    "type": "p",
    "value": "Snail mucin sounds strange, but it has been used in skincare for decades. It is the filtrate collected from snails and is naturally rich in hydrating and soothing compounds."
   },
   {
    "type": "h2",
    "value": "Key benefits of snail mucin"
   },
   {
    "type": "ul",
    "value": [
     "<b>Deep hydration:</b> contains glycoproteins and hyaluronic acid",
     "<b>Soothing:</b> calms skin after breakouts or sun",
     "<b>Smoother texture:</b> helps skin look more even over time",
     "<b>Glow:</b> the bouncy, dewy finish behind the 'glass skin' trend"
    ]
   },
   {
    "type": "h2",
    "value": "Who should use it"
   },
   {
    "type": "p",
    "value": "Almost everyone. It is especially loved by dehydrated, combination and acne-prone skin because it hydrates without feeling heavy."
   },
   {
    "type": "prod",
    "value": "cosrx-snail-96"
   },
   {
    "type": "h2",
    "value": "How to use snail mucin essence"
   },
   {
    "type": "ul",
    "value": [
     "After cleansing (and toner if you use one)",
     "Pump 2 to 3 times into your palms and pat onto damp skin",
     "Follow with moisturizer, and sunscreen in the morning",
     "Use morning and night"
    ]
   },
   {
    "type": "h2",
    "value": "Pair it with"
   },
   {
    "type": "p",
    "value": "Snail mucin layers well with almost anything. For dark spots, apply a niacinamide serum first, then snail essence."
   },
   {
    "type": "prod",
    "value": "anua-niacinamide-txa"
   }
  ],
  "faq": [
   {
    "q": "Is snail mucin good for acne?",
    "a": "It is non-irritating and hydrating, which helps acne-prone skin heal and look calmer. It is not a spot treatment."
   },
   {
    "q": "Can I use snail mucin with retinol?",
    "a": "Yes. Its soothing hydration can make retinol easier to tolerate."
   },
   {
    "q": "Is snail mucin cruelty-free?",
    "a": "Many brands, including COSRX, state that their collection process does not harm snails."
   }
  ]
 }
];

export const REVIEWS: Review[] = [
 {
  "name": "Ayesha K.",
  "product": "Relief Sun",
  "text": "Finally a sunscreen with no white cast. My skin looks fresh all day."
 },
 {
  "name": "Daniel R.",
  "product": "Snail 96 Essence",
  "text": "My post-acne marks faded so much in six weeks. Ordering my second bottle."
 },
 {
  "name": "Mariam S.",
  "product": "Anua Heartleaf Foam",
  "text": "Gentle but my pores look clearer. Arrived well packed."
 },
 {
  "name": "Hina A.",
  "product": "Atobarrier 365",
  "text": "Saved my skin barrier in winter. Thick but absorbs well."
 },
 {
  "name": "Jenny L.",
  "product": "Anua Niacinamide + TXA",
  "text": "Dark spots are visibly lighter. Love the texture."
 }
];
