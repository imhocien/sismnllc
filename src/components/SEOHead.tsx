import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  breadcrumbs?: { name: string; item: string }[];
}

const DEFAULT_TITLE = 'SISMN LLC | Texas Licensed Architecture, Engineering & Real Estate Development';
const DEFAULT_DESC =
  'SISMN LLC is a premier Dallas, Texas-based licensed and board-certified firm providing architectural design, civil & structural engineering, commercial construction, and real estate development across 250+ cities.';
const DEFAULT_IMAGE = 'https://sismnllc.com/images/branding/og-preview.jpg';
const BASE_URL = 'https://sismnllc.com';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE,
  type = 'website',
  breadcrumbs,
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Update Document Title
    const fullTitle = title
      ? `${title} | SISMN LLC`
      : DEFAULT_TITLE;
    document.title = fullTitle;

    // 2. Helper to set or update meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const pageDesc = description || DEFAULT_DESC;
    const currentUrl = `${BASE_URL}${pathname === '/' ? '' : pathname}`;

    // Standard Meta
    setMetaTag('name', 'description', pageDesc);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // Open Graph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', pageDesc);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:type', type);

    // Twitter
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', pageDesc);
    setMetaTag('name', 'twitter:image', image);

    // Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // 3. Dynamic BreadcrumbList JSON-LD Schema
    const scriptId = 'dynamic-breadcrumb-schema';
    let breadcrumbScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: BASE_URL,
          },
          ...breadcrumbs.map((crumb, idx) => ({
            '@type': 'ListItem',
            position: idx + 2,
            name: crumb.name,
            item: crumb.item.startsWith('http') ? crumb.item : `${BASE_URL}${crumb.item}`,
          })),
        ],
      };

      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.id = scriptId;
        breadcrumbScript.type = 'application/ld+json';
        document.head.appendChild(breadcrumbScript);
      }
      breadcrumbScript.text = JSON.stringify(breadcrumbData);
    } else if (breadcrumbScript) {
      breadcrumbScript.remove();
    }
  }, [title, description, keywords, image, type, breadcrumbs, pathname]);

  return null;
};
