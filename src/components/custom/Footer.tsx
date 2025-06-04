import logo from '@/assets/entomon-logo.webp';
import { Icon } from '@/constants/icons';
import Image from 'next/image';
import Link from 'next/link';

export const FOOTER_LINKS = [
	{ id: 1, href: '/about', label: 'About' },
	{ id: 2, href: '/events', label: 'Events' },
	{ id: 3, href: '/blogs', label: 'Resources' },
	{ id: 4, href: '/contact', label: 'Contact' },
	{ id: 5, href: '/privacy-policy', label: 'Privacy Policy' },
];

export const SOCIAL_LINKS = [
	{ id: 1, href: 'mailto:entomoninstitute@gmail.com', icon: <Icon name="gmail" className="h-5 w-5" /> },
	{
		id: 2,
		href: 'https://www.linkedin.com/company/entomon-institute',
		icon: <Icon name="linkedin" className="h-5 w-5" />,
	},
	{
		id: 3,
		href: 'https://www.instagram.com/entomon_institute',
		icon: <Icon name="instagram" className="h-5 w-5" />,
	},
];

export const Footer = () => (
	<footer className="w-full bg-gray-900 border-t border-gray-800">
		<div className="container px-4 md:px-6">
			{/* Main Footer Content */}
			<div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-4 lg:gap-16">
				{/* Brand Section */}
				<div className="lg:col-span-2 space-y-6">
					<div className="flex items-center gap-3">
						<div className="relative">
							<Image
								src={logo}
								height={48}
								width={48}
								alt="Entomon Logo"
								className="rounded-full shadow-lg"
							/>
							<div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400/20 to-green-600/20"></div>
						</div>
						<div className="flex flex-col">
							<span className="text-xl font-bold text-white">Entomon Institute</span>
							<span className="text-sm text-green-400 font-medium">
								Invertebrate Research Excellence
							</span>
						</div>
					</div>
					<p className="text-gray-300 leading-relaxed max-w-md">
						Leading research institute advancing invertebrate zoology through innovative education,
						groundbreaking research, and immersive field experiences.
					</p>
					<div className="flex gap-4">
						{SOCIAL_LINKS.map(({ id, href, icon }) => (
							<Link
								key={id}
								href={href}
								target="_blank"
								prefetch={false}
								rel="noopener noreferrer"
								className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 text-gray-400 transition-all duration-200 hover:bg-green-600 hover:text-white hover:scale-110 hover:shadow-lg"
							>
								{icon}
							</Link>
						))}
					</div>
				</div>

				{/* Quick Links */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-white">Quick Links</h3>
					<nav className="space-y-3">
						{FOOTER_LINKS.map(({ id, href, label }) => (
							<Link
								key={id}
								href={href}
								prefetch={false}
								rel="noopener noreferrer"
								className="block text-gray-300 transition-all duration-200 hover:text-green-400 hover:translate-x-1"
							>
								{label}
							</Link>
						))}
					</nav>
				</div>

				{/* Contact Info */}
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-white">Get In Touch</h3>
					<div className="space-y-3">
						<div className="text-gray-300">
							<p className="font-medium text-white mb-1">Email</p>
							<Link
								href="mailto:entomoninstitute@gmail.com"
								className="text-green-400 hover:text-green-300 transition-colors"
							>
								entomoninstitute@gmail.com
							</Link>
						</div>
						<div className="text-gray-300">
							<p className="font-medium text-white mb-1">Location</p>
							<p>Pune, Maharashtra, India</p>
						</div>
						<div className="text-gray-300">
							<p className="font-medium text-white mb-1">Research Focus</p>
							<p>Invertebrate Zoology & Conservation</p>
						</div>
					</div>
				</div>
			</div>

			{/* Footer Bottom */}
			<div className="border-t border-gray-800 py-8">
				<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
					<p className="text-sm text-gray-400">
						&copy; 2025 Entomon Institute of Invertebrates Zoology. All rights reserved.
					</p>
					<div className="flex items-center gap-6 text-sm text-gray-400">
						<Link
							href="/privacy-policy"
							className="hover:text-green-400 transition-colors"
						>
							Privacy Policy
						</Link>
						<Link
							href="/contact"
							className="hover:text-green-400 transition-colors"
						>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</div>
	</footer>
);
