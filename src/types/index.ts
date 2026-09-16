export interface Project {
  id: string;
  title: string;
  category: 'Featured' | 'Residential' | 'Commercial' | 'Hospitality' | 'Healthcare' | 'Engineering';
  location: string;
  description: string;
  status: 'Under Development' | 'Completed' | 'Planning & Design';
  unitsOrSize?: string;
  year?: string;
  client?: string;
  image: string;
  features?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Management' | 'Project Management' | 'Engineers' | 'Architects' | 'Administration';
  bio?: string;
  image?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  items: string[];
  subcategories?: { title: string; items: string[] }[];
}

export interface SequenceStep {
  step: number;
  title: string;
  description: string;
  tag?: string;
}
