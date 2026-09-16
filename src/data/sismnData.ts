import { Project, TeamMember, ServiceCategory, SequenceStep } from '../types';

export const COMPANY_INFO = {
  name: 'SISMN LLC',
  tagline: 'Excellence in Real Estate Acquisition, Architecture, Engineering & Construction',
  yearsOfExperience: 25,
  stats: [
    { value: '25+', label: 'Years in Business', sub: 'Licensed & Registered in TX' },
    { value: '250+', label: 'Cities Covered', sub: 'Nationwide & Regional Reach' },
    { value: '1,500+', label: 'Community Members', sub: 'Growing Network of Partners' },
    { value: '2,000+', label: 'Properties Delivered', sub: 'Over $100M+ Project Value' },
  ],
  contact: {
    address: '13151 Emily Rd. #100, Dallas, TX 75240',
    phone: '214-453-9999',
    altPhone: '(214) 715-1010',
    email: 'info@sismnllc.com',
    hours: 'Monday - Friday: 09:00 - 18:00 CST',
    weekend: 'Saturday & Sunday: Closed (Emergency Available)',
    mapsUrl: 'https://maps.google.com/?q=13151+Emily+Rd+%23100+Dallas+TX+75240',
    whatsapp: 'https://wa.me/12144539999',
  },
  mission:
    'To create a network of industry players and provide them numerous platforms where they can achieve all the services of international standards, recognition, and stakeholder satisfaction by committing to the highest level of performance with integrity, creativity, and a passion for results.',
  vision:
    "To become the leading Real Estate and construction group, while delivering projects that consistently exceed international standards, fast pace, and provide excellent value & innovative business investments to meet our clients' requirements.",
  coreValues: [
    {
      title: 'Reputation for Excellence',
      description: 'Over 25 years of proven excellence in real estate acquisition, architectural design, and quality construction in Texas and across the US.',
      icon: 'Award'
    },
    {
      title: 'We Build Partnerships',
      description: 'Enduring relationships with landowners, city planners, developers, institutional investors, and contractors.',
      icon: 'Handshake'
    },
    {
      title: 'Guided by Commitment',
      description: 'Board certified and licensed in Texas, dedicated to on-time, within-budget execution and complete client satisfaction.',
      icon: 'ShieldCheck'
    },
    {
      title: 'A Team of Professionals',
      description: 'Multidisciplinary talent of licensed PE Civil & Structural Engineers, MEP experts, and Master Architects.',
      icon: 'Users'
    },
    {
      title: 'Leadership & Performance',
      description: 'From initial feasibility study to turn-key delivery, we lead projects through complex municipal zoning and building codes.',
      icon: 'TrendingUp'
    }
  ]
};

export const HERO_SLIDES = [
  {
    title: 'Architectural & Engineering Services',
    subtitle: 'Our Comprehensive Architectural and Engineering Services include Conceptual Designs, Design Development, and Construction Documentation.',
    tag: 'Full Spectrum A&E Services',
    ctaText: 'Explore Projects',
    ctaLink: '/projects',
    bgImage: '/images/heroes/hero-slide-1.jpg',
  },
  {
    title: '25+ Years of Excellence in Construction & Engineering',
    subtitle: 'World-Class Service & Safe Investment in Real Estate Market. Proudly delivering over several hundred million dollars in project value.',
    tag: 'Proven Industry Track Record',
    ctaText: 'Our Services',
    ctaLink: '/services',
    bgImage: '/images/heroes/hero-slide-2.jpg',
  },
  {
    title: 'Integrated Design & Build Solutions',
    subtitle: 'SISMN LLC provides Real Estate Acquisition Consulting, Architectural & Engineering Services, Construction & Development, Project Management, and Marketing & Sales.',
    tag: 'Turn-Key Real Estate Development',
    ctaText: 'Explore Services',
    ctaLink: '/services',
    bgImage: '/images/heroes/hero-slide-3.jpg',
  },
  {
    title: 'A Great Opportunity for Real Estate Investors',
    subtitle: 'SISMN LLC provides secure, high-yield opportunities for safe investment in residential and commercial real estate development across Texas.',
    tag: 'Strategic Capital Growth',
    ctaText: 'Investor Inquiries',
    ctaLink: '/investment',
    bgImage: '/images/heroes/hero-slide-4.jpg',
  },
];

