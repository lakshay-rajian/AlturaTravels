// src/pages/BlogDetails.jsx
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar"; // adjust path if needed

const blogData = {
  himalayas: {
    title: "Exploring the Himalayas: A Journey to the Roof of the World",
    content: `
      <p>The majestic Himalayas stand as nature's greatest masterpiece, offering an incredible mix of adventure, spirituality, and breathtaking scenic beauty. As the world's highest mountain range, the Himalayas span five countries and contain nine of the world's ten highest peaks, including the legendary Mount Everest.</p>
      
      <h3>Trekking Paradise</h3>
      <p>For adventure enthusiasts, the Himalayan trekking routes are unparalleled. From the popular Everest Base Camp trek in Nepal to the lesser-known but equally stunning Valley of Flowers trek in Uttarakhand, India, each trail offers unique landscapes and challenges. The Annapurna Circuit, often called one of the world's best treks, takes you through diverse terrains from lush subtropical forests to arid high-altitude deserts.</p>
      
      <h3>Spiritual Sanctuaries</h3>
      <p>The Himalayas have been a spiritual haven for millennia. Ancient monasteries like Tengboche in Nepal, Hemis in Ladakh, and Tawang in Arunachal Pradesh are centers of Buddhist learning and meditation. The holy town of Rishikesh, known as the "Yoga Capital of the World," sits at the foothills where the sacred Ganges emerges from the mountains.</p>
      
      <h3>Cultural Diversity</h3>
      <p>Each Himalayan region boasts unique cultural traditions. From the Sherpa communities of Nepal to the Tibetan influences in Ladakh and the distinct customs of Bhutan, the cultural tapestry is as varied as the landscape. Local festivals like Losar (Tibetan New Year) and Hemis Festival showcase vibrant dances, music, and age-old rituals.</p>
      
      <h3>Best Time to Visit</h3>
      <p>The ideal time to explore the Himalayas depends on your destination and activities. Spring (March-May) brings blooming rhododendrons and clear mountain views, while autumn (September-November) offers stable weather perfect for trekking. Winter transforms certain areas into skiing paradises, though many high passes become inaccessible.</p>
      
      <p>Whether you seek adventure, spiritual enlightenment, or simply wish to witness nature's grandeur, the Himalayas promise an experience that will remain etched in your memory forever.</p>
    `,
    images: [
      "/blogs/blog-images.svg#himalayas-trek",
      "/blogs/blog-images.svg#himalayas-monastery",
      "/blogs/blog-images.svg#himalayas-peaks",
    ],
    excerpt: "Discover the adventure, spirituality, and breathtaking beauty of the world's highest mountain range...",
    author: "Priya Sharma",
    date: "June 15, 2023",
    readTime: "8 min read"
  },
  rajasthan: {
    title: "Royal Rajasthan: The Land of Maharajas and Living Heritage",
    content: `
      <p>Rajasthan, India's largest state, is a kaleidoscope of color, culture, and heritage that transports visitors to an era of maharajas and magnificent forts. Known as the "Land of Kings," Rajasthan's rich history is reflected in its imposing architecture, vibrant traditions, and royal hospitality.</p>
      
      <h3>Magnificent Forts and Palaces</h3>
      <p>Rajasthan boasts some of India's most spectacular architectural wonders. The amber-hued Jaipur, the blue city of Jodhpur, and the white marble splendor of Udaipur each tell stories of royal ambition and artistic excellence. The UNESCO World Heritage Amber Fort near Jaipur, with its intricate mirror work and scenic location, exemplifies Rajput grandeur. The imposing Mehrangarh Fort in Jodhpur stands 400 feet above the city, offering panoramic views and housing exquisite collections of royal artifacts.</p>
      
      <h3>Desert Adventures</h3>
      <p>The Thar Desert, covering much of western Rajasthan, offers unique experiences from camel safaris to overnight stays in desert camps under star-studded skies. The Sam Sand Dunes near Jaisalmer transform into a magical landscape at sunset, while traditional folk performances around campfires provide authentic cultural immersion.</p>
      
      <h3>Vibrant Culture and Festivals</h3>
      <p>Rajasthan's cultural vibrancy is best experienced through its numerous festivals. The Pushkar Camel Fair, Desert Festival in Jaisalmer, and Holi celebrations in Jaipur are spectacles of color, music, and tradition. The state's handicrafts—from blue pottery and block printing to intricate jewelry and textiles—showcase generations of artistic excellence.</p>
      
      <h3>Culinary Delights</h3>
      <p>Rajasthani cuisine, developed to withstand the harsh desert climate, is rich in flavors and textures. Signature dishes like dal baati churma, gatte ki sabzi, and laal maas offer a gastronomic journey through royal kitchens and desert innovations. The state's sweets, particularly ghewar and mawa kachori, are culinary masterpieces worth savoring.</p>
      
      <p>A journey through Rajasthan is not merely a vacation but a royal experience that leaves visitors enchanted with its grandeur, warmth, and timeless beauty.</p>
    `,
    images: [
      "/blogs/blog-images.svg#rajasthan-fort",
      "/blogs/blog-images.svg#rajasthan-desert",
      "/blogs/blog-images.svg#rajasthan-culture",
    ],
    excerpt: "Experience the royal heritage, vibrant culture, and desert adventures in India's most colorful state...",
    author: "Vikram Singh",
    date: "July 22, 2023",
    readTime: "7 min read"
  },
  kerala: {
    title: "Backwaters of Kerala: Navigating God's Own Country",
    content: `
      <p>Kerala, aptly nicknamed "God's Own Country," is a slender coastal state in Southern India where nature's bounty is displayed in its most serene form. With its network of backwaters, lush hill stations, pristine beaches, and rich cultural heritage, Kerala offers a rejuvenating escape from the hustle of modern life.</p>
      
      <h3>The Enchanting Backwaters</h3>
      <p>Kerala's backwaters—a network of interconnected canals, rivers, lakes, and inlets—form the state's defining feature. A houseboat cruise through these tranquil waters reveals a unique ecosystem and lifestyle. The Alleppey (Alappuzha) backwaters, often called the "Venice of the East," showcase rural Kerala life with villages, paddy fields, and coconut groves lining the shores. Kumarakom, on the Vembanad Lake, offers a bird sanctuary and luxury resorts perfect for unwinding.</p>
      
      <h3>Verdant Hill Stations</h3>
      <p>The Western Ghats mountain range runs through Kerala, creating hill stations that provide cool retreats from the coastal humidity. Munnar, with its endless tea plantations, and Wayanad, with its spice gardens and wildlife sanctuaries, offer trekking opportunities and breathtaking vistas. The Neelakurinji flower, which blooms once every 12 years in Munnar, transforms the landscape into a purple carpet.</p>
      
      <h3>Ayurveda and Wellness</h3>
      <p>Kerala is the birthplace of Ayurveda, the ancient Indian system of medicine and wellness. Traditional Ayurvedic treatments, using herbal oils and natural ingredients, are offered at specialized centers throughout the state. The monsoon season (June-August) is considered ideal for Ayurvedic therapies when the body is most receptive to treatments.</p>
      
      <h3>Cultural Richness</h3>
      <p>Kerala's cultural heritage is as diverse as its landscape. The ancient martial art form of Kalaripayattu, the elaborate Kathakali dance-drama, and the boat races during Onam festival showcase the state's artistic traditions. The cuisine, characterized by coconut, seafood, and aromatic spices, offers delicacies like appam with stew, Kerala fish curry, and sadya (a traditional feast served on banana leaves).</p>
      
      <p>Whether you seek relaxation, adventure, wellness, or cultural immersion, Kerala's gentle pace and natural beauty provide a perfect backdrop for an unforgettable journey.</p>
    `,
    images: [
      "/blogs/blog-images.svg#kerala-backwaters",
      "/blogs/blog-images.svg#kerala-tea-plantation",
      "/blogs/blog-images.svg#kerala-kathakali",
    ],
    excerpt: "Float through serene backwaters, explore lush hill stations, and experience the rich cultural tapestry of God's Own Country...",
    author: "Anita Thomas",
    date: "August 10, 2023",
    readTime: "6 min read"
  },
  ladakh: {
    title: "Adventures in Ladakh: The Land of High Passes",
    content: `
      <p>Ladakh, a high-altitude desert nestled between the Karakoram and Himalayan mountain ranges, is a land of stark beauty and extreme landscapes. Often referred to as "Little Tibet" or "The Land of High Passes," this remote region in India's northernmost state offers adventures that challenge the body and transform the soul.</p>
      
      <h3>Breathtaking Landscapes</h3>
      <p>Ladakh's geography is a study in contrasts—barren mountains in shades of brown, rust, and purple juxtaposed against deep blue lakes and green oases. The famous Pangong Tso and Tso Moriri lakes reflect the sky so perfectly that it's often difficult to discern where water ends and heaven begins. The Nubra Valley, accessible via the world's highest motorable pass (Khardung La at 17,982 feet), surprises visitors with its sand dunes and double-humped Bactrian camels.</p>
      
      <h3>Motorcycle Expeditions</h3>
      <p>The Manali-Leh Highway and Srinagar-Leh Highway have achieved legendary status among motorcyclists worldwide. These routes offer the ultimate road trip experience with hairpin bends, river crossings, and dramatic elevation changes. The journey itself becomes as memorable as the destination, with each turn revealing vistas more spectacular than the last.</p>
      
      <h3>Ancient Monasteries</h3>
      <p>Buddhism has flourished in Ladakh for centuries, and the region is dotted with ancient monasteries (gompas) perched dramatically on hillsides. Thiksey Monastery, resembling Tibet's Potala Palace, Hemis Monastery, known for its annual festival, and Diskit Monastery, home to a towering Buddha statue, are repositories of Tibetan Buddhist art, culture, and spirituality.</p>
      
      <h3>Adventure Activities</h3>
      <p>Beyond motorbiking, Ladakh offers a plethora of adventure activities. River rafting on the Zanskar and Indus rivers, trekking routes like the Markha Valley and Chadar (frozen river) trek, and mountain biking through remote villages provide adrenaline rushes against unparalleled backdrops. For wildlife enthusiasts, spotting the elusive snow leopard in Hemis National Park represents the ultimate challenge.</p>
      
      <h3>Cultural Experiences</h3>
      <p>Ladakhi culture, with its Tibetan influences, has remained largely unchanged for centuries. Traditional mud-brick houses with flat roofs, prayer flags fluttering in the wind, and locals in traditional attire create a timeless atmosphere. The warm hospitality of Ladakhi people, despite the harsh living conditions, leaves a lasting impression on visitors.</p>
      
      <p>A journey to Ladakh is not merely a vacation but a pilgrimage to one of the world's last untouched frontiers—a place where adventure meets spirituality against the backdrop of nature's grandest canvas.</p>
    `,
    images: [
      "/blogs/blog-images.svg#ladakh-mountains",
      "/blogs/blog-images.svg#ladakh-monastery",
      "/blogs/blog-images.svg#ladakh-biking",
    ],
    excerpt: "Embark on thrilling adventures through dramatic landscapes, ancient monasteries, and unique cultural experiences in India's Himalayan desert...",
    author: "Tenzin Dorje",
    date: "September 5, 2023",
    readTime: "9 min read"
  },
  goa: {
    title: "Beach Life in Goa: Where the Sun, Sand, and Celebration Never End",
    content: `
      <p>Goa, India's smallest state, packs an outsized punch when it comes to delivering unforgettable experiences. With its perfect blend of Portuguese heritage, stunning beaches, vibrant nightlife, and laid-back atmosphere, this coastal paradise has earned its reputation as India's favorite vacation destination.</p>
      
      <h3>Beaches for Every Mood</h3>
      <p>Goa's 100+ km coastline is adorned with beaches catering to every preference. North Goa beaches like Baga, Calangute, and Anjuna pulse with energy, beach shacks, water sports, and nightlife. South Goa offers tranquil retreats like Palolem, Agonda, and Butterfly Beach, where pristine shores and fewer crowds create perfect settings for relaxation. The sunset views from Arambol Beach in the north and Colva Beach in the south rank among India's most spectacular natural displays.</p>
      
      <h3>Portuguese Colonial Heritage</h3>
      <p>Goa's 450 years under Portuguese rule have left an indelible mark on its architecture, cuisine, and culture. The UNESCO-listed churches of Old Goa, particularly the Basilica of Bom Jesus housing the remains of St. Francis Xavier, showcase remarkable Renaissance architecture. The Latin Quarter of Fontainhas in Panjim, with its colorful Portuguese-style houses, narrow streets, and heritage inns, transports visitors to a different era.</p>
      
      <h3>Culinary Delights</h3>
      <p>Goan cuisine represents a unique fusion of Indian and Portuguese influences. Seafood dominates the menu, with dishes like prawn curry, fish recheado, and crab xacuti highlighting local spices and cooking techniques. The Portuguese-influenced vindaloo, sorpotel, and bebinca (layered dessert) offer distinctive flavors found nowhere else in India. No Goan experience is complete without sampling feni, a local spirit distilled from cashew fruit or coconut palm.</p>
      
      <h3>Vibrant Nightlife and Music Scene</h3>
      <p>Goa's reputation for nightlife is well-deserved, with options ranging from beachside shacks playing chilled tunes to world-class clubs hosting international DJs. The state's association with psychedelic trance music has evolved into a diverse music scene, with the Sunburn Festival and numerous beach parties attracting music lovers from around the globe. For those seeking a more relaxed evening, sunset beach cafes offer perfect settings for unwinding with cocktails and conversation.</p>
      
      <h3>Beyond the Beaches</h3>
      <p>While beaches dominate Goa's appeal, the state offers much more. The Dudhsagar Falls, among India's tallest waterfalls, cascades dramatically through dense forest. Spice plantations in the hinterland offer tours showcasing the cultivation of vanilla, cardamom, and pepper. Wildlife sanctuaries like Bhagwan Mahavir and Cotigao protect the Western Ghats' biodiversity, including the elusive black panther.</p>
      
      <p>Whether you seek adventure, relaxation, cultural exploration, or simply a place to party, Goa's magnetic charm ensures that visitors leave with sun-kissed skin, satisfied appetites, and memories to last a lifetime.</p>
    `,
    images: [
      "/blogs/blog-images.svg#goa-beaches",
      "/blogs/blog-images.svg#goa-portuguese-architecture",
      "/blogs/blog-images.svg#goa-seafood",
    ],
    excerpt: "Discover the perfect blend of golden beaches, Portuguese heritage, delectable cuisine, and vibrant nightlife in India's favorite coastal paradise...",
    author: "Maria D'Souza",
    date: "October 12, 2023",
    readTime: "7 min read"
  },
};

