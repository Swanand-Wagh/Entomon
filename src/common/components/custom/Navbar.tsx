import React from 'react';
import Link from 'next/link';

import { BugIcon } from './BugIcon';
import { SearchInput } from './SearchInput';
import { NAVBAR } from '@/common/constants/navbar';
import { NavbarOption } from '@/common/types/navbar';
import { Icon } from '@/common/constants/icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/common/components/ui/dropdown-menu';
import { Button } from '@/common/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/common/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/common/components/ui/collapsible';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

const DropdownLink = ({ url, name, description }: NavbarOption) => (
  <Link
    href={url}
    className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
    prefetch={false}
  >
    <div className="text-sm font-medium leading-none group-hover:underline">{name}</div>
    {description && <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">{description}</div>}
  </Link>
);

const ButtonLink = ({ name, url }: NavbarOption) => (
  <Link
    key={name}
    prefetch={false}
    href={url ?? ''}
    className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
  >
    {name}
  </Link>
);

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <BugIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">Entomon Institute</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAVBAR.map((item) =>
            item.type === 'Link' ? (
              <Link
                key={item.name}
                prefetch={false}
                href={item.url ?? ''}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ) : item.type === 'Dropdown' ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <div className="flex cursor-pointer items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                    {item.name}
                    <Icon name="chevronDown" className="h-4 w-4 transition-all" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {item.options?.map((option) => (
                    <DropdownMenuItem key={option.name} asChild>
                      <DropdownLink url={option.url ?? '#'} name={option.name} description={option.description} />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : item.type === 'Button' ? (
              <ButtonLink key={item.name} name={item.name} url={item.url ?? ''} />
            ) : null
          )}
          <SearchInput />
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Icon name="hamburger" className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="bg-background">
            <SheetTitle>
              <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
            </SheetTitle>
            <SheetDescription>
              <VisuallyHidden.Root>Mobile Menu</VisuallyHidden.Root>
            </SheetDescription>

            <div className="flex h-full flex-col justify-between">
              <nav className="grid gap-4 px-4 py-6">
                {NAVBAR.map((item) =>
                  item.type === 'Link' ? (
                    <Link
                      key={item.name}
                      prefetch={false}
                      href={item.url ?? ''}
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  ) : item.type === 'Dropdown' ? (
                    <Collapsible key={item.name} className="grid gap-2">
                      <CollapsibleTrigger className="flex items-center justify-between text-lg font-medium [&[data-state=open]>svg]:rotate-90">
                        {item.name}
                        <Icon name="chevronDown" className="h-4 w-4 transition-all" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="-mx-4 grid gap-2 bg-muted p-4">
                          {item.options?.map((option) => (
                            <DropdownLink
                              url={option.url}
                              key={option.name}
                              name={option.name}
                              description={option.description}
                            />
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : item.type === 'Button' ? (
                    <ButtonLink key={item.name} name={item.name} url={item.url ?? ''} />
                  ) : null
                )}
                <SearchInput />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