export const PROJECTS_LIST: Project[] = [
  {
    id: 'the-vineyards',
    title: 'The Vineyards',
    category: 'Featured',
    location: '1807 Bear Creek Rd, Cedar Hill, TX 75104',
    description: 'Premier master-planned residential community featuring bespoke luxury homes, scenic topography, custom engineering, and modern infrastructure.',
    status: 'Under Development',
    unitsOrSize: 'Multi-acre master development',
    image: '/images/projects/the-vineyards.jpg',
    features: ['Custom luxury lots', 'Dedicated parkways', 'Underground modern utilities', 'Scenic views']
  },
  {
    id: 'the-mya-heights',
    title: 'The Mya Heights',
    category: 'Featured',
    location: '7106 Liberty Grove Rd, Rowlett, TX 75089',
    description: 'Sophisticated modern residential community offering premium living spaces, close proximity to Lake Ray Hubbard, and state-of-the-art architecture.',
    status: 'Under Development',
    unitsOrSize: 'High-density luxury community',
    image: '/images/projects/the-mya-heights.jpg',
    features: ['Contemporary facade', 'Energy efficient systems', 'Landscaped common areas', 'Gated security']
  },
  {
    id: 'shahla-homes',
    title: 'Shahla Homes',
    category: 'Residential',
    location: '966 North Blue Grove Road, Lancaster, TX 75146',
    description: 'High quality suburban single-family community development delivering spacious custom architecture with high-efficiency MEP engineering.',
    status: 'Under Development',
    unitsOrSize: 'Single Family Subdivision',
    image: '/images/projects/shahla-homes.jpg',
    features: ['Custom floor plans', 'Spacious lot sizes', 'Full civil infrastructure', 'Modern interiors']
  },
  {
    id: 'savana-avenue',
    title: 'Savana Avenue',
    category: 'Commercial',
    location: '1375 MacArthur Dr, Carrollton, TX 75007',
    description: 'Vibrant mixed-use commercial and residential condominium development with retail storefronts, dining venues, and residential living.',
    status: 'Under Development',
    unitsOrSize: '12,000 SF Retail + 30 Condo Units',
    image: '/images/projects/savana-avenue.jpg',
    features: ['12,000 SF Retail Plaza', '30 Residential Condos', 'Integrated Parking Deck', 'Prime Highway Access']
  },
  {
    id: 'silver-saddle-court',
    title: 'Silver Saddle Court',
    category: 'Residential',
    location: '413 Silver Saddle Ct, Grand Prairie, TX 75050',
    description: '18-unit premium duplex residential community engineered with precision stormwater systems, modern foundations, and elegant exterior finishes.',
    status: 'Completed',
    unitsOrSize: '18 Duplex Units',
    image: '/images/projects/silver-saddle-court.jpg',
    features: ['18 High-end Duplex Units', 'Individual Private Yards', 'Turnkey MEP & Civil', 'Fully Platted']
  },
  {
    id: 'clarksville-hospital',
    title: 'Clarksville General Hospital',
    category: 'Healthcare',
    location: 'Clarksville, TX, USA',
    description: 'State-of-the-art medical and acute healthcare facility equipped with advanced surgical suites, patient recovery wings, diagnostic labs, and dedicated MEP systems.',
    status: 'Completed',
    unitsOrSize: 'Full-service Hospital Facility',
    image: '/images/projects/clarksville-hospital.jpg',
    features: ['Medical Grade MEP', 'ICU & Surgical Suites', 'Emergency Trauma Center', 'LEED Compliant HVAC']
  },
  {
    id: 'surani-heights',
    title: 'Surani Heights',
    category: 'Residential',
    location: '1146 W Trinity Mills Rd, Carrollton, TX 75006',
    description: 'Upscale townhome community featuring contemporary urban design, multi-level living, private balconies, and seamless accessibility.',
    status: 'Under Development',
    unitsOrSize: 'Multi-family Townhomes',
    image: '/images/projects/blue-grove.jpg',
    features: ['Multi-level living', 'Private rooftop terraces', 'EV charging readiness', 'Central Dallas location']
  },
  {
    id: 'chaha-garden',
    title: 'Chaha Garden Rowlett',
    category: 'Residential',
    location: '3713 Chaha Rd, Rowlett, TX 75088',
    description: 'Lakeside residential neighborhood offering serene landscape architecture, walking trails, and custom-designed sustainable family residences.',
    status: 'Under Development',
    unitsOrSize: 'Residential Neighborhood',
    image: '/images/projects/liberty-grove.jpg',
    features: ['Lakeside proximity', 'Pedestrian trails', 'Custom landscaping', 'Detached family homes']
  },
  {
    id: 'neva-estate',
    title: 'Neva Estate',
    category: 'Residential',
    location: '139 Neva Ln, Wylie, TX 75098',
    description: 'Exclusive private gated enclave offering oversized estate lots, custom structural design, and privacy-oriented landscape architecture.',
    status: 'Under Development',
    unitsOrSize: 'Luxury Estate Enclave',
    image: '/images/projects/bear-creek.jpg',
    features: ['Gated access', 'Oversized lots', 'Custom engineering', 'Private retention pond']
  },
  {
    id: 'spring-valley-townhouses',
    title: 'Spring Valley Townhouses',
    category: 'Residential',
    location: '4060 Spring Valley Rd, Farmers Branch, TX 75244',
    description: 'Modern urban townhomes designed for professionals, combining high-speed fiber infrastructure, sleek open layouts, and proximity to North Dallas business corridors.',
    status: 'Planning & Design',
    unitsOrSize: 'Modern Townhouse Complex',
    image: '/images/projects/spring-valley-townhouses.jpg',
    features: ['North Dallas location', 'Smart home automation', 'Attached two-car garages', 'Low maintenance living']
  },
  {
    id: 'bridges-of-greenville',
    title: 'Bridges of Greenville',
    category: 'Featured',
    location: 'Greenville, TX',
    description: 'Comprehensive residential and commercial master plan connecting growing industrial corridors with comfortable family neighborhoods.',
    status: 'Under Development',
    unitsOrSize: 'Master Planned District',
    image: '/images/projects/office-complex.jpg',
    features: ['Mixed-use zoning', 'Integrated park system', 'Commercial highway frontage', 'Rapid growth corridor']
  },
  {
    id: 'shell-mcdonalds-plaza',
    title: 'Shell Gas Station & McDonald’s Fuel Stop',
    category: 'Commercial',
    location: '11468 I-20, Terrell, TX',
    description: 'Major Interstate commercial fueling and quick-service restaurant plaza featuring heavy-duty concrete pavement, high-volume underground fuel tanks, and full civil storm engineering.',
    status: 'Completed',
    unitsOrSize: 'Commercial Highway Travel Center',
    image: '/images/projects/shell-mcdonalds-plaza.jpg',
    features: ['High-capacity fuel canopy', 'Full QSR drive-thru', 'Heavy vehicle parking', 'TXDOT permitted access']
  },
  {
    id: 'las-colinas-mri',
    title: 'Las Colinas MRI Medical Center',
    category: 'Healthcare',
    location: 'Irving, Texas (Kinwest Medical Group)',
    description: 'Specialized diagnostic imaging medical center built with RF shielding, vibration dampening foundations for heavy MRI equipment, and custom clinical layouts.',
    status: 'Completed',
    year: '2009',
    client: 'Kinwest Medical Group',
    image: '/images/projects/medical-facility.jpg',
    features: ['RF Shielded Imaging Room', 'Clinical HVAC filtration', 'Specialized electrical feeds', 'ADA accessibility']
  },
  {
    id: 'saigon-courtyard',
    title: 'Saigon Courtyard Shopping Center',
    category: 'Commercial',
    location: 'Arlington, Texas',
    description: 'Major multi-tenant retail and cultural shopping complex featuring over 25 retail suites, restaurant grease trap systems, and expansive parking.',
    status: 'Completed',
    year: '2009-2010',
    client: 'HKT Management Corporation',
    image: '/images/projects/saigon-courtyard.jpg',
    features: ['25+ Retail Suites', 'Restaurant-ready MEP', 'Expansive 300+ car lot', 'Arlington central retail']
  },
  {
    id: 'best-western-hotel',
    title: 'Best Western & La Quinta Hotels',
    category: 'Hospitality',
    location: 'Frisco, Texas',
    description: 'Multi-story modern hospitality developments equipped with swimming pool amenities, conference meeting facilities, and high-efficiency hospitality MEP.',
    status: 'Completed',
    year: '2009',
    client: 'Amin Noor',
    image: '/images/projects/hotel-development.jpg',
    features: ['Multi-story guest wings', 'Swimming pool & fitness', 'Conference centers', 'Hospitality acoustic engineering']
  },
  {
    id: 'euless-main-gas',
    title: 'Euless-Main Travel Center & Store',
    category: 'Engineering',
    location: '2301 North Main Street, Euless, TX',
    description: '6,000 SF modern gas station and convenience center with canopy structural engineering, fuel distribution systems, and environmental compliance.',
    status: 'Completed',
    unitsOrSize: '6,000 SF Retail & Fuel Facility',
    image: '/images/projects/euless-main-travel-center.jpg',
    features: ['6,000 SF Convenience Store', 'Civil platting & zoning', 'Environmental safety design', 'Underground storage tanks']
  }
];

