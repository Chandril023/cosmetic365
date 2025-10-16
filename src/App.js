import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ArrowUp, MessageCircle, Phone, Star, Menu, Image as ImageIcon, CheckCircle } from 'lucide-react';

export default function CosmeticTherapy() {
  // State for UI/Interactions
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0); 
  const [currentReviewSlide, setCurrentReviewSlide] = useState(0); 
  const [openLocation, setOpenLocation] = useState(null); 
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayData, setOverlayData] = useState({ title: '', images: [], currentIndex: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showContactBubble, setShowContactBubble] = useState(false);
  const [openProcedure, setOpenProcedure] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // New state for form submission confirmation toast
  const [showConfirmation, setShowConfirmation] = useState(false); 

  // State for form data
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', procedure: '', message: '' });

  // --- Data Definitions ---
  const heroSlides = [
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1583947581924-860bda21a7f3?w=1200&h=800&fit=crop'
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&h=500&fit=crop'
  ];
  
  const hospitals = ['🏥 Johns Hopkins', '🏥 Mayo Clinic', '🏥 Cleveland Clinic', '🏥 Mass General', '🏥 UCLA Medical', '🏥 Stanford Health'];

  const procedures = [
    { name: 'Rhinoplasty', shortDesc: 'Nose Reshaping Surgery', fullDesc: 'Rhinoplasty is a surgical procedure that reshapes the nose to enhance facial harmony and improve breathing function. Dr. Mitchell specializes in both cosmetic and functional rhinoplasty, creating natural-looking results.', images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop'] },
    { name: 'Facelift', shortDesc: 'Facial Rejuvenation', fullDesc: 'A facelift is designed to reduce visible signs of aging in the face and neck. This procedure tightens underlying muscles, removes excess fat, and redrapes facial skin for a more youthful appearance.', images: ['https://images.unsplash.com/photo-1583947581924-860bda21a7f3?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=600&fit=crop'] },
    { name: 'Breast Augmentation', shortDesc: 'Breast Enhancement', fullDesc: 'Breast augmentation enhances breast size and shape using implants or fat transfer. Dr. Mitchell works closely with each patient to select the appropriate size and placement for natural results.', images: ['https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&h=600&fit=crop'] },
    { name: 'Liposuction', shortDesc: 'Body Contouring', fullDesc: 'Liposuction removes stubborn fat deposits that resist diet and exercise, sculpting specific areas of the body for a more defined, proportionate contour.', images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&h=600&fit=crop'] },
    { name: 'Tummy Tuck', shortDesc: 'Abdominoplasty', fullDesc: 'A tummy tuck removes excess skin and fat from the abdomen while tightening weakened muscles. Ideal for post-pregnancy or weight loss patients.', images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=600&fit=crop'] },
    { name: 'Eyelid Surgery', shortDesc: 'Blepharoplasty', fullDesc: 'Eyelid surgery rejuvenates the eye area by removing excess skin, fat, and muscle. This corrects drooping eyelids and under-eye bags for a more alert appearance.', images: ['https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=600&fit=crop'] }
  ];

  const googleReviews = [
    { name: 'Jessica M.', review: 'Dr. Mitchell completely transformed not just my appearance, but my entire outlook on life. The results exceeded my wildest expectations!', rating: 5, date: '2 weeks ago' },
    { name: 'Robert T.', review: 'After losing 100 pounds, I had so much excess skin. Dr. Mitchell gave me back the body I worked so hard for. Her compassion and skill are unmatched.', rating: 5, date: '1 month ago' },
    { name: 'Amanda K.', review: 'As a mother of three, I thought I\'d never feel confident again. Dr. Mitchell\'s mommy makeover changed everything. Six months later, I\'ve never felt more beautiful!', rating: 5, date: '3 months ago' },
    { name: 'Michael S.', review: 'From consultation to final follow-up, Dr. Mitchell treated me like family. My results look completely natural—exactly what I hoped for!', rating: 5, date: '2 months ago' }
  ];

  const clinicLocations = [
    { name: 'Beverly Hills Medical Plaza', address: '123 Aesthetic Boulevard, Suite 500, Beverly Hills, CA 90210', hours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM', phone: '+1 (555) 123-4567', email: 'beverlyhills@cosmetictherapy.com' },
    { name: 'Manhattan Aesthetic Center', address: '456 Park Avenue, Floor 12, New York, NY 10022', hours: 'Mon-Fri: 8AM-7PM, Sat: 9AM-3PM', phone: '+1 (555) 987-6543', email: 'newyork@cosmetictherapy.com' },
    { name: 'Miami Beach Surgical Suite', address: '789 Ocean Drive, Penthouse Suite, Miami Beach, FL 33139', hours: 'Mon-Fri: 9AM-5PM, Sat: 10AM-2PM', phone: '+1 (555) 456-7890', email: 'miami@cosmetictherapy.com' }
  ];

  // --- Effects and Handlers ---
  // Auto-slide for Hero carousel
  useEffect(() => {
    const interval = setInterval(() => setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length), 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Scroll to Top visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset by navbar height for fixed header
      const navbarHeight = 120; 
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const openOverlay = (procedure) => {
    setOverlayData({ title: procedure.name, images: procedure.images, currentIndex: 0 });
    setOverlayOpen(true);
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Consultation Request Submitted:', formData);
    
    // Show custom confirmation toast instead of alert
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 4000); 

    setFormData({ name: '', email: '', phone: '', procedure: '', message: '' });
  };

  const nextOverlayImage = () => setOverlayData(prev => ({ ...prev, currentIndex: (prev.currentIndex + 1) % prev.images.length }));
  const prevOverlayImage = () => setOverlayData(prev => ({ ...prev, currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length }));

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      
      {/* Load Tailwind and ensure responsive meta tag for mobile */}
      <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <style jsx>{`
        /* Using Inter as font-sans and Playfair Display as font-serif for luxury look */
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }

        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 30s linear infinite; }
      `}</style>

      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 shadow-lg">
        {/* Top Bar - High Visibility Contact */}
        <div className="bg-black text-white py-3 px-4 text-center text-xs md:text-sm">
          <span>✨ Call  </span>
          <span className="font-bold text-base md:text-lg mx-2 tracking-wider">+(91) 123-4567</span>
        </div>
        
        {/* Main Navigation */}
        <div className="bg-white py-4 px-4 border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-black tracking-tight">
              Dr. Sarah Mitchell
            </h1>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition border border-gray-200 shadow-sm"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <ul className="hidden md:flex gap-8 text-sm">
              {['home', 'about', 'gallery', 'procedures', 'reviews', 'contact'].map((item) => (
                <li key={item}><button onClick={() => scrollToSection(item)} className="text-gray-700 hover:text-black font-semibold transition uppercase tracking-wider">{item}</button></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-xl">
            {['home', 'about', 'gallery', 'procedures', 'reviews', 'contact'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item)} className="w-full text-left px-6 py-4 hover:bg-gray-50 transition border-b border-gray-100 capitalize font-medium text-lg tracking-wider">
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-[120px] md:pt-[100px] border-b-4 border-gray-100 lg-px-5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-0">
          
          {/* Left: Image Carousel */}
          <div className="relative h-[200px] md:h-[500px] overflow-hidden">
            {heroSlides.map((img, idx) => (
              <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentHeroSlide ? 'opacity-100' : 'opacity-0'}`}>
                <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
            
            {/* Carousel Controls */}
            <button onClick={() => setCurrentHeroSlide((currentHeroSlide - 1 + heroSlides.length) % heroSlides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition shadow-lg z-10" aria-label="Previous Slide">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => setCurrentHeroSlide((currentHeroSlide + 1) % heroSlides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition shadow-lg z-10" aria-label="Next Slide">
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {heroSlides.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentHeroSlide(idx)} className={`h-2 rounded-full transition-all ${idx === currentHeroSlide ? 'bg-white w-8' : 'bg-white/60 w-2'}`} aria-label={`Go to slide ${idx + 1}`} />
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="bg-black text-white p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4 leading-tight">Crafting Confidence, Sustainably</h2>
            <p className="text-lg md:text-xl mb-6 text-gray-300">Experience world-class cosmetic surgery and personalized care.</p>
            <p className="text-sm md:text-base text-gray-400 mb-8 tracking-wider">Board-Certified Plastic Surgeon | 15+ Years Experience</p>
            <button onClick={() => scrollToSection('contact')} className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:scale-[1.02] transition shadow-xl w-full md:w-auto tracking-wider">
              Book Your Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Hospital Affiliations Marquee */}
      <div className="bg-gray-100 border-y-2 border-gray-300 py-4 overflow-hidden">
        <div className="flex animate-scroll whitespace-nowrap">
          {[...hospitals, ...hospitals].map((hospital, idx) => (
            <div key={idx} className="inline-flex items-center mx-12 text-gray-600 font-semibold text-base py-1">{hospital}</div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 px-10 border-b-4 border-gray-100 ">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white ring-8 ring-gray-100 transition-all duration-500 hover:ring-black/10">
              <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop" alt="Dr. Sarah Mitchell" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Meet Dr. Sarah Mitchell</h2>
            <h3 className="text-2xl font-semibold mb-6 text-gray-700 border-b pb-2 border-gray-300">Board-Certified Plastic Surgeon, ABPS</h3>
            
            <div className="space-y-5 text-gray-700">
              <p className="text-lg leading-relaxed"><strong className="text-black">Dr. Mitchell</strong> is a highly skilled, compassionate surgeon who trained at <strong className="text-black">Harvard Medical School</strong> and completed residency at <strong className="text-black">Johns Hopkins</strong>. With over 15 years and 5,000 procedures, she combines surgical precision with a deep sense of aesthetic artistry.</p>
              
              <div className="bg-gray-100 border-l-4 border-black p-6 rounded-r-xl mt-6 shadow-md">
                <p className="italic text-gray-800 text-xl font-serif">"A surgical plan must be as unique as the individual. We focus on natural, enduring results."</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-5 md:px-4 border-b-4 border-gray-100 ">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4">Transformation Gallery</h2>
        <p className="text-gray-600 text-lg text-center mb-12">Witness the artistry of aesthetic transformation. Click to enlarge.</p>
        
        {/* Horizontal Marquee Scroll for mobile */}
        <div className="overflow-x-auto overflow-hidden px-4 md:px-0">
          <div className="flex gap-6 animate-scroll whitespace-nowrap pb-4">
            {[...galleryImages, ...galleryImages].map((img, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 w-64 h-80 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition border-4 border-white ring-4 ring-gray-100 hover:ring-black/10 duration-300 cursor-pointer" 
                onClick={() => openOverlay({ name: 'Gallery', images: galleryImages })}
              >
                <img 
                  src={img} 
                  alt={`Gallery before/after ${idx + 1}`} 
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-500" 
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x500/000/fff?text=Image+Loading+Error"; }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Procedures Section (Stacked Accordion) */}
<section id="procedures" className="py-20 px-4 bg-gray-50">
  <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">Core Procedures</h2>

  <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
    {procedures.map((proc, idx) => (
      <div key={idx} className="w-full border-t last:border-b rounded-none overflow-hidden shadow-none">
        {/* Accordion Header */}
        <button
          onClick={() => setOpenProcedure(openProcedure === idx ? null : idx)}
          className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-100 focus:outline-none"
        >
          <div className="text-left">
            <h3 className="text-xl md:text-2xl font-semibold font-serif">{proc.name}</h3>
            <p className="text-gray-600 text-sm md:text-base">{proc.shortDesc}</p>
          </div>
          <ChevronRight
            className={`w-6 h-6 text-black transition-transform ${
              openProcedure === idx ? 'rotate-90' : 'rotate-0'
            }`}
          />
        </button>

        {/* Accordion Content */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            openProcedure === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-5 bg-white border-t border-gray-200">
            <p className="text-gray-700 text-base md:text-lg mb-4">{proc.fullDesc}</p>
            <button
              onClick={() => openOverlay(proc)}
              className="inline-flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition shadow-md text-sm tracking-wider"
            >
              <ImageIcon className="w-5 h-5" />
              View Before & After
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


{/* Reviews Section - Responsive & Mobile-Friendly */}
<section id="reviews" className="relative px-4 py-20 border-b-4 border-gray-100 bg-white">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl">

    {/* Left: Info Section */}
    <div className="bg-black text-white p-6 sm:p-8 md:p-12 flex flex-col justify-center min-h-[350px] sm:min-h-[400px] md:min-h-[550px]">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6 leading-tight">
        Real Patients, Real Experiences
      </h2>
      <p className='text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg'>
        Hear directly from our satisfied clients about their journey to renewed confidence. We are proudly 5-star rated.
      </p>
      <a
        href="https://www.google.com/search?q=Dr.+Sarah+Mitchell+reviews"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-white text-black font-semibold px-5 py-3 sm:px-6 sm:py-4 rounded-full hover:bg-gray-200 transition shadow-lg w-fit text-sm sm:text-base tracking-wider"
      >
        <span>Read All Google Reviews</span>
      </a>
    </div>

    {/* Right: Carousel Section */}
    <div className="relative bg-gray-50 px-4 py-10 sm:px-6 sm:py-14 md:px-10 md:py-20 min-h-[350px] sm:min-h-[400px] md:min-h-[550px] overflow-hidden">
      {googleReviews.map((review, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 flex flex-col justify-center items-center text-center px-2 sm:px-6 ${
            idx === currentReviewSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Review Text */}
          <h4 className="font-serif italic text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-black leading-snug max-h-[180px] overflow-hidden">
            "{review.review}"
          </h4>

          {/* Rating */}
          <div className="flex justify-center gap-1 mb-2 sm:mb-4">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-black text-black" />
            ))}
          </div>

          {/* Reviewer Info */}
          <p className="text-base sm:text-lg md:text-xl font-semibold mb-1 text-black tracking-wider">{review.name}</p>
          <p className="text-sm md:text-base text-gray-500">{review.date}</p>
        </div>
      ))}

      {/* Carousel Controls */}
      <button
        onClick={() => setCurrentReviewSlide((prev) => (prev - 1 + googleReviews.length) % googleReviews.length)}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-gray-100 p-2 sm:p-3 rounded-full transition shadow-lg z-20 border border-gray-200"
        aria-label="Previous Review"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <button
        onClick={() => setCurrentReviewSlide((prev) => (prev + 1) % googleReviews.length)}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-gray-100 p-2 sm:p-3 rounded-full transition shadow-lg z-20 border border-gray-200"
        aria-label="Next Review"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {googleReviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentReviewSlide(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentReviewSlide ? 'bg-black w-6' : 'bg-black/40 w-2'
            }`}
            aria-label={`Go to review ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  </div>
</section>


      {/* Contact Form */}
      <section id="contact" className="py-20 px-4 border-b-4 border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center py-5 mb-4">Make a Query</h2>

          
          <div className="bg-gray-50 rounded-2xl shadow-2xl p-8 md:p-12 border-4 border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Full Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-none bg-white transition" placeholder="Enter your full name" required />
              </div>
              {/* Email */}
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-none bg-white transition" placeholder="your.email@example.com" required />
              </div>
              {/* Phone */}
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-none bg-white transition" placeholder="+1 (555) 000-0000" required />
              </div>
              {/* Procedure */}
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Procedure of Interest</label>
                <select name="procedure" value={formData.procedure} onChange={handleInputChange} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-none bg-white appearance-none transition">
                  <option value="">Select a procedure (Optional)</option>
                  {procedures.map((proc, idx) => <option key={idx} value={proc.name.toLowerCase()}>{proc.name}</option>)}
                </select>
              </div>
              {/* Message */}
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Your Message *</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={5} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-none resize-none bg-white transition" placeholder="Tell us about your goals and availability..." required></textarea>
              </div>
              <button type="submit" className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-gray-800 transition text-lg shadow-xl hover:shadow-2xl tracking-wider">
                Submit 
              </button>
            </form>
          </div>
        </div>
      </section>

{/* Clinics - Modern Accordion */}
<section className="py-20 px-4 bg-white w-full">
  <h3 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-black">
    Chambers
  </h3>

  <div className="w-full max-w-4xl mx-auto space-y-4">
    {clinicLocations.map((clinic, idx) => (
      <div
        key={idx}
        className={`w-full border border-gray-200 rounded-lg shadow-sm transition-all duration-300 ${
          openLocation === idx ? 'bg-gray-50' : 'bg-white'
        }`}
      >
        {/* Accordion Header */}
        <button
          onClick={() => setOpenLocation(openLocation === idx ? null : idx)}
          className="w-full flex items-center justify-between px-6 py-5 text-left text-black hover:bg-gray-100 transition rounded-t-lg focus:outline-none"
          aria-expanded={openLocation === idx}
        >
          <h4 className="text-lg md:text-xl font-semibold">{clinic.name}</h4>
          <ChevronRight
            className={`w-5 h-5 transform transition-transform ${
              openLocation === idx ? 'rotate-90' : ''
            }`}
          />
        </button>

        {/* Accordion Content */}
        <div
          className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
            openLocation === idx ? 'max-h-screen py-4' : 'max-h-0 py-0'
          }`}
        >
          <div className="text-gray-700 text-sm md:text-base space-y-2 border-t border-gray-200 pt-4">
            <p>
              <strong className="text-black">Address:</strong> {clinic.address}
            </p>
            <p>
              <strong className="text-black">Hours:</strong> {clinic.hours}
            </p>
            <p>
              <strong className="text-black">Phone:</strong>{' '}
              <a
                href={`tel:${clinic.phone}`}
                className="text-blue-600 underline hover:text-blue-800 transition"
              >
                {clinic.phone}
              </a>
            </p>
            <p>
              <strong className="text-black">Email:</strong>{' '}
              <a
                href={`mailto:${clinic.email}`}
                className="text-blue-600 underline hover:text-blue-800 transition"
              >
                {clinic.email}
              </a>
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(clinic.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block pt-2 text-sm font-medium text-blue-700 underline hover:text-blue-900 transition"
            >
              Get Directions (Opens in new tab)
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-serif font-bold mb-2">Dr. Sarah Mitchell</h3>
          <p className="text-gray-400 mb-6 text-sm tracking-[0.2em] uppercase">Aesthetic & Reconstructive Surgery</p>
          <p className="text-sm text-gray-500 mb-6">Serving Beverly Hills, Manhattan, and Miami Beach.</p>
          <div className="flex justify-center gap-6 border-t border-gray-700 pt-6">
            <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition text-sm">About</button>
            <button onClick={() => scrollToSection('procedures')} className="text-gray-400 hover:text-white transition text-sm">Services</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-white transition text-sm">Contact</button>
          </div>
          <div className="pt-6">
            <p className="text-xs text-gray-600">&copy; 2025 Cosmetic Therapy. All rights reserved. | Board-Certified Plastic Surgeon</p>
          </div>
        </div>
      </footer>

     {/* Overlay Modal (Smaller Fixed Gallery Viewer) */}
{overlayOpen && (
  <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center">
    <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-[90%] p-6 md:p-8">
      {/* Close Button */}
      <button
        onClick={() => setOverlayOpen(false)}
        className="absolute -top-4 -right-4 bg-white text-black rounded-full p-3 hover:bg-gray-200 transition shadow-lg"
        aria-label="Close Gallery"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Title */}
      <h2 className="text-black text-2xl md:text-3xl font-serif font-bold text-center mb-6">
        {overlayData.title} 
      </h2>

      {/* Image Container */}
      <div className="relative h-[280px] md:h-[400px] bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
        <img
          src={overlayData.images[overlayData.currentIndex]}
          alt={`${overlayData.title} ${overlayData.currentIndex + 1}`}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/800x600/000/fff?text=Image+Not+Available";
          }}
        />

        {/* Navigation Arrows */}
        <button
          onClick={prevOverlayImage}
          className="absolute left-3 md:left-4 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full transition shadow-lg"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-black" />
        </button>
        <button
          onClick={nextOverlayImage}
          className="absolute right-3 md:right-4 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full transition shadow-lg"
          aria-label="Next Image"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-black" />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {overlayData.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() =>
                setOverlayData((prev) => ({ ...prev, currentIndex: idx }))
              }
              className={`h-2 rounded-full transition-all ${
                idx === overlayData.currentIndex
                  ? "bg-black w-6"
                  : "bg-gray-400 w-2"
              }`}
              aria-label={`View image ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
)}


      {/* Confirmation Toast (Replaces Alert) */}
      {showConfirmation && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-[9999] p-4">
          <div className="bg-black text-white p-5 rounded-xl shadow-2xl flex items-center gap-3 border-2 border-[#D4AF37] transition-all duration-300">
            <CheckCircle className="w-6 h-6 text-[#D4AF37]" />
            <span className="font-semibold">Request Sent!</span>
            <span className="text-sm text-gray-300">We will contact you within 24 hours.</span>
            <button onClick={() => setShowConfirmation(false)} className="ml-4 p-1 rounded-full hover:bg-white/20 transition" aria-label="Dismiss">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-28 right-6 md:right-8 bg-black text-white p-4 md:p-5 rounded-full shadow-2xl hover:scale-110 transition z-40" aria-label="Scroll to Top">
          <ArrowUp className="w-6 h-6 md:w-7 md:h-7" />
        </button>
      )}

      {/* Contact Bubble (Fixed/Floating Quick Access) */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40">
        {showContactBubble && (
          <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-5 w-64 border-2 border-gray-300 transform scale-100 origin-bottom-right transition-all duration-300">
            <h4 className='font-bold text-lg mb-3'>Quick Contact</h4>
            <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 hover:bg-gray-100 rounded-xl transition mb-3 group">
              <div className="bg-green-500 p-3 rounded-full text-white group-hover:scale-110 transition">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="font-semibold text-black">WhatsApp Chat</span>
            </a>
            <a href="tel:+15551234567" className="flex items-center gap-3 p-4 hover:bg-gray-100 rounded-xl transition group">
              <div className="bg-black p-3 rounded-full text-white group-hover:scale-110 transition">
                <Phone className="w-5 h-5" />
              </div>
              <span className="font-semibold text-black">Call Us Now</span>
            </a>
          </div>
        )}
        {/* Toggle Button */}
        <button onClick={() => setShowContactBubble(!showContactBubble)} className="bg-black text-white p-5 rounded-full shadow-2xl hover:scale-110 transition z-40" aria-label="Toggle Contact Options">
          {showContactBubble ? <X className="w-7 h-7" /> : <Phone className="w-7 h-7" />}
        </button>
      </div>

    </div>
  );
}
