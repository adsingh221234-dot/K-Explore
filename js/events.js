// K Explore — Sample event data
// Each event has: id, name, image, date, time, venue, category, price, description
// Dates use ISO format so the countdown timer can parse them reliably.

const EVENTS = [
  {
    id: 1,
    name: "FutureTech Summit 2026",
    image:
      "https://images.pexels.com/photos/3861951/pexels-photo-3861951.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    date: "2026-11-18",
    time: "09:00 AM",
    venue: "Grand Convention Center, San Francisco",
    category: "Technology",
    price: "$120",
    description:
      "The FutureTech Summit brings together the brightest minds in AI, robotics and cloud computing for a full day of keynotes, hands-on labs and networking. Meet founders, engineers and investors shaping the next decade of technology."
  },
  {
    id: 2,
    name: "Web3 Builders Hackathon",
    image:
      "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    date: "2026-12-05",
    time: "10:00 AM",
    venue: "Innovation Hub, Austin",
    category: "Technology",
    price: "$75",
    description:
      "A 48-hour hackathon for developers, designers and product thinkers. Form a team, pick a challenge and ship a working prototype with mentorship from senior engineers and product leaders from top tech companies."
  },
  {
    id: 3,
    name: "Neon Nights Music Festival",
    image:
      "https://images.pexels.com/photos/13230484/pexels-photo-13230484.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    date: "2026-11-22",
    time: "06:00 PM",
    venue: "Riverside Amphitheater, Los Angeles",
    category: "Music",
    price: "$95",
    description:
      "An electrifying open-air festival featuring chart-topping artists across pop, indie and electronic music. Experience stunning light shows, food trucks and a waterfront sunset backdrop unlike any other venue."
  },
  {
    id: 4,
    name: "Acoustic Sessions Live",
    image:
      "https://images.pexels.com/photos/4218027/pexels-photo-4218027.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    date: "2026-12-14",
    time: "07:30 PM",
    venue: "The Velvet Lounge, New York",
    category: "Music",
    price: "$55",
    description:
      "An intimate evening of stripped-down performances by award-winning singer-songwriters. Cozy seating, candlelit tables and a curated menu make this the perfect musical escape for the season."
  },
  {
    id: 5,
    name: "City Marathon Championship",
    image:
      "https://images.pexels.com/photos/30651230/pexels-photo-30651230.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    date: "2026-11-30",
    time: "06:00 AM",
    venue: "City Stadium, Chicago",
    category: "Sports",
    price: "$60",
    description:
      "Join thousands of runners for a scenic 42 km course through the heart of the city. Timing chips, hydration stations, finisher medals and a post-race festival with live commentary await every participant."
  },
  {
    id: 6,
    name: "International Football Showdown",
    image:
      "https://images.pexels.com/photos/37649279/pexels-photo-37649279.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    date: "2026-12-20",
    time: "04:00 PM",
    venue: "National Arena, Miami",
    category: "Sports",
    price: "$85",
    description:
      "Witness a thrilling friendly match between two world-class national teams. Pre-match fan zone, halftime entertainment and premium seating options make this a must-attend event for every football fan."
  },
  {
    id: 7,
    name: "Design Thinking Masterclass",
    image:
      "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    date: "2026-11-15",
    time: "10:00 AM",
    venue: "Creative Studio, Seattle",
    category: "Workshops",
    price: "$45",
    description:
      "A hands-on workshop covering the full design thinking process — empathy mapping, ideation, prototyping and user testing. Leave with a framework you can apply to real products the very next day."
  },
  {
    id: 8,
    name: "Public Speaking Bootcamp",
    image:
      "https://images.pexels.com/photos/8761328/pexels-photo-8761328.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    date: "2026-12-08",
    time: "09:30 AM",
    venue: "Business Center, Boston",
    category: "Workshops",
    price: "$40",
    description:
      "Transform your stage presence in a single day. Through guided exercises, video feedback and live coaching, you'll learn to structure talks, manage nerves and deliver presentations that genuinely move audiences."
  },
  {
    id: 9,
    name: "Heritage Cultural Festival",
    image:
      "https://images.pexels.com/photos/35154945/pexels-photo-35154945.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    date: "2026-11-26",
    time: "11:00 AM",
    venue: "Heritage Park, Dallas",
    category: "Cultural Events",
    price: "Free",
    description:
      "Celebrate the richness of world cultures through traditional dance performances, artisan markets, folk music and authentic cuisine from over twenty communities. A family-friendly day out for all ages."
  },
  {
    id: 10,
    name: "Diwali Lights Celebration",
    image:
      "https://images.pexels.com/photos/31660295/pexels-photo-31660295.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    date: "2026-12-10",
    time: "06:30 PM",
    venue: "Riverside Gardens, San Diego",
    category: "Cultural Events",
    price: "$25",
    description:
      "Experience the festival of lights with stunning lantern installations, live classical music, rangoli workshops and a grand fireworks display over the river. Bring family and friends for an unforgettable evening."
  }
];

// Categories used by the filter pills on the homepage.
const CATEGORIES = [
  "All",
  "Technology",
  "Music",
  "Sports",
  "Workshops",
  "Cultural Events"
];

// Expose to other scripts via ES module export.
export { EVENTS, CATEGORIES };