export const SERVICES_LIST: ServiceCategory[] = [
  {
    id: 'commercial',
    title: 'Commercial Development',
    subtitle: 'Turnkey architectural, engineering & construction for high-yield commercial assets.',
    iconName: 'Building2',
    description: 'From retail centers to corporate headquarters and industrial distribution facilities, SISMN LLC oversees commercial development from site feasibility through tenant occupancy.',
    items: [
      'Retail Centers & Strip Plazas',
      'Restaurants & Food Service Venues',
      'Corporate Office Buildings',
      'Healthcare Clinics & Medical Centers',
      'Religious Centers & Places of Worship',
      'Industrial & Warehouse Facilities',
      'Educational & Training Facilities',
      'Mixed-Use Residential / Commercial',
      'Tenant Improvement & Build-Outs'
    ],
    subcategories: [
      {
        title: 'Core Disciplines',
        items: ['Structural Engineering', 'Mechanical, Electrical & Plumbing (MEP)', 'Civil Site Planning', 'Accessibility & Life Safety Code Compliance']
      }
    ]
  },
  {
    id: 'residential',
    title: 'Residential Architecture & Building',
    subtitle: 'From luxury custom estates to multi-unit master-planned subdivisions.',
    iconName: 'Home',
    description: 'We deliver innovative, cost-effective residential engineering and construction solutions with featured design elements tailored for the modern Dallas and Texas housing markets.',
    items: [
      'Custom Luxury Single-Family Homes',
      'Duplexes & Multi-Family Townhome Communities',
      'Master Planned Community Subdivisions',
      'Condominium High-Rise & Mid-Rise Buildings',
      'Sustainable & Energy-Efficient Home Plans',
      'Full Foundation & Framing Engineering',
      'Site Grading & Lot Subdivision'
    ],
    subcategories: [
      {
        title: 'Engineering Scope',
        items: ['Post-tension & Pier Foundation Design', 'Wood & Steel Framing Calculations', 'Energy Code Compliance (IECC)', 'Platting & Municipal Approvals']
      }
    ]
  },
  {
    id: 'engineering-architecture',
    title: 'Engineering & Architecture',
    subtitle: 'Licensed Professional Engineers (PE) and Certified Architectural Designers.',
    iconName: 'Compass',
    description: 'Our in-house technical department covers every engineering and architectural phase required to achieve city permits, optimize construction costs, and ensure safety.',
    items: [
      'Architectural Conceptual & Detail Design',
      'Civil Engineering & Drainage Studies',
      'Structural Engineering (PE Sealed)',
      'MEP Engineering (Mechanical, Electrical, Plumbing)',
      'Geotechnical & Soil Testing Analysis',
      'Topographical Surveying & Boundary Mapping',
      'Municipal Platting & Re-zoning Applications',
      'Green Energy & Solar Readiness Plans',
      '3D Rendering, Walkthroughs & BIM Modeling'
    ]
  },
  {
    id: 'land-development',
    title: 'Land Acquisition & Development',
    subtitle: 'Complete civil infrastructure design and municipal entitlement services.',
    iconName: 'Landmark',
    description: 'We transform raw acreage into fully platted, permitted, and shovel-ready development sites with water, sewer, storm drainage, and roadway infrastructure.',
    items: [
      'Site Feasibility & Acquisition Consulting',
      'Subdivision Layout & Master Site Planning',
      'Waterline & Sanitary Sewer Utility Design',
      'Stormwater Management (BMP) & Retention Ponds',
      'Roadway, Pavement & Heavy Traffic Design',
      'Hydrologic & Hydraulic Assessments',
      'FEMA Flood Plain Studies & LOMR/CLOMR',
      'Erosion & Sediment Control Plans (SWPPP)',
      'Environmental Permitting & LEED Design',
      'Bidding, Staking & Construction Administration'
    ]
  }
];

