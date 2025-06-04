import { Award, Calendar, MapPin, Users } from 'lucide-react';
import Image from 'next/image';

export const EVENTS = [
	{
		id: 1,
		title: 'Dnyan Prabodhini Outdoor Excursion',
		description:
			'A successful full-day outing for Science Club students exploring Entomology, Botany, and Earth Sciences through nature trails and interactive discussions.',
		image: 'https://bijlmakers.com/wp-content/uploads/2018/10/potato-beetle-2766872_1920-700x554.jpg',
		date: '29 Aug 2024',
		location: 'Chalkewadi, Satara',
		participants: 'Science Club, Dnyan Prabodhini Pimpri School',
		link: '#',
		type: 'Educational Excursion',
		highlights: [
			'Nature Trails',
			'Interactive Discussions',
			'Q&A Sessions',
		],
	},
	{
		id: 2,
		title: 'Eco March 2024/25',
		description:
			'Nature walks promoting wildlife conservation and sustainable development, bringing together diverse participants from various backgrounds.',
		image: 'https://bijlmakers.com/wp-content/uploads/2018/10/potato-beetle-2766872_1920-700x554.jpg',
		date: 'Throughout 2024/25',
		location: 'Pune',
		participants: 'Kids, IT Professionals, Naturalists, Environmental Enthusiasts',
		link: '#',
		grant: true,
		type: 'Conservation Initiative',
		highlights: [
			'Diverse Participation',
			'Educational Sessions',
			'Sustainable Solutions',
		],
	},
	{
		id: 3,
		title: 'Children Special with Green Panther',
		description:
			'An exciting insect walk for Green Panther Club members, featuring hands-on learning about insects and wildlife conservation.',
		image: 'https://bijlmakers.com/wp-content/uploads/2018/10/potato-beetle-2766872_1920-700x554.jpg',
		date: '06 April 2025',
		location: 'Pune',
		participants: 'Children with High Curiosity and Interest in Nature',
		link: '#',
		type: "Children's Program",
		highlights: [
			'Hands-On Learning',
			'Insect Interaction',
			'Conservation Education',
		],
	},
];

export const Events = () => (
	<section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/20">
		<div className="container space-y-12 px-4 md:px-6">
			<div className="space-y-6 text-center">
				<div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
					🦋 Past Events & Research
				</div>
				<h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
					Our Impact in Action
				</h2>
				<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
					Discover how we're fostering scientific curiosity and environmental
					stewardship through immersive educational experiences and community
					engagement.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{EVENTS.map(
					({
						id,
						title,
						description,
						image,
						date,
						location,
						participants,
						grant,
						type,
						highlights,
						link,
					}) => (
						<div
							key={id}
							className="group relative overflow-hidden rounded-2xl bg-card border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
						>
							{/* Image Container */}
							<div className="relative h-48 overflow-hidden">
								<Image
									src={image}
									alt={title}
									width="400"
									height="200"
									className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
								<div className="absolute top-4 left-4">
									<span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-700">
										{type}
									</span>
								</div>
								{grant && (
									<div className="absolute top-4 right-4">
										<div className="flex items-center gap-1 rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
											<Award className="h-3 w-3" />
											Grant
										</div>
									</div>
								)}
							</div>

							{/* Content */}
							<div className="p-6 space-y-4">
								{/* Date and Location */}
								<div className="flex items-center justify-between text-sm text-muted-foreground">
									<div className="flex items-center gap-1">
										<Calendar className="h-4 w-4" />
										<span className="font-medium">{date}</span>
									</div>
									<div className="flex items-center gap-1">
										<MapPin className="h-4 w-4" />
										<span>{location}</span>
									</div>
								</div>

								{/* Title and Description */}
								<div className="space-y-2">
									<h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
										{title}
									</h3>
									<p className="text-muted-foreground line-clamp-4">
										{description}
									</p>
								</div>

								{/* Participants */}
								<div className="flex items-start gap-2 text-sm">
									<Users className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
									<span className="text-muted-foreground">
										{participants}
									</span>
								</div>

								{/* Highlights */}
								<div className="space-y-2">
									<h4 className="text-sm font-semibold">Key Highlights:</h4>
									<div className="flex flex-wrap gap-2">
										{highlights.map((highlight, index) => (
											<span
												key={index}
												className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium"
											>
												{highlight}
											</span>
										))}
									</div>
								</div>

								{/* CTA Button */}
								{/* <div className="pt-2">
									<Link
										href={link}
										className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
									>
										Learn More
										<svg
											className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</Link>
								</div> */}
							</div>
						</div>
					)
				)}
			</div>
		</div>
	</section>
);