export default function BlogDetails() {
  const { id } = useParams();
  const blog = blogData[id];

  const [currentImage, setCurrentImage] = useState(0);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4 text-[#2E4D38]">
          Blog not found
        </h1>
        <Link to="/blogs">
          <button className="px-5 py-2 bg-[#2E4D38] text-white rounded-full hover:bg-[#24402e] transition">
            ← Back to Blogs
          </button>
        </Link>
      </div>
    );
  }

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % blog.images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + blog.images.length) % blog.images.length);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[50vh] "
        style={{
          backgroundImage: "url('/blog-details-hero.jpg')", // put in /public
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
            {blog.title}
          </h1>
          <p className="mt-4 text-lg max-w-2xl">{blog.excerpt}</p>
          <div className="flex items-center mt-4 text-sm text-white bg-black bg-opacity-30 px-4 py-2 rounded-full">
            <span className="font-medium">{blog.author}</span>
            <span className="mx-2">•</span>
            <span>{blog.date}</span>
            <span className="mx-2">•</span>
            <span>{blog.readTime}</span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto p-6">
        {/* Image Slider */}
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-6">
          <img
            src={blog.images[currentImage]}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-[#2E4D38] text-white p-2 rounded-full hover:bg-[#24402e] transition"
          >
            ❮
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-[#2E4D38] text-white p-2 rounded-full hover:bg-[#24402e] transition"
          >
            ❯
          </button>
        </div>

        {/* Blog Content */}
        <div className="text-gray-700 leading-relaxed mb-6 blog-content" dangerouslySetInnerHTML={{ __html: blog.content }}></div>

        {/* Back Button */}
        <Link to="/blogs">
          <button className="px-5 py-2 bg-[#2E4D38] text-white rounded-full hover:bg-[#24402e] transition mb-12">
            ← Back to Blogs
          </button>
        </Link>

        {/* Related Blogs */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#2E4D38] mb-6">
            Related Blogs
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.keys(blogData)
              .filter((key) => key !== id)
              .map((relatedId) => (
                <div
                  key={relatedId}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
                >
                  <img
                    src={blogData[relatedId].images[0]}
                    alt={blogData[relatedId].title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#2E4D38]">
                      {blogData[relatedId].title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {blogData[relatedId].excerpt.slice(0, 80)}...
                    </p>
                    <Link to={`/blogs/${relatedId}`}>
                      <button className="mt-3 px-4 py-2 bg-[#2E4D38] text-white rounded-full hover:bg-[#24402e] transition text-sm">
                        Read More →
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