export const CONSTRUCTION_SEQUENCE: SequenceStep[] = [
  { step: 1, title: 'Pavement & Access Construction', description: 'Clearing, subgrade stabilization, and initial access roads for heavy equipment.', tag: 'Phase 1' },
  { step: 2, title: 'Building Pad Staking & Formwork', description: 'Survey staking, pad elevation verification, and perimeter concrete formwork layout.', tag: 'Phase 1' },
  { step: 3, title: 'Pier Drilling & Deep Foundation', description: 'Drilling reinforced concrete piers to stable bedrock or engineered depth where required.', tag: 'Foundation' },
  { step: 4, title: 'Underground Utilities Rough-In', description: 'Installing subterranean sanitary sewer lines, water mains, electrical conduits before pour.', tag: 'Rough-in' },
  { step: 5, title: 'Foundation Construction', description: 'Post-tension steel placement, rebar grids, vapor barrier, and high-strength concrete pour.', tag: 'Foundation' },
  { step: 6, title: 'Structural Framing', description: 'Erection of wood, structural steel, or masonry load-bearing framing, trusses, and roof decking.', tag: 'Structure' },
  { step: 7, title: 'MEP Rough-In', description: 'Mechanical HVAC ductwork, electrical wiring, gas piping, and plumbing installed inside framing.', tag: 'Mechanicals' },
  { step: 8, title: 'City Inspections & MEP Final', description: 'Rigorous municipal code inspections for mechanical, electrical, plumbing, and structural.', tag: 'Inspection' },
  { step: 9, title: 'Insulation & Sheetrock', description: 'High-R value thermal insulation, drywall installation, tape, float, and textured drywall finishes.', tag: 'Interior' },
  { step: 10, title: 'Doors, Finishes & Turnkey Delivery', description: 'Flooring, cabinetry, trim, doors, exterior brick/stucco, final fixtures, and Certificate of Occupancy.', tag: 'Delivery' },
];

