import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ContactSection } from '../components/ContactSection';
import { SEOHead } from '../components/SEOHead';

export const ContactPage: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="Contact Dallas Corporate Office & Technical RFP"
        description="Contact SISMN LLC headquarters in Dallas, TX. Submit engineering RFPs, request architectural proposals, schedule consultations, or call (214) 453-9999."
        keywords="Contact SISMN LLC, Dallas architecture office, engineering consultation Dallas, submit RFP architectural Texas, Imran Pirzada contact"
        breadcrumbs={[{ name: 'Contact', item: '/contact' }]}
      />
      {/* Page Header */}
      <PageHeader
        title="Contact Our Dallas Headquarters"
        subtitle="Reach out to our executive management, engineering department, or architectural team to discuss your upcoming project or investment."
        breadcrumbs={[{ label: 'Contact Us' }]}
        bgImage="/images/heroes/header-contact.jpg"
      />

      {/* Main Contact Section */}
      <ContactSection />
    </div>
  );
};
