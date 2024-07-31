export interface NavbarOption {
  name: string;
  url: string;
  description?: string;
}

export interface NavbarProps {
  name: string;
  url?: string;
  type: 'Link' | 'Dropdown' | 'Button';
  options?: NavbarOption[];
}
