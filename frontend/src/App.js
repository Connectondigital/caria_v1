import { useState, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Search,
  Bed,
  Bath,
  Square
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Sample property data
const properties = [
  {
    id: 1,
    slug: "luxury-villa-kyrenia",
    title: "Luxury Sea View Villa",
    location: "Kyrenia, Northern Cyprus",
    price: "€850,000",
    beds: 4,
    baths: 3,
    area: "320",
    image: "https://images.unsplash.com/photo-1694967832949-09984640b143?w=800&h=600&fit=crop",
    tag: "NEW LISTING",
    region: "KYRENIA"
  },
  {
    id: 2,
    slug: "penthouse-iskele",
    title: "Modern Penthouse",
    location: "Iskele, Northern Cyprus",
    price: "€425,000",
    beds: 3,
    baths: 2,
    area: "185",
    image: "https://images.unsplash.com/photo-1642976975710-1d8890dbf5ab?w=800&h=600&fit=crop",
    tag: "FOR SALE",
    region: "ISKELE"
  },
  {
    id: 3,
    slug: "beachfront-apartment-famagusta",
    title: "Beachfront Apartment",
    location: "Famagusta, Northern Cyprus",
    price: "€295,000",
    beds: 2,
    baths: 2,
    area: "120",
    image: "https://images.unsplash.com/photo-1739140019682-05bd100b5a5e?w=800&h=600&fit=crop",
    tag: "EXCLUSIVE",
    region: "FAMAGUSTA"
  },
  {
    id: 4,
    slug: "mediterranean-villa-kyrenia",
    title: "Mediterranean Villa",
    location: "Kyrenia, Northern Cyprus",
    price: "€1,250,000",
    beds: 5,
    baths: 4,
    area: "450",
    image: "https://images.unsplash.com/photo-1728049006363-f8e583040180?w=800&h=600&fit=crop",
    tag: "PREMIUM",
    region: "KYRENIA"
  },
  {
    id: 5,
    slug: "coastal-residence-iskele",
    title: "Coastal Residence",
    location: "Iskele, Northern Cyprus",
    price: "€520,000",
    beds: 3,
    baths: 3,
    area: "210",
    image: "https://images.unsplash.com/photo-1760611655987-d348d6d28174?w=800&h=600&fit=crop",
    tag: "NEW LISTING",
    region: "ISKELE"
  },
  {
    id: 6,
    slug: "luxury-duplex-famagusta",
    title: "Luxury Duplex",
    location: "Famagusta, Northern Cyprus",
    price: "€680,000",
    beds: 4,
    baths: 3,
    area: "280",
    image: "https://images.unsplash.com/photo-1714495412938-addb0ed62c1e?w=800&h=600&fit=crop",
    tag: "FOR SALE",
    region: "FAMAGUSTA"
  }
];

// Featured properties for second slider
const featuredProperties = [
  {
    id: 7,
    slug: "elite-villa-esentepe",
    title: "Elite Hillside Villa",
    location: "Esentepe, Northern Cyprus",
    price: "€1,850,000",
    beds: 6,
    baths: 5,
    area: "580",
    image: "https://images.unsplash.com/photo-1649678356183-54f92839e53b?w=800&h=600&fit=crop",
    tag: "LUXURY",
    region: "KYRENIA"
  },
  {
    id: 8,
    slug: "oceanfront-mansion-kyrenia",
    title: "Oceanfront Mansion",
    location: "Kyrenia, Northern Cyprus",
    price: "€2,400,000",
    beds: 7,
    baths: 6,
    area: "720",
    image: "https://images.unsplash.com/photo-1763656259774-cbb145e9b4d3?w=800&h=600&fit=crop",
    tag: "EXCLUSIVE",
    region: "KYRENIA"
  },
  {
    id: 9,
    slug: "designer-penthouse-iskele",
    title: "Designer Penthouse",
    location: "Iskele, Northern Cyprus",
    price: "€890,000",
    beds: 4,
    baths: 3,
    area: "310",
    image: "https://images.unsplash.com/photo-1738168273959-952fdc961991?w=800&h=600&fit=crop",
    tag: "NEW",
    region: "ISKELE"
  },
  {
    id: 10,
    slug: "garden-villa-famagusta",
    title: "Garden Villa Estate",
    location: "Famagusta, Northern Cyprus",
    price: "€1,100,000",
    beds: 5,
    baths: 4,
    area: "420",
    image: "https://images.unsplash.com/photo-1738168279272-c08d6dd22002?w=800&h=600&fit=crop",
    tag: "PREMIUM",
    region: "FAMAGUSTA"
  }
];

// Agent data
const agents = [
  { id: 1, name: "Maria Konstantinou", region: "Kyrenia", thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop" },
  { id: 2, name: "Ahmet Yilmaz", region: "Iskele", thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop" },
  { id: 3, name: "Elena Petrova", region: "Famagusta", thumbnail: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop" },
  { id: 4, name: "Kemal Ozturk", region: "Kyrenia", thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" },
];

// Blog articles
const blogArticles = [
  { id: 1, title: "Investment Opportunities in Northern Cyprus", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=400&fit=crop" },
  { id: 2, title: "Guide to Buying Property as a Foreign Investor", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=400&fit=crop" },
  { id: 3, title: "Top 5 Locations for Luxury Living", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=400&fit=crop" },
  { id: 4, title: "Understanding Property Law in Cyprus", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=400&fit=crop" },
];

// Partner logos placeholder
const partners = [
  { id: 1, name: "Partner 1" },
  { id: 2, name: "Partner 2" },
  { id: 3, name: "Partner 3" },
  { id: 4, name: "Partner 4" },
  { id: 5, name: "Partner 5" },
];

// ============================================
// SECTION 1: HEADER COMPONENT
// ============================================
const Header = ({ isTransparent = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${isTransparent ? 'bg-transparent' : 'bg-caria-slate shadow-md'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" data-testid="logo">
            <span className="text-2xl font-serif font-bold text-white tracking-wider">
              CARIA ESTATES
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/properties" className="text-white text-sm tracking-wide hover:text-caria-turquoise transition-colors" data-testid="nav-properties">
              PROPERTIES
            </Link>
            <Link to="/services" className="text-white text-sm tracking-wide hover:text-caria-turquoise transition-colors" data-testid="nav-services">
              SERVICES
            </Link>
            <Link to="/about" className="text-white text-sm tracking-wide hover:text-caria-turquoise transition-colors" data-testid="nav-about">
              ABOUT US
            </Link>
            <Link to="/contact" className="text-white text-sm tracking-wide hover:text-caria-turquoise transition-colors" data-testid="nav-contact">
              CONTACT
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
            data-testid="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-caria-slate/95 backdrop-blur-sm">
          <nav className="flex flex-col px-6 py-4 space-y-4">
            <Link to="/properties" className="text-white text-sm tracking-wide" data-testid="mobile-nav-properties">PROPERTIES</Link>
            <Link to="/services" className="text-white text-sm tracking-wide" data-testid="mobile-nav-services">SERVICES</Link>
            <Link to="/about" className="text-white text-sm tracking-wide" data-testid="mobile-nav-about">ABOUT US</Link>
            <Link to="/contact" className="text-white text-sm tracking-wide" data-testid="mobile-nav-contact">CONTACT</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

// ============================================
// SECTION 1: HERO COMPONENT (Full-screen Video)
// ============================================
const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden" data-testid="hero-section">
      {/* Background Video - using image fallback */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1694967832949-09984640b143?w=1920&h=1080&fit=crop"
          className="w-full h-full object-cover"
        >
          <source src="/videos/caria-hero.mp4" type="video/mp4" />
        </video>
        {/* Fallback image if video doesn't load */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1694967832949-09984640b143?w=1920&h=1080&fit=crop')`,
            zIndex: -1 
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Content - Bottom Left Aligned */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl w-full mx-auto px-6 pb-20 md:pb-32">
          {/* Small Label */}
          <p className="text-white/80 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 animate-fade-in" data-testid="hero-label">
            CARIA ESTATES · NORTHERN CYPRUS
          </p>
          
          {/* Main Heading */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-medium leading-tight mb-6 max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }} data-testid="hero-heading">
            Exclusive Luxury Properties<br />in Northern Cyprus
          </h1>
          
          {/* Description */}
          <p className="text-white/90 text-base md:text-lg mb-8 max-w-xl animate-fade-in" style={{ animationDelay: '0.4s' }} data-testid="hero-description">
            Discover exceptional homes and investment opportunities along the Mediterranean coast with our expert guidance.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Link 
              to="/properties" 
              className="btn-primary inline-flex items-center justify-center px-8 py-4 text-white font-medium text-sm tracking-wider uppercase rounded-sm"
              data-testid="hero-btn-properties"
            >
              View Properties
            </Link>
            <Link 
              to="/contact" 
              className="btn-outline inline-flex items-center justify-center px-8 py-4 border border-white text-white font-medium text-sm tracking-wider uppercase rounded-sm hover:bg-white hover:text-caria-slate transition-all"
              data-testid="hero-btn-consultation"
            >
              Request Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 2: INTRO SECTION (Mint Background)
// ============================================
const IntroSection = () => {
  return (
    <section className="bg-caria-mint py-24 md:py-32" data-testid="intro-section">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-caria-slate text-base md:text-lg leading-relaxed font-light" data-testid="intro-text">
          Caria Estates provides expert guidance and luxury real estate services in Northern Cyprus. 
          We combine local insight with global standards to offer a refined, transparent property experience. 
          Whether you are seeking a coastal retreat, investment opportunity, or your dream Mediterranean home, 
          our dedicated team is here to guide you every step of the way.
        </p>
      </div>
    </section>
  );
};

// ============================================
// SECTION 3: REGION TABS
// ============================================
const RegionTabs = ({ activeRegion, setActiveRegion }) => {
  const regions = ["DISCOVER ALL", "KYRENIA", "ISKELE", "FAMAGUSTA"];

  return (
    <div className="bg-white py-8 border-b border-gray-100" data-testid="region-tabs">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center space-x-8 md:space-x-16">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`tab-item text-xs md:text-sm tracking-[0.15em] pb-2 ${
                activeRegion === region 
                  ? 'text-caria-slate active' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              data-testid={`tab-${region.toLowerCase().replace(' ', '-')}`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// SECTION 4: PROPERTY CARD COMPONENT
// ============================================
const PropertyCard = ({ property }) => {
  return (
    <Link 
      to={`/properties/${property.slug}`}
      className="property-card block bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden"
      data-testid={`property-card-${property.id}`}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="property-image w-full h-full object-cover"
        />
        {/* Tag */}
        <span className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-medium tracking-wider text-caria-slate rounded-sm">
          {property.tag}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-xl font-medium text-caria-slate mb-1" data-testid={`property-title-${property.id}`}>
          {property.title}
        </h3>
        <p className="text-xs tracking-wider text-gray-400 uppercase mb-3">
          {property.location}
        </p>
        <p className="text-lg font-semibold text-caria-slate mb-3">
          {property.price}
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <Bed size={16} className="mr-1" />
            {property.beds} bed
          </span>
          <span className="flex items-center">
            <Bath size={16} className="mr-1" />
            {property.baths} bath
          </span>
          <span className="flex items-center">
            <Square size={16} className="mr-1" />
            {property.area} m²
          </span>
        </div>
      </div>
    </Link>
  );
};

// ============================================
// CURATED PROPERTY CARD (Large card for slider)
// ============================================
const CuratedPropertyCard = ({ property }) => {
  return (
    <Link 
      to={`/properties/${property.slug}`}
      className="curated-property-card flex flex-col h-full bg-white rounded-lg overflow-hidden"
      data-testid={`curated-card-${property.id}`}
    >
      {/* Large Image Container */}
      <div className="relative h-60 md:h-80 lg:h-96 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="curated-property-image w-full h-full object-cover"
        />
        {/* Tag Badge */}
        <span className="absolute top-5 left-5 bg-white px-4 py-2 text-xs font-medium tracking-wider text-caria-slate rounded">
          {property.tag}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="font-serif text-2xl md:text-3xl font-medium text-caria-slate mb-2" data-testid={`curated-title-${property.id}`}>
          {property.title}
        </h3>
        <p className="text-xs tracking-[0.15em] text-gray-400 uppercase mb-4">
          {property.location}
        </p>
        <p className="text-xl md:text-2xl font-semibold text-caria-slate mb-auto">
          {property.price}
        </p>
        
        {/* Stats at bottom */}
        <div className="flex items-center space-x-6 text-sm text-gray-500 mt-6 pt-6 border-t border-gray-100">
          <span className="flex items-center">
            <Bed size={18} className="mr-2" />
            {property.beds} bed
          </span>
          <span className="flex items-center">
            <Bath size={18} className="mr-2" />
            {property.baths} bath
          </span>
          <span className="flex items-center">
            <Square size={18} className="mr-2" />
            {property.area} m²
          </span>
        </div>
      </div>
    </Link>
  );
};

// ============================================
// SECTION 4: CURATED LISTINGS SLIDER (Strand-style)
// ============================================
const CuratedListings = ({ activeRegion }) => {
  const sliderRef = useRef(null);
  const [activeTag, setActiveTag] = useState('All');

  // Extract unique tags from properties
  const tags = ['All', ...new Set(properties.map(p => p.tag))];

  // Filter by region first
  const filteredByRegion = activeRegion === "DISCOVER ALL" 
    ? properties 
    : properties.filter(p => p.region === activeRegion);

  // Then filter by tag
  const filteredProperties = activeTag === "All"
    ? filteredByRegion
    : filteredByRegion.filter(p => p.tag === activeTag);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 600;
      sliderRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-white py-16 md:py-24" data-testid="curated-listings">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-caria-slate mb-3" data-testid="curated-title">
              Curated Listings
            </h2>
            <p className="text-gray-500 text-sm max-w-md">
              Explore our handpicked selection of exceptional properties across Northern Cyprus
            </p>
          </div>
          
          {/* Navigation Buttons - Desktop only */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => scroll('left')}
              className="slider-nav-btn w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-caria-slate hover:text-white hover:border-caria-slate"
              data-testid="curated-prev"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="slider-nav-btn w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-caria-slate hover:text-white hover:border-caria-slate"
              data-testid="curated-next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 text-xs tracking-wider uppercase rounded-full transition-all ${
                activeTag === tag 
                  ? 'text-white' 
                  : 'bg-caria-mint text-gray-600 hover:bg-gray-200'
              }`}
              style={activeTag === tag ? { backgroundColor: '#3BB2B8' } : {}}
              data-testid={`curated-filter-${tag.toLowerCase().replace(' ', '-')}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Property Slider - 2 large cards side by side on desktop */}
        <div 
          ref={sliderRef}
          className="flex space-x-8 overflow-x-auto hide-scrollbar scroll-container scroll-snap-x pb-4"
        >
          {filteredProperties.map((property) => (
            <div 
              key={property.id} 
              className="flex-none w-full md:w-[48%] scroll-snap-start"
            >
              <CuratedPropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 5: ADVANCED SEARCH BAR
// ============================================
const AdvancedSearchBar = () => {
  const [location, setLocation] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const clearAll = () => {
    setLocation('');
    setPriceMin('');
    setPriceMax('');
  };

  return (
    <section className="bg-caria-mint py-16 md:py-24" data-testid="search-section">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="font-serif text-3xl md:text-4xl text-caria-slate text-center mb-12" data-testid="search-title">
          Where would you love to live?
        </h2>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Location Input */}
            <div className="md:col-span-1">
              <label className="text-xs text-gray-500 tracking-wider uppercase mb-2 block">Location</label>
              <input
                type="text"
                placeholder="Location or Reference"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="search-input w-full px-4 py-3 border border-gray-200 rounded-sm text-sm"
                data-testid="search-location"
              />
            </div>

            {/* Price Min */}
            <div className="md:col-span-1">
              <label className="text-xs text-gray-500 tracking-wider uppercase mb-2 block">Price Min</label>
              <input
                type="text"
                placeholder="€ Min"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="search-input w-full px-4 py-3 border border-gray-200 rounded-sm text-sm"
                data-testid="search-price-min"
              />
            </div>

            {/* Price Max */}
            <div className="md:col-span-1">
              <label className="text-xs text-gray-500 tracking-wider uppercase mb-2 block">Price Max</label>
              <input
                type="text"
                placeholder="€ Max"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="search-input w-full px-4 py-3 border border-gray-200 rounded-sm text-sm"
                data-testid="search-price-max"
              />
            </div>

            {/* Buttons */}
            <div className="md:col-span-1 flex flex-col justify-end">
              <div className="flex gap-2">
                <button
                  onClick={clearAll}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-600 text-xs tracking-wider uppercase rounded-sm hover:bg-gray-50"
                  data-testid="search-clear"
                >
                  Clear All
                </button>
                <button
                  className="flex-1 px-4 py-3 text-white text-xs tracking-wider uppercase rounded-sm flex items-center justify-center transition-all"
                  style={{ backgroundColor: '#3BB2B8' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3299A0'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3BB2B8'}
                  data-testid="search-submit"
                >
                  <Search size={16} className="mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
            <button className="flex items-center text-sm text-gray-500 hover:text-caria-turquoise bg-caria-mint px-4 py-2 rounded-full transition-colors">
              <MapPin size={14} className="mr-2" />
              Select Kyrenia area on map
            </button>
            <button className="flex items-center text-sm text-gray-500 hover:text-caria-turquoise bg-caria-mint px-4 py-2 rounded-full transition-colors">
              <MapPin size={14} className="mr-2" />
              Select Iskele area on map
            </button>
            <button className="text-sm text-gray-500 hover:text-caria-turquoise transition-colors">
              + more filters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 6: CONTACT AGENT VIDEO SLIDER
// ============================================
const ContactAgentSlider = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const filters = ['All', 'Kyrenia', 'Iskele', 'Famagusta'];
  
  const filteredAgents = activeFilter === 'All' 
    ? agents 
    : agents.filter(a => a.region === activeFilter);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredAgents.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredAgents.length) % filteredAgents.length);
  };

  return (
    <section className="bg-white py-16 md:py-24" data-testid="agents-section">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="font-serif text-3xl md:text-4xl text-caria-slate mb-4 md:mb-0" data-testid="agents-title">
            Contact your Caria advisor
          </h2>
          
          {/* Navigation Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={prevSlide}
              className="slider-nav-btn w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500"
              data-testid="agents-prev"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="slider-nav-btn w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500"
              data-testid="agents-next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex space-x-4 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-xs tracking-wider ${
                activeFilter === filter 
                  ? 'text-caria-slate underline underline-offset-4' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              data-testid={`agent-filter-${filter.toLowerCase()}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Agent Cards Slider */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAgents.map((agent) => (
            <div 
              key={agent.id}
              className="agent-card relative rounded-lg overflow-hidden aspect-[3/4] group cursor-pointer"
              data-testid={`agent-card-${agent.id}`}
            >
              <img 
                src={agent.thumbnail}
                alt={agent.name}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="play-btn-pulse relative w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play size={24} className="text-white ml-1" fill="white" />
                </div>
              </div>

              {/* Agent Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-medium">{agent.name}</p>
                <p className="text-white/70 text-sm">{agent.region}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          {filteredAgents.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`carousel-dot h-2 rounded-full transition-all ${
                idx === currentIndex 
                  ? 'w-6 bg-caria-slate active' 
                  : 'w-2 bg-gray-300'
              }`}
              data-testid={`agent-dot-${idx}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 7: FEATURED PROPERTIES SLIDER
// ============================================
const FeaturedPropertiesSlider = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const sliderRef = useRef(null);
  const filters = ['All', 'Kyrenia', 'Esentepe', 'Iskele', 'Famagusta'];
  
  const filteredProperties = activeFilter === 'All' 
    ? featuredProperties 
    : featuredProperties.filter(p => p.region === activeFilter || p.location.includes(activeFilter));

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 400;
      sliderRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-caria-beige-medium py-16 md:py-24" data-testid="featured-section">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="font-serif text-3xl md:text-4xl text-caria-slate mb-4 md:mb-0" data-testid="featured-title">
            Featured Properties
          </h2>
          
          {/* Navigation Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => scroll('left')}
              className="slider-nav-btn w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-600"
              data-testid="featured-prev"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="slider-nav-btn w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-600"
              data-testid="featured-next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex space-x-4 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-xs tracking-wider ${
                activeFilter === filter 
                  ? 'text-caria-slate underline underline-offset-4' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              data-testid={`featured-filter-${filter.toLowerCase()}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Properties Slider */}
        <div 
          ref={sliderRef}
          className="flex space-x-6 overflow-x-auto hide-scrollbar scroll-container pb-4"
        >
          {filteredProperties.map((property) => (
            <div key={property.id} className="flex-none w-80 md:w-96">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 8: WHY CHOOSE CARIA
// ============================================
const WhyChooseSection = () => {
  return (
    <section className="relative" data-testid="why-choose-section">
      {/* Top Textured Background */}
      <div 
        className="h-64 bg-cover bg-center"
        style={{ 
          backgroundColor: '#E8E0D7',
          backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=400&fit=crop&q=30')`,
          backgroundBlendMode: 'overlay'
        }}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
              alt="Luxury Interior"
              className="w-full h-[400px] md:h-[500px] object-cover rounded-lg shadow-xl"
            />
          </div>

          {/* Right: Content */}
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg">
            <h2 className="font-serif text-2xl md:text-3xl text-caria-slate uppercase tracking-wide leading-snug mb-4" data-testid="why-choose-title">
              Tailored Real Estate Services & Coastal Luxury Homes
            </h2>
            <h3 className="text-lg font-medium text-caria-slate mb-6">
              Why choose Caria Estates?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              We provide personal and flawless service to our selling and buying customers. 
              All of our property advisors have a profound knowledge and understanding of 
              the Northern Cyprus real estate market with many years of experience. We want 
              to make the process as easy as possible for all of our customers, whether 
              you are seeking a permanent residence, vacation home, or investment property.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our commitment to excellence, transparency, and client satisfaction sets us 
              apart. We offer end-to-end support from property search to legal completion, 
              ensuring your journey to owning property in Northern Cyprus is seamless.
            </p>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-24 bg-white" />
    </section>
  );
};

// ============================================
// SECTION 9: BLOG SLIDER
// ============================================
const BlogSlider = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 320;
      sliderRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-caria-beige-dark py-16 md:py-24" data-testid="blog-section">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-caria-slate" data-testid="blog-title">
            Get Inspired
          </h2>
          
          {/* Navigation Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => scroll('left')}
              className="slider-nav-btn w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center text-gray-600"
              data-testid="blog-prev"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="slider-nav-btn w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center text-gray-600"
              data-testid="blog-next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Blog Cards Slider */}
        <div 
          ref={sliderRef}
          className="flex space-x-6 overflow-x-auto hide-scrollbar scroll-container pb-4"
        >
          {blogArticles.map((article) => (
            <article 
              key={article.id}
              className="blog-card flex-none w-72 bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
              data-testid={`blog-card-${article.id}`}
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-medium text-caria-slate text-sm mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <span className="text-xs text-caria-turquoise hover:underline">
                  read article
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 10: JOIN US SECTION
// ============================================
const JoinUsSection = () => {
  return (
    <section className="bg-white py-16 md:py-24" data-testid="join-us-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-caria-slate mb-6" data-testid="join-us-title">
              Join us!
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Are you an experienced agent with great knowledge of the real estate market 
              and the Northern Cyprus area? Are you looking for a modern and innovative agency? 
              If you share our passion for high-quality real estate services, do not hesitate 
              to contact us.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We are always looking for talented individuals to join our growing team. 
              Reach out to us at{' '}
              <a 
                href="mailto:info@cariaestates.com" 
                className="text-caria-turquoise hover:underline"
                data-testid="join-us-email"
              >
                info@cariaestates.com
              </a>
            </p>
          </div>

          {/* Right: Team Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=500&fit=crop"
              alt="Caria Estates Team"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 11: NEWSLETTER BAR
// ============================================
const NewsletterBar = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <section className="bg-caria-beige py-12 md:py-16" data-testid="newsletter-section">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Text */}
          <p className="text-caria-slate text-sm md:text-base max-w-md">
            Subscribe and be the first to receive exclusive offers and updates.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="newsletter-input bg-transparent px-0 py-2 text-sm w-64 placeholder-gray-500"
              required
              data-testid="newsletter-input"
            />
            <button
              type="submit"
              className="px-6 py-2 border border-caria-slate text-caria-slate text-xs tracking-wider uppercase hover:bg-caria-slate hover:text-white transition-colors"
              data-testid="newsletter-submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 12: PARTNER LOGOS
// ============================================
const PartnerLogos = () => {
  return (
    <section className="bg-white py-12" data-testid="partners-section">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-center space-x-12 md:space-x-16 opacity-50">
          {partners.map((partner) => (
            <div 
              key={partner.id}
              className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400"
              data-testid={`partner-${partner.id}`}
            >
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SECTION 13: FOOTER
// ============================================
const Footer = () => {
  return (
    <footer className="bg-caria-slate text-white py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Contact */}
          <div>
            <h4 className="text-sm tracking-wider uppercase mb-6">Contact</h4>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-1">Kyrenia Office</p>
                <p className="text-sm text-gray-400">123 Harbor Road, Kyrenia</p>
              </div>
              <div>
                <p className="font-medium mb-1">Iskele Office</p>
                <p className="text-sm text-gray-400">45 Beach Boulevard, Iskele</p>
              </div>
              <div>
                <p className="font-medium mb-1">Famagusta Office</p>
                <p className="text-sm text-gray-400">78 Old Town Street, Famagusta</p>
              </div>
              <div className="pt-2">
                <p className="flex items-center text-sm text-gray-300">
                  <Phone size={14} className="mr-2" />
                  +90 548 123 4567
                </p>
                <p className="flex items-center text-sm text-gray-300 mt-1">
                  <Mail size={14} className="mr-2" />
                  info@cariaestates.com
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-sm tracking-wider uppercase mb-6">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/buy" className="footer-link text-sm text-gray-400">Buy in Northern Cyprus</Link></li>
              <li><Link to="/sell" className="footer-link text-sm text-gray-400">Sell your property</Link></li>
              <li><Link to="/investment" className="footer-link text-sm text-gray-400">Investment Consultancy</Link></li>
              <li><Link to="/legal" className="footer-link text-sm text-gray-400">Legal Advisory</Link></li>
              <li><Link to="/rentals" className="footer-link text-sm text-gray-400">Rentals</Link></li>
              <li><Link to="/developments" className="footer-link text-sm text-gray-400">New Developments</Link></li>
              <li><Link to="/investors" className="footer-link text-sm text-gray-400">For Investors</Link></li>
            </ul>
          </div>

          {/* Column 3: Follow Us */}
          <div>
            <h4 className="text-sm tracking-wider uppercase mb-6">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link text-gray-400 hover:text-caria-turquoise" data-testid="social-instagram">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-link text-gray-400 hover:text-caria-turquoise" data-testid="social-facebook">
                <Facebook size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link text-gray-400 hover:text-caria-turquoise" data-testid="social-linkedin">
                <Linkedin size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-link text-gray-400 hover:text-caria-turquoise" data-testid="social-youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// SECTION 14: COPYRIGHT BAR
// ============================================
const CopyrightBar = () => {
  return (
    <div className="bg-caria-slate border-t border-gray-700 py-4" data-testid="copyright">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2025 Caria Estates. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <Link to="/terms" className="hover:text-gray-300">Terms of Service</Link>
            <span>·</span>
            <Link to="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// HOME PAGE COMPONENT
// ============================================
const Home = () => {
  const [activeRegion, setActiveRegion] = useState("DISCOVER ALL");

  return (
    <div className="min-h-screen">
      <Header isTransparent={true} />
      <Hero />
      <IntroSection />
      <RegionTabs activeRegion={activeRegion} setActiveRegion={setActiveRegion} />
      <CuratedListings activeRegion={activeRegion} />
      <AdvancedSearchBar />
      <ContactAgentSlider />
      <FeaturedPropertiesSlider />
      <WhyChooseSection />
      <BlogSlider />
      <JoinUsSection />
      <NewsletterBar />
      <PartnerLogos />
      <Footer />
      <CopyrightBar />
    </div>
  );
};

// ============================================
// PLACEHOLDER PAGES
// ============================================
const PropertiesPage = () => (
  <div className="min-h-screen bg-white pt-20">
    <Header />
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl text-caria-slate mb-8">All Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...properties, ...featuredProperties].map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
    <Footer />
    <CopyrightBar />
  </div>
);

const PropertyDetailPage = () => (
  <div className="min-h-screen bg-white pt-20">
    <Header />
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl text-caria-slate mb-4">Property Details</h1>
      <p className="text-gray-600">Property detail page coming soon...</p>
    </div>
    <Footer />
    <CopyrightBar />
  </div>
);

// ============================================
// MAIN APP COMPONENT
// ============================================
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:slug" element={<PropertyDetailPage />} />
          <Route path="/services" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          <Route path="/buy" element={<Home />} />
          <Route path="/sell" element={<Home />} />
          <Route path="/investment" element={<Home />} />
          <Route path="/legal" element={<Home />} />
          <Route path="/rentals" element={<Home />} />
          <Route path="/developments" element={<Home />} />
          <Route path="/investors" element={<Home />} />
          <Route path="/terms" element={<Home />} />
          <Route path="/privacy" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
