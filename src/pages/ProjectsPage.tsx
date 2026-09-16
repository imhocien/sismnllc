import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ProjectsSection } from '../components/ProjectsSection';
import { ContactSection } from '../components/ContactSection';
import { SEOHead } from '../components/SEOHead';

export const ProjectsPage: React.FC = () => {
  const historicalCompleted = [
    { name: 'Saigon Courtyard Shopping Center', location: 'Arlington, Texas', client: 'HKT Management Corporation', year: '2009-2010', type: 'Commercial Retail' },
    { name: 'Las Colinas MRI Medical Center', location: 'Irving, Texas', client: 'Kinwest Medical Group', year: '2009', type: 'Healthcare Imaging Center' },
    { name: "Manny's Shiloh Plaza Shopping Center", location: 'Garland, Texas', client: 'Manny Awad', year: '2009', type: 'Commercial Retail Center' },
    { name: 'Best Western Frisco Hotel', location: 'Frisco, Texas', client: 'Amin Noor', year: '2009', type: 'Multi-Story Hospitality' },
    { name: 'La Quinta Inn & Suites Hotel', location: 'Frisco, Texas', client: 'Amin Noor', year: '2009', type: 'Hospitality Hotel' },
    { name: 'Sushi Fugu Restaurant', location: 'Highland Village, Texas', client: 'Phu Nguyen', year: '2008', type: 'Restaurant & Dining' },
    { name: 'The Shops at Airport Center', location: 'Irving, Texas', client: 'N&F Ltd.', year: '2006-2008', type: 'Commercial Shopping Plaza' },
    { name: 'El Dorado Manesh Estates', location: 'Sacramento, California', client: 'N&F Ltd.', year: '2005-2008', type: 'Master Planned Residential' },
    { name: 'Frisco Law Circle Center', location: 'Frisco, Texas', client: 'N&F Ltd.', year: '2006-2008', type: 'Office Center' },
    { name: 'Bardin Crossing Shopping Center', location: 'Arlington, Texas', client: 'Bardin Crossing Group LLC', year: '2006-2008', type: 'Retail Plaza' },
    { name: 'Starbucks Plaza Shopping Center', location: 'Grand Prairie, Texas', client: 'Mrs. Rashedi', year: '2006-2007', type: 'Retail Center' },
    { name: 'Village Square Shopping Center', location: 'Irving, Texas', client: 'Champ Teng', year: '2005-2007', type: 'Commercial Center' },
    { name: 'Airport Center (Old Walmart Redevelopment)', location: 'Irving, Texas', client: 'N&F Ltd.', year: '2006-2007', type: 'Retail Redevelopment' },
    { name: 'Britain Business Addition', location: 'Irving, Texas', client: 'N&F Ltd.', year: '2005-2007', type: 'Commercial Business Park' },
    { name: 'Medlin Townhomes', location: 'Arlington, Texas', client: 'A&L', year: '2004-2005', type: 'Townhome Community' },
    { name: 'Mineral Springs Shopping Center', location: 'Arlington, Texas', client: 'Champ Teng', year: '2004-2005', type: 'Retail Center' },
    { name: 'Park Place Shopping Center', location: 'Arlington, Texas', client: 'Earning Investment Group LLC', year: '2004-2005', type: 'Retail Shopping Center' },
    { name: 'Benbrook Middle School', location: 'Benbrook, Texas', client: 'Public Works', year: '2010', type: 'Educational Facility' },
    { name: 'Gandhi Memorial Statue Plaza', location: 'Irving, Texas', client: 'City Memorial', year: '2012', type: 'Public Landmark' },
    { name: 'Masjid Al Noor Community Center', location: 'Flower Mound, Texas', client: 'Community Foundation', year: '2015', type: 'Religious Center' },
  ];

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <SEOHead
        title="Featured Developments & Completed Portfolio"
        description="Explore SISMN LLC's portfolio of master-planned communities, retail shopping centers, healthcare facilities, luxury residential subdivisions, and 25-year track record across Texas."
        keywords="SISMN LLC projects, The Vineyards Cedar Hill, The Mya Heights Rowlett, Savana Avenue Carrollton, Clarksville General Hospital, Texas real estate developments"
        breadcrumbs={[{ name: 'Projects', item: '/projects' }]}
      />
      {/* Page Header */}
      <PageHeader
        title="Our Projects &amp; Developments"
        subtitle="Explore our featured master-planned communities, commercial shopping plazas, healthcare medical facilities, and engineered infrastructure across Texas."
        breadcrumbs={[{ label: 'Projects' }]}
        bgImage="/images/heroes/header-projects.jpg"
      />

      {/* Main Filterable Projects Section */}
      <ProjectsSection />

      {/* Historical Completed Projects Showcase */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface text-on-surface border-t border-steel-border">
        <div className="max-w-[1360px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-slate-card-dark px-4 py-1.5 rounded-full text-amber-highlight font-label-caps text-label-caps uppercase tracking-wider mb-4 border border-white/10">
              Historical Track Record
            </div>
            <h2 className="font-headline-lg text-headline-lg uppercase tracking-tight text-on-surface mb-4">
              Over 25 Years of Completed Developments
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              A sample of completed commercial retail centers, hospitality hotels, healthcare imaging facilities,
              residential townhomes, and civic landmarks delivered across Texas.
            </p>
          </div>

          {/* Table / Grid of Completed Projects */}
          <div className="bg-surface-container-lowest border border-steel-border rounded-2xl overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead className="bg-surface-container-low border-b border-steel-border text-on-surface font-label-caps text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Project Name</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Development Type</th>
                    <th className="px-6 py-4">Client / Sponsor</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-steel-border/60 text-on-surface-variant">
                  {historicalCompleted.map((item, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-low/70 transition-colors">
                      <td className="px-6 py-4 font-headline-sm text-sm font-semibold text-on-surface">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-outline">
                        {item.location}
                      </td>
                      <td className="px-6 py-4 text-amber-highlight font-spec-code text-[12px] font-semibold">
                        {item.type}
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">
                        {item.client}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 bg-slate-card-dark text-amber-highlight px-3 py-1 rounded-full font-spec-code text-[11px] font-semibold border border-white/10">
                          <span className="material-symbols-outlined text-[14px] text-amber-highlight">check_circle</span>
                          <span>DELIVERED</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom CTA to Contact Section */}
          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-[#0b1c30] hover:bg-[#112240] text-on-primary font-label-caps text-label-caps uppercase tracking-wider font-bold px-8 py-4 rounded-full transition-all shadow-lg shadow-[#0b1c30]/20 cursor-pointer"
            >
              <span>Have a Project in Mind? Let’s Talk</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Embedded Contact & Technical RFP Suite */}
      <ContactSection />
    </div>
  );
};