export const DESIGN_SEQUENCE: SequenceStep[] = [
  { step: 1, title: 'Boundary & Title Survey', description: 'Acquiring verified property boundaries, easements, rights-of-way, and title commitments.', tag: 'Due Diligence' },
  { step: 2, title: 'Concept Plan & Feasibility', description: 'Initial site yield studies, density calculations, and preliminary architectural massing.', tag: 'Concept' },
  { step: 3, title: 'Pre-Development City Meeting', description: 'Meeting with municipal zoning and engineering officials to confirm local code ordinances.', tag: 'City Review' },
  { step: 4, title: 'Tree, Topo & Soil Geotech Studies', description: 'Topographical design survey, tree preservation plan, and geotechnical soil boring tests.', tag: 'Technical' },
  { step: 5, title: 'Site Plan & Lot Layout', description: 'Detailed layout of building footprints, vehicular circulation, parking stalls, and setbacks.', tag: 'Planning' },
  { step: 6, title: 'Platting Process', description: 'Drafting and filing Preliminary and Final Subdivision Plat with the Planning Commission.', tag: 'Entitlement' },
  { step: 7, title: 'Civil Engineering & Landscape Plan', description: 'Grading, utilities, drainage detention, SWPPP, and code-compliant landscape irrigation plans.', tag: 'Civil' },
  { step: 8, title: 'Civil Permit Review & Approval', description: 'Submission and approval of Civil Engineering plans by city public works departments.', tag: 'Approval' },
  { step: 9, title: 'Architectural, Structural & MEP Design', description: 'Complete sealed construction blueprints, structural calculations, and mechanical loads.', tag: 'Blueprints' },
  { step: 10, title: 'Building Permit & Pre-Con Meeting', description: 'Final building permit issuance followed by formal pre-construction conference with city officials.', tag: 'Permit Issued' },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'imran-pirzada',
    name: 'Imran Pirzada',
    role: 'President & Founder',
    department: 'Management',
    image: '/images/team/imran-pirzada.jpg',
    bio: 'Founder with over 25 years of industry leadership dedicated to the continual success of SISMN LLC, driving innovative quality homes and large-scale commercial developments.',
  },
  {
    id: 'dr-luqman',
    name: 'Dr. Luqman',
    role: 'Director',
    department: 'Management',
    image: '/images/team/lu.jpg',
    bio: 'Executive Director guiding strategic growth, organizational compliance, and healthcare facility advisory.',
  },
  {
    id: 'ahsan-ismail',
    name: 'Mohammad Ahsan Ismail',
    role: 'Real Estate Consultant',
    department: 'Management',
    image: '/images/team/team3.jpg',
    bio: 'Senior real estate acquisition consultant specializing in commercial transactions, site selection, and investor deal structuring across the Dallas-Fort Worth metroplex.',
  },
  {
    id: 'jennifer-tran',
    name: 'Jennifer Tran',
    role: 'Business Consultant',
    department: 'Management',
    image: '/images/team/team15.jpg',
    bio: 'Strategic business consultant managing client relations, municipal partnerships, and capital expansion strategies.',
  },
  {
    id: 'asad-zakaria',
    name: 'Asad Anwer Zakaria',
    role: 'Business Consultant (International)',
    department: 'Management',
    image: '/images/team/team33.jpg',
    bio: 'Oversees international developer networks, strategic investment syndications, and high-net-worth stakeholder relations.',
  },
  {
    id: 'hussain-hashim',
    name: 'Hussain Hashim',
    role: 'Project Director',
    department: 'Project Management',
    image: '/images/team/team10.jpg',
    bio: 'Directs major real estate and civil infrastructure projects from initial entitlement through final turnkey handover.',
  },
  {
    id: 'glenn-smith',
    name: 'Glenn Smith',
    role: 'Project Manager',
    department: 'Project Management',
    image: '/images/team/team11.jpg',
    bio: 'On-site field project manager coordinating general contractors, subcontractors, safety protocols, and build schedules.',
  },
  {
    id: 'ashley-latimer',
    name: 'Ashley Latimer',
    role: 'Marketing Executive',
    department: 'Project Management',
    image: '/images/team/team13.jpg',
    bio: 'Leads project marketing, buyer relations, pre-sale campaigns, and institutional investor presentations.',
  },
  {
    id: 'samra-khan',
    name: 'Samra Khan',
    role: 'Office Manager',
    department: 'Administration',
    image: '/images/team/team12.jpg',
    bio: 'Manages administrative operations, municipal filings, vendor accounts, and day-to-day office coordination.',
  },
  {
    id: 'chloe-jones',
    name: 'Chloe Jones',
    role: 'Financial Accountant',
    department: 'Administration',
    image: '/images/team/team25.jpg',
    bio: 'Corporate accountant overseeing construction cost audits, budget allocations, and fiscal reporting.',
  },
  {
    id: 'frank-ona',
    name: 'Frank Ona',
    role: 'Mortgage Broker & Financing',
    department: 'Administration',
    image: '/images/team/team14.jpg',
    bio: 'Commercial loan advisor facilitating project financing, construction debt facilities, and permanent placement.',
  },
  {
    id: 'david-recht',
    name: 'David H. Recht',
    role: 'Civil Engineer, PE',
    department: 'Engineers',
    image: '/images/team/team5.jpg',
    bio: 'Licensed Professional Engineer leading municipal infrastructure, storm sewer hydrology, and highway design.',
  },
  {
    id: 'jose-burgos',
    name: 'Jose Luis Burgos',
    role: 'Civil Engineer, PE',
    department: 'Engineers',
    image: '/images/team/team6.jpg',
    bio: 'Licensed Professional Engineer with extensive expertise in land subdivision platting, earthwork grading, and utilities.',
  },
  {
    id: 'mohammad-moger',
    name: 'Mohammad Mogerahzade',
    role: 'Structural Engineer, PE',
    department: 'Engineers',
    image: '/images/team/team7.jpg',
    bio: 'Licensed Professional Engineer specializing in post-tension foundations, steel frame structures, and multi-story analysis.',
  },
  {
    id: 'yusuf-memon',
    name: 'Yusuf Memon',
    role: 'Civil Engineer, PE',
    department: 'Engineers',
    image: '/images/team/team9.jpg',
    bio: 'Licensed Civil Engineer managing site engineering permits, water detention systems, and environmental compliance.',
  },
  {
    id: 'kashif-majeed',
    name: 'Kashif Majeed',
    role: 'Civil Engineer',
    department: 'Engineers',
    image: '/images/team/kashif.jpg',
    bio: 'Civil engineering specialist focusing on grading, municipal utilities, and site drainage plans.',
  },
  {
    id: 'noman-laghari',
    name: 'Noman Laghari',
    role: 'Civil Engineer',
    department: 'Engineers',
    image: '/images/team/noman1.jpg',
    bio: 'Infrastructure engineer executing earthwork balance modeling and storm sewer network designs.',
  },
  {
    id: 'hunain-soomro',
    name: 'Hunain Shoukat Soomro',
    role: 'Civil Structural Engineer',
    department: 'Engineers',
    image: '/images/team/team35.jpg',
    bio: 'Structural calculations specialist for commercial foundations and concrete frame durability.',
  },
  {
    id: 'sidra-qadir',
    name: 'Sidra Qadir',
    role: 'Civil Engineer',
    department: 'Engineers',
    image: '/images/team/Capture.jpg',
    bio: 'Civil design engineer executing municipal permit packages and code-compliance coordination.',
  },
  {
    id: 'ubaidullah',
    name: 'Ubaidullah',
    role: 'Mechanical Engineer',
    department: 'Engineers',
    image: '/images/team/team38.jpg',
    bio: 'MEP specialist designing energy-efficient HVAC, ventilation, and commercial mechanical systems.',
  },
  {
    id: 'uzair-qureshi',
    name: 'Uzair Qureshi',
    role: 'CAD Operator & MEP Designer',
    department: 'Engineers',
    image: '/images/team/team22.jpg',
    bio: 'Technical MEP draftsman preparing electrical schematics, plumbing layouts, and clash detection.',
  },
  {
    id: 'syed-shahjehan',
    name: 'Syed Shahjehan Shah',
    role: 'Urban Planner',
    department: 'Engineers',
    image: '/images/team/team36.jpg',
    bio: 'Specialist in regional zoning, urban density optimization, and sustainable community master planning.',
  },
  {
    id: 'nathan-kleem',
    name: 'Nathan Kleem',
    role: 'Architectural Designer',
    department: 'Architects',
    image: '/images/team/team4.jpg',
    bio: 'Master architectural designer creating innovative commercial concepts, space plans, and permit documentation.',
  },
  {
    id: 'mario-gurrero',
    name: 'Mario Gurrero',
    role: 'Architectural Design Specialist',
    department: 'Architects',
    image: '/images/team/team8.jpg',
    bio: 'Expert architectural designer focusing on aesthetic modern facades, functional space layouts, and building code compliance.',
  },
  {
    id: 'ammar-ahmed',
    name: 'Ammar Ahmed',
    role: 'Architect & 3D Animator',
    department: 'Architects',
    image: '/images/team/team23.jpg',
    bio: 'Master architectural visualizer creating photorealistic 3D renders, BIM simulations, and immersive flythrough videos.',
  },
  {
    id: 'noman-memon',
    name: 'Noman Memon',
    role: 'Architect',
    department: 'Architects',
    image: '/images/team/team29.jpg',
    bio: 'Architectural specialist crafting detailed residential floor plans, elevation sheets, and construction specification documents.',
  },
  {
    id: 'heer-soomro',
    name: 'Heer Soomro',
    role: 'Architect & 3D Visualizer',
    department: 'Architects',
    image: '/images/team/team21.jpg',
    bio: 'Conceptual designer specializing in interior architecture, luxury residential styling, and visual rendering.',
  },
  {
    id: 'muhammad-hussain',
    name: 'Muhammad Hussain',
    role: 'IT & Systems Engineer',
    department: 'Administration',
    image: '/images/team/mhussain.jpg',
    bio: 'Digital systems manager overseeing secure communications, BIM server pipelines, and technology infrastructure.',
  },
  {
    id: 'labeed-muzamil',
    name: 'Labeed Ahmed Muzamil',
    role: 'Brand & Digital Media Manager',
    department: 'Administration',
    image: '/images/team/labeed.jpg',
    bio: 'Creative director managing brand identity, investor presentations, and architectural marketing collateral.',
  },
  {
    id: 'girma-alem',
    name: 'Girma Alem',
    role: 'Business Coordinator',
    department: 'Administration',
    image: '/images/team/team32.jpg',
    bio: 'Coordinates partner agreements, sub-consultant communications, and contract administration.',
  },
  {
    id: 'hussein-jaber',
    name: 'Hussein Jaber',
    role: 'International Coordinator',
    department: 'Administration',
    image: '/images/team/team31.jpg',
    bio: 'Liaison for international client transactions, foreign direct investments, and joint venture partnerships.',
  }
];
