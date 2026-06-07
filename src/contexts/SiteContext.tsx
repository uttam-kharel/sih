/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from 'react'
import type { SiteData } from '@app-types/index'

const SEED: SiteData = {
  site: {
    name: 'Shubham International',
    tagline: 'Excellence in Clinical Care',
    established: '1998',
    heroEyebrow: 'World-Class Healthcare',
    heroTitle: 'Humanizing Healthcare for',
    heroAccent: 'Everyone.',
    heroLead: 'Experience the perfect harmony of cutting-edge clinical precision and deeply compassionate patient care at Shubham International.',
    phone: '+977-9809090909',
    emergencyPhone: '+1 234 567 89',
    email: 'care@shubham.intl',
    address: 'Manamaiju, Kathmandu',
    addressFull: 'Ground Floor, Atrium Tower, Shubham International Hospital, Manamaiju, Kathmandu',
    footerBlurb: 'Dedicated to bringing world-class healthcare within reach of everyone through innovation and empathy.',
    accreditationLine: 'CERTIFIED EXCELLENCE  •  NABH ACCREDITED',
  },
  stats: [
    { id: 'st1', value: '26+', label: 'Years of Care' },
    { id: 'st2', value: '500+', label: 'Surgeries' },
    { id: 'st3', value: '150+', label: 'Specialists' },
    { id: 'st4', value: '12', label: 'National Awards' },
  ],
  doctors: [
    { id: 'd1', name: 'Dr. Anjali Sharma', designation: 'Chief of Cardiology', department: 'Cardiology', photo: '/assets/img/doctor-1.svg', bio: 'Interventional cardiologist with 18 years of experience in minimally invasive cardiac procedures.', featured: true },
    { id: 'd2', name: 'Dr. K.P. Adhikari', designation: 'Head of Neurosurgery', department: 'Neurology', photo: '/assets/img/doctor-2.svg', bio: 'Specialist in complex neurosurgical interventions and stroke management.', featured: true },
    { id: 'd3', name: 'Dr. Swornim Wagle', designation: 'Senior Pediatrician', department: 'Pediatrics', photo: '/assets/img/doctor-3.svg', bio: 'Dedicated to compassionate pediatric and neonatal intensive care.', featured: true },
    { id: 'd4', name: 'Dr. Balendra Shah', designation: 'Director of Surgery', department: 'General Surgery', photo: '/assets/img/doctor-4.svg', bio: 'Leads the robotic surgery program with a focus on patient outcomes.', featured: true },
    { id: 'd5', name: 'Dr. Mira Tuladhar', designation: 'Consultant Oncologist', department: 'Oncology', photo: '/assets/img/doctor-1.svg', bio: 'Medical oncologist focused on personalized cancer treatment plans.', featured: false },
    { id: 'd6', name: 'Dr. Rohan Pradhan', designation: 'Orthopedic Surgeon', department: 'Orthopedics', photo: '/assets/img/doctor-2.svg', bio: 'Joint replacement and sports injury specialist.', featured: false },
  ],
  services: [
    { id: 's1', title: 'Urology', icon: 'kidney', desc: 'Specialized care for urinary tract and male reproductive health using advanced surgical techniques.', cta: 'Learn More' },
    { id: 's2', title: 'Laboratory Services', icon: 'flask', desc: '24/7 automated diagnostic labs providing accurate and rapid results for informed medical decisions.', cta: 'Book Test' },
    { id: 's3', title: 'X-ray', icon: 'scan', desc: 'Digital radiography for high-resolution imaging with minimal radiation exposure for precise diagnosis.', cta: 'Inquire Now' },
    { id: 's4', title: 'Ultrasound', icon: 'wave', desc: 'Modern sonography for obstetric, abdominal, and vascular imaging by experienced radiologists.', cta: 'Book Scan' },
    { id: 's5', title: 'Pharmacy', icon: 'pill', desc: 'In-house pharmacy stocked with genuine medicines and medical supplies, open 24/7.', cta: 'Order Meds' },
    { id: 's6', title: 'OPD Services', icon: 'stethoscope', desc: 'Comprehensive outpatient consultations across various specialties with minimal wait times.', cta: 'Book Consultation' },
  ],
  criticalCare: [
    { id: 'c1', title: 'Emergency & Trauma', desc: 'Equipped for immediate response with rapid-action trauma teams and dedicated ambulance services.', tag: '24/7 Availability', cta: 'Call 108 Now', highlight: true },
    { id: 'c2', title: 'Intensive Care (ICU)', desc: 'Level 3 advanced monitoring systems with 1:1 patient-to-nurse ratio for critical conditions.', features: ['Ventilatory Support', '24hr Nephrology', 'Cardiac Monitoring'] },
    { id: 'c3', title: 'HDU Unit', desc: 'Specialized step-down care for patients requiring close monitoring and support.', note: 'Transitioning from ICU to general ward with expert supervision.', cta: 'View Facilities' },
  ],
  packages: [
    { id: 'p1', name: 'Consultation Package', desc: 'Essential health check for regular monitoring.', oldPrice: 'Rs. 1,500', price: 'Rs. 799', features: ['Specialist Consultation', 'Vitals Check (BP, BMI, Pulse)', 'Medical History Review'], featured: false, image: '/assets/img/gallery-1.svg' },
    { id: 'p2', name: 'Imaging Package', desc: 'Advanced radiology screenings for internal diagnostics.', oldPrice: 'Rs. 3,200', price: 'Rs. 1,899', features: ['Digital X-Ray (Chest)', 'Ultrasound (Whole Abdomen)', 'Radiologist Report'], featured: false, image: '/assets/img/gallery-2.svg' },
    { id: 'p3', name: 'Diagnostic Package', desc: 'Comprehensive lab work for clinical insights.', oldPrice: 'Rs. 2,800', price: 'Rs. 1,499', features: ['Full Blood Count (CBC)', 'Lipid Profile & Blood Sugar', 'Urinalysis & Creatinine'], featured: false, image: '/assets/img/gallery-3.svg' },
    { id: 'p4', name: 'Wellness Gold', desc: 'Our most complete holistic health assessment.', oldPrice: 'Rs. 6,500', price: 'Rs. 3,999', features: ['All Consultation Services', 'Full Imaging (X-Ray + USG)', 'Comprehensive Lab Reports', 'Physician Review Session'], featured: true, badge: 'Best Value', image: '/assets/img/gallery-4.svg' },
  ],
  insights: [
    { id: 'i1', category: 'Cardiology', title: 'Heart Health: New breakthroughs in minimally invasive repair.', excerpt: 'Discover how our latest robotic-assisted techniques are reducing recovery times for cardiac patients.', content: '<p>At Shubham International, we are proud to announce a significant advancement in cardiac care...</p>', date: '2026-05-12', image: '/assets/img/insight-1.svg' },
    { id: 'i2', category: 'Wellness', title: 'The Gut-Brain Connection: Why your diet matters.', excerpt: 'Our nutritionists break down the science of how your digestive health impacts mental clarity and stress levels.', content: '<p>Emerging research continues to reveal the profound link between your digestive system and your brain...</p>', date: '2026-05-04', image: '/assets/img/insight-2.svg' },
    { id: 'i3', category: 'Innovation', title: 'Personalized Medicine: The future of genetic screening.', excerpt: 'How Shubham International is leading the way in tailored treatments based on individual genetic profiles.', content: '<p>Personalized medicine is transforming healthcare by moving beyond the one-size-fits-all approach...</p>', date: '2026-04-22', image: '/assets/img/insight-3.svg' },
  ],
  values: [
    { id: 'v1', icon: 'shield', title: 'Clinical Excellence', desc: 'Protocols based on global benchmarks ensuring the highest standards of safety and medical outcomes.' },
    { id: 'v2', icon: 'flask', title: 'State-of-the-Art', desc: 'Equipped with robotic surgery suites, 3 Tesla MRI, and advanced diagnostic molecular labs.' },
    { id: 'v3', icon: 'heart', title: 'Compassionate Care', desc: 'Our staff is trained to prioritize patient dignity and comfort above all, treating you like family.' },
  ],
  accreditations: [
    { id: 'a1', icon: 'shield', label: 'JCI Accredited' },
    { id: 'a2', icon: 'medal', label: 'NABH Gold Standards' },
    { id: 'a3', icon: 'star', label: 'Nepal Best Hospital 2082' },
    { id: 'a4', icon: 'leaf', label: 'Green Hospital Award' },
  ],
  about: {
    heroEyebrow: 'Established 1998',
    heroTitle: 'Defining the Future of',
    heroAccent: 'Clinical Excellence.',
    heroImage: '/assets/img/about-hero.svg',
    vision: 'To be the global benchmark in empathetic healthcare, where advanced medical science meets personalized clinical care, creating a world where quality treatment is a universal reality.',
    mission: 'Our mission is to provide accessible, high-quality, and ethical healthcare services by integrating cutting-edge technology with the human touch of clinical compassion.',
    journeyTitle: 'A Commitment That Spans Decades.',
    journeyImage: '/assets/img/heritage.svg',
    journeyBody: 'Founded in 1998, Shubham International began as a specialized heart care center with a singular goal: to bring world-class healthcare to our community. Over the last quarter-century, we have evolved from a local clinic into a multidisciplinary international hub of medical excellence.\n\nOur history is defined by pivotal moments—from performing the region\'s first robotic surgery to being recognized for our pediatric intensive care. Every brick of this institution is built on the trust of over 2 million patients who have walked through our doors.',
    leadershipQuote: '"Healthcare is not a business; it is a sacred trust. Our leadership ensures that every decision we make starts and ends with the patient."',
  },
  careers: {
    heroBadge: 'Work With Excellence',
    heroTitle: 'Join Our Mission to Shape the Future of Healthcare',
    heroLead: 'At Shubham International, we combine cutting-edge medical technology with human-centric care. Be part of a diverse team dedicated to clinical excellence and global impact.',
    heroImage: '/assets/img/careers-hero.svg',
    recruitmentEmail: 'careers@shubhamhospital.com',
    recruitmentPhone: '+977 11 4567 8900',
  },
  benefits: [
    { id: 'b1', icon: 'growth', title: 'Professional Growth', desc: 'Continuous learning programs, specialized certifications, and clear career paths designed to help you lead the next generation of healthcare.' },
    { id: 'b2', icon: 'flask', title: 'Modern Infrastructure', desc: 'Work with state-of-the-art diagnostic tools, AI-assisted robotic surgery systems, and fully integrated digital patient health records.' },
    { id: 'b3', icon: 'people', title: 'Community Impact', desc: 'Join a mission that reaches beyond hospital walls through rural health camps, public awareness drives, and sustainable care initiatives.' },
  ],
  jobs: [
    { id: 'j1', title: 'Senior Cardiologist', type: 'Full Time', category: 'Medical', location: 'Main Campus, Kathmandu', desc: 'Lead our advanced cardiac care unit, performing complex interventions and driving research in non-invasive techniques.' },
    { id: 'j2', title: 'Registered Nurse - ICU', type: 'Full Time', category: 'Nursing', location: 'Main Campus, Kathmandu', desc: 'Provide high-quality critical care nursing to patients in our state-of-the-art Intensive Care Unit with a focus on patient empathy.' },
    { id: 'j3', title: 'Lab Technician', type: 'Day Shift', category: 'Medical', location: 'Satellite Hub, Lalitpur', desc: 'Operate advanced molecular diagnostic equipment and maintain stringent quality control standards in our central pathology lab.' },
    { id: 'j4', title: 'Patient Experience Coordinator', type: 'Full Time', category: 'Administration', location: 'Main Campus, Kathmandu', desc: 'Act as the primary touchpoint for patients, ensuring a seamless, compassionate, and efficient journey through our healthcare system.' },
  ],
  gallery: [
    { id: 'g1', category: 'Facilities', caption: 'Main Atrium & Reception', image: '/assets/img/gallery-1.svg' },
    { id: 'g2', category: 'Technology', caption: 'Robotic Surgery Suite', image: '/assets/img/gallery-2.svg' },
    { id: 'g3', category: 'Facilities', caption: 'Patient Recovery Wing', image: '/assets/img/gallery-3.svg' },
    { id: 'g4', category: 'Care', caption: 'Neonatal Intensive Care', image: '/assets/img/gallery-4.svg' },
    { id: 'g5', category: 'Technology', caption: '3 Tesla MRI Imaging', image: '/assets/img/gallery-5.svg' },
    { id: 'g6', category: 'Care', caption: 'Compassionate Nursing', image: '/assets/img/gallery-6.svg' },
  ],
  departments: ['Cardiology', 'Neurology', 'Pediatrics', 'General Surgery', 'Oncology', 'Orthopedics', 'Urology', 'Radiology'],
}

const SiteContext = createContext<SiteData>(SEED)

export function SiteProvider({ children }: { children: ReactNode }) {
  return (
    <SiteContext.Provider value={SEED}>
      {children}
    </SiteContext.Provider>
  )
}

export function useSiteData(): SiteData {
  return useContext(SiteContext)
}
